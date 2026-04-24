"use client"
import FeedItem from "@/components/app_components/FeedItem";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { LayoutGrid, Rows3, RefreshCw, Loader2, CheckCheck } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { refreshFeedAction, markAllAsReadAction } from "@/lib/actions/feed-actions";
import { useIsNotification } from "@/hooks/notificationContext";

interface HomePageProps {
    items: any[];
    title: string;
    feedId?: string;
}

const HomePage = ({ items, title, feedId }: HomePageProps) => {
    const [displayType, setDisplayType] = useState(true)
    const [isRefreshing, startRefresh] = useTransition()
    const [isNewest, startNewest] = useTransition()
    const { notify } = useIsNotification()
    const [isMarking, startMarking] = useTransition()
    const [filteredItems, setFilteredItems] = useState(items)
    const [filter, setFilter] = useState("all")
    const unreadCount = items.filter(item => !item.isRead).length;

    useEffect(() => {
        applyFilter(filter);
    }, [items, filter]);

    const handleRefresh = () => {
        if (!feedId) return;
        startRefresh(async () => {
            await refreshFeedAction(feedId);
        });
    }

    const handleMarkAllRead = () => {
        startMarking(async () => {
            await markAllAsReadAction(feedId);
            notify("All items marked as read", "success");
        });
    }
    const handleNewest = () => {
        // startNewest(async () => {

        // });
    }
    const applyFilter = (type: string) => {
        switch (type) {
            case "all":
                setFilteredItems(items);
                break;
            case "unread":
                setFilteredItems(items.filter(item => !item.isRead));
                break;
            case "read":
                setFilteredItems(items.filter(item => item.isRead));
                break;
            default:
                setFilteredItems(items);
        }
    }
    return (
        <div className="grid grid-cols-1 w-full pb-4 max-w-full overflow-hidden">
            <div className="w-full p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b md:border-b-0">
                <h1 className="text-xl font-bold flex items-baseline gap-2">
                    {title}
                    <span className="text-muted-foreground text-xs font-normal">{unreadCount} unread</span>
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                    <ButtonGroup className="hidden sm:flex">
                        <Button size="icon" variant={displayType ? "default" : "outline"} className="h-8 w-8" onClick={() => setDisplayType(true)}>
                            <LayoutGrid size={16} />
                        </Button>
                        <Button size="icon" variant={!displayType ? "default" : "outline"} className="h-8 w-8" onClick={() => setDisplayType(false)}>
                            <Rows3 size={16} />
                        </Button>
                    </ButtonGroup>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                        <ButtonGroup className="flex-wrap">
                            <Button
                                variant={filter === "all" ? "secondary" : "outline"}
                                size="sm"
                                className="h-8 text-xs px-2"
                                onClick={() => setFilter("all")}
                            >
                                All
                            </Button>
                            <Button
                                variant={filter === "unread" ? "secondary" : "outline"}
                                size="sm"
                                className="h-8 text-xs px-2"
                                onClick={() => setFilter("unread")}
                            >
                                Unread
                            </Button>
                            <Button
                                variant={filter === "read" ? "secondary" : "outline"}
                                size="sm"
                                className="h-8 text-xs px-2"
                                onClick={() => setFilter("read")}
                            >
                                Read
                            </Button>
                        </ButtonGroup>

                        <div className="flex items-center gap-2">
                            {feedId && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-2 text-xs"
                                    onClick={handleRefresh}
                                    disabled={isRefreshing}
                                >
                                    {isRefreshing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                                    <span className="hidden sm:inline">Refresh</span>
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 gap-2 text-xs"
                                onClick={handleMarkAllRead}
                                disabled={isMarking || unreadCount === 0}
                            >
                                {isMarking ? <Loader2 size={12} className="animate-spin" /> : <CheckCheck size={12} />}
                                <span className="hidden sm:inline">Mark all read</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-full p-4 grid " + (!displayType ? "grid-cols-1 gap-0 " : "gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}>
                {filteredItems.map((item: any) => (
                    <FeedItem key={item.id} item={item} displayType={displayType} />
                ))}
                {filteredItems.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted-foreground italic">
                        No items found.
                    </div>
                )}
            </div>
        </div>
    );
};
export default HomePage