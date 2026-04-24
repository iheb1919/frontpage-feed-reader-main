import sampleFeeds from "@/data/sample-feeds.json";
import DiscoverFeedCard from "./DiscoverFeedCard";
import HomeN from "../feed/homeN";
import { getFeedsAction } from "@/lib/actions/feed-actions";

export default async function DiscoverPage() {
    const userFeeds = await getFeedsAction();
    const userFeedUrls = new Set(userFeeds.map(f => f.url?.replace(/\/$/, "")));

    return (
        <HomeN>
            <div className="p-6 w-full h-full overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Discover</h1>
                    <p className="text-muted-foreground">Find and subscribe to new feeds from our curated list.</p>
                </div>
                <div className="space-y-12 pb-12">
                    {sampleFeeds.categories.map((category) => (
                        <div key={category.name}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className={`w-3 h-3 rounded-full ${category.color.replace('bg-', 'bg-').replace('500', '500')}`}></div>
                                <h2 className="text-xl font-semibold">{category.name}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.feeds.map((feed) => {
                                    const isInitiallySubscribed = userFeedUrls.has(feed.feedUrl.replace(/\/$/, ""));
                                    return (
                                        <DiscoverFeedCard 
                                            key={feed.feedUrl} 
                                            feed={feed} 
                                            categoryName={category.name} 
                                            isInitiallySubscribed={isInitiallySubscribed}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </HomeN>
    );
}