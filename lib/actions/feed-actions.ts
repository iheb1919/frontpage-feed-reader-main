"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";
import { headers } from "next/headers";
import Parser from "rss-parser";
import { revalidatePath } from "next/cache";

const parser = new Parser();

export async function addFeedAction(formData: FormData) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { error: "Unauthorized" };
    }

    const url = formData.get("url") as string;
    const xmlContent = formData.get("xmlContent") as string;
    let category = formData.get("category") as string;

    if (!category || category.trim() === "") {
        category = "other";
    }

    if (url) {
        const existingFeed = await prisma.feed.findFirst({
            where: {
                userId: session.user.id,
                url: url.startsWith("http") ? url : `https://${url}`,
            }
        });
        if (existingFeed) {
            return { error: "You have already added this feed." };
        }
    }

    let feedData;
    let finalUrl = url;
    try {
        if (url) {
            finalUrl = url.startsWith("http") ? url : `https://${url}`;
            feedData = await parser.parseURL(finalUrl);
        } else if (xmlContent) {
            feedData = await parser.parseString(xmlContent);
        } else {
            return { error: "URL or XML content is required" };
        }
    } catch (error: any) {
        console.error("Feed parsing error:", error);
        return { error: `Failed to parse feed: ${error.message}` };
    }

    try {
        const feed = await prisma.feed.create({
            data: {
                title: feedData.title || "Untitled Feed",
                url: finalUrl || null,
                xmlContent: xmlContent || null,
                category: category || null,
                userId: session.user.id,
                items: {
                    create: feedData.items.map((item) => ({
                        title: item.title || "Untitled Item",
                        link: item.link || Math.random().toString(36).substring(7), // Fallback link if missing
                        description: item.summary || item.contentSnippet || null,
                        content: item.content || null,
                        pubDate: item.pubDate ? new Date(item.pubDate) : null,
                    })),
                },
            },
        });

        revalidatePath("/home");
        return { success: true, feedId: feed.id };
    } catch (error: any) {
        console.error("Feed creation error:", error);
        if (error.code === 'P2002') {
             return { error: "A feed with this URL or items already exists." };
        }
        return { error: `Failed to save feed: ${error.message}` };
    }
}

export async function getFeedsAction() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return [];
    }

    try {
        const feeds = await prisma.feed.findMany({
            where: { userId: session.user.id },
            include: {
                _count: {
                    select: { 
                        items: { 
                            where: { isRead: false } 
                        } 
                    }
                }
            },
            orderBy: { createdAt: "desc" },
        });
        return feeds;
    } catch (error) {
        console.error("Error fetching feeds:", error);
        return [];
    }
}

export async function getFeedItemsAction(feedId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return [];
    }

    try {
        const items = await prisma.feedItem.findMany({
            where: { 
                feedId,
                feed: { userId: session.user.id }
            },
            orderBy: { pubDate: "desc" },
        });
        return items;
    } catch (error) {
        console.error("Error fetching feed items:", error);
        return [];
    }
}

export async function markItemAsReadAction(itemId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.feedItem.update({
            where: { 
                id: itemId,
                feed: { userId: session.user.id }
            },
            data: { isRead: true },
        });
        revalidatePath("/home");
        return { success: true };
    } catch (error: any) {
        return { error: `Failed to mark as read: ${error.message}` };
    }
}

export async function refreshFeedAction(feedId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Unauthorized" };

    const feed = await prisma.feed.findUnique({
        where: { id: feedId, userId: session.user.id }
    });

    if (!feed || !feed.url) return { error: "Feed not found or has no URL" };

    try {
        const feedData = await parser.parseURL(feed.url);
        
        const existingItems = await prisma.feedItem.findMany({
            where: { feedId },
            select: { link: true }
        });
        const existingLinks = new Set(existingItems.map(i => i.link));

        const newItemsData = feedData.items
            .filter(item => item.link && !existingLinks.has(item.link))
            .map(item => ({
                title: item.title || "Untitled Item",
                link: item.link!,
                description: item.summary || item.contentSnippet || null,
                content: item.content || null,
                pubDate: item.pubDate ? new Date(item.pubDate) : null,
                feedId,
            }));

        if (newItemsData.length > 0) {
            // Using create loop instead of createMany for better compatibility and to handle potential race conditions
            for (const item of newItemsData) {
                try {
                    await prisma.feedItem.create({ data: item });
                } catch (e) {
                    // Ignore duplicates that might have been added in parallel
                }
            }
        }

        await prisma.feed.update({
            where: { id: feedId },
            data: { lastFetched: new Date() }
        });

        revalidatePath("/home");
        return { success: true, newCount: newItemsData.length };
    } catch (error: any) {
        return { error: `Failed to refresh feed: ${error.message}` };
    }
}

export async function markAllAsReadAction(feedId?: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Unauthorized" };

    try {
        await prisma.feedItem.updateMany({
            where: {
                feed: {
                    userId: session.user.id,
                    ...(feedId ? { id: feedId } : {})
                },
                isRead: false
            },
            data: { isRead: true }
        });
        revalidatePath("/home");
        return { success: true };
    } catch (error: any) {
        return { error: `Failed to mark all as read: ${error.message}` };
    }
}

export async function toggleSaveItemAction(itemId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return { error: "Unauthorized" };

    try {
        const item = await prisma.feedItem.findUnique({
            where: { id: itemId, feed: { userId: session.user.id } },
            select: { isSaved: true }
        });

        if (!item) return { error: "Item not found" };

        await prisma.feedItem.update({
            where: { id: itemId },
            data: { isSaved: !item.isSaved }
        });

        revalidatePath("/home");
        return { success: true, isSaved: !item.isSaved };
    } catch (error: any) {
        return { error: `Failed to toggle save: ${error.message}` };
    }
}

export async function getUserCategoriesAction() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return [];

    try {
        const categories = await prisma.feed.findMany({
            where: { userId: session.user.id },
            select: { category: true },
            distinct: ['category'],
        });
        return categories.map(c => c.category).filter(Boolean) as string[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
