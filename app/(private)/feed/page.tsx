import { getFeedItemsAction } from "@/lib/actions/feed-actions";
import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HomeN from "./homeN";
import HomePage from "./HomePage";

const Page = async ({ searchParams }: { searchParams: Promise<{ feedId?: string, tab?: string }> }) => {
    const { feedId, tab } = await searchParams;
    // console.log({ searchParams })
    let items = [];
    let title = "All Items";
    const isSavedMode = tab === "saved";
    console.log(isSavedMode)
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    if (isSavedMode) {
        title = "Saved Items";
        items = await prisma.feedItem.findMany({
            where: {
                feed: { userId: session.user.id },
                isSaved: true
            },
            include: { feed: true },
            orderBy: { pubDate: "desc" },
        });
    } else if (feedId) {
        items = await prisma.feedItem.findMany({
            where: {
                feedId,
                feed: { userId: session.user.id }
            },
            include: { feed: true },
            orderBy: { pubDate: "desc" },
        });
        const feed = await prisma.feed.findUnique({ where: { id: feedId } });
        if (feed) title = feed.title;
    } else {
        items = await prisma.feedItem.findMany({
            where: { feed: { userId: session.user.id } },
            include: { feed: true },
            orderBy: { pubDate: "desc" },
            take: 50,
        });
    }
    console.log("items", items)
    return (
        <HomeN>
            <HomePage items={items} title={title} feedId={feedId} />
        </HomeN>
    );
};

export default Page;


