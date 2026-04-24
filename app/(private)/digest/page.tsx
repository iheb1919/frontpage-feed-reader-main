import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import FeedItem from "@/components/app_components/FeedItem";
import HomeN from "../feed/homeN";

export default async function DigestPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    // Get the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 2); // 48 hours is better for a digest if 24 hours has nothing

    const items = await prisma.feedItem.findMany({
        where: {
            feed: { userId: session.user.id },
            pubDate: { gte: yesterday }
        },
        include: { feed: true },
        orderBy: { pubDate: "desc" },
    });

    return (
        <HomeN>
            <div className="p-6  w-full h-full overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Daily Digest</h1>
                    <p className="text-muted-foreground">Catch up on what you've missed in the last 48 hours.</p>
                </div>

                {items.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {items.map((item: any) => (
                            <FeedItem key={item.id} item={item} displayType={false} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center text-muted-foreground italic border rounded-xl bg-card">
                        You're all caught up! No new items in the last 48 hours.
                    </div>
                )}
            </div>
        </HomeN>
    );
}