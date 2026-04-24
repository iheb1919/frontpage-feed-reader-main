import { FeedItemSkeleton } from "@/components/app_components/FeedItem";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 w-full pb-4">
            <div className="w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>
            <div className="w-full p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <FeedItemSkeleton key={i} displayType={true} />
                ))}
            </div>
        </div>
    );
}
