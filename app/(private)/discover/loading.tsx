import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-6 w-full h-full overflow-y-auto">
            <div className="mb-8">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="space-y-12 pb-12">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-2 mb-4">
                            <Skeleton className="w-3 h-3 rounded-full" />
                            <Skeleton className="h-6 w-32" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 3 }).map((_, j) => (
                                <div key={j} className="p-5 rounded-xl border bg-card flex flex-col h-full gap-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-12 w-full" />
                                    <div className="flex items-center justify-between mt-auto">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-8 w-24" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
