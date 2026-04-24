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
        <div className="grid grid-cols-1 w-full pb-4">
            <div className="w-full p-4  flex items-center justify-between">
                <h1 className="text-lg font-bold">{title}
                    <span className="text-muted-foreground text-xs ml-2 font-normal">{unreadCount} unread</span>
                </h1>
                <div className="flex items-center gap-2">
                    <ButtonGroup >
                        <Button size="icon" variant={displayType ? "default" : "outline"} className="p-2" onClick={() => setDisplayType(true)}>
                            <LayoutGrid size={18} />
                        </Button>
                        <Button size="icon" variant={!displayType ? "default" : "outline"} className="p-2" onClick={() => setDisplayType(false)}>
                            <Rows3 size={18} />
                        </Button>
                    </ButtonGroup>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleNewest}
                        disabled={isNewest}
                    >
                        {isNewest ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        Newest
                    </Button>
                    <ButtonGroup >
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => applyFilter("all")}
                        >
                            Display all
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => applyFilter("read")}
                        >
                            Display Read Only
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => applyFilter("unread")}
                        >
                            Display Unread Only
                        </Button>
                    </ButtonGroup>
                    {feedId && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                            Refresh
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleMarkAllRead}
                        disabled={isMarking || unreadCount === 0}
                    >
                        {isMarking ? <Loader2 size={14} className="animate-spin" /> : <CheckCheck size={14} />}
                        Mark all read
                    </Button>
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