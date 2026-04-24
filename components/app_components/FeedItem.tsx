"use client"
import { colorMap, firstLetterColor, timeAgo } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import FirstLetter from "./FirstLetter"
import Link from "next/link"
import { markItemAsReadAction, toggleSaveItemAction } from "@/lib/actions/feed-actions"
import { useTransition } from "react"
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useIsNotification } from "@/hooks/notificationContext"

const FeedItem = ({ item, displayType }: { item: any, displayType: boolean }) => {
    const [isSaving, startSaving] = useTransition()
    const { notify } = useIsNotification()
    const handleMarkAsRead = async () => {
        if (!item.isRead) {
            await markItemAsReadAction(item.id);
        }
    }

    const handleToggleSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startSaving(async () => {
            const saved = await toggleSaveItemAction(item.id);
            saved.success && notify(
                item.isSaved ? "Item unsaved successfully" : "Item saved successfully",
                "success"
            )

        });
    }

    return (
        <Link
            href={item.link}
            target="_blank"
            onClick={handleMarkAsRead}
            className={"px-5 py-4 flex  transition-all hover:bg-bg-secondary bg-card "
                + (displayType ? "gap-2 rounded-md shadow-sm" : " gap-0 border-t")}
        >
            {!item.isRead && <div className={`w-1.5 h-1.5 shrink-0 mt-2 rounded-full bg-blue-500`}></div>}
            <div className="flex flex-col gap-1 w-full overflow-hidden">
                <div className="flex gap-2 items-center w-full justify-between">
                    <h3 className="  w-[150px] text-sm text-muted-foreground font-medium
                     flex items-center gap-2 ">
                        <FirstLetter text={item.feed?.title || "Feed"} />
                        <span className=" overflow-hidden ellipsis text-nowrap">{item.feed?.title || "Feed"}</span>
                    </h3>
                    <div className="shrink-0  flex items-center gap-0">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p className="text-sm text-muted-foreground  shrink-0">
                                    {item.pubDate ? timeAgo(new Date(item.pubDate).toISOString()) : ''}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{new Date(item.pubDate).toLocaleString()}</p>
                            </TooltipContent>
                        </Tooltip>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted"
                            onClick={handleToggleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 className="animate-spin" size={16} /> :
                                item.isSaved ? <BookmarkCheck className="text-primary fill-primary" size={16} /> :
                                    <Bookmark size={16} />}
                        </Button>
                    </div>
                </div>
                <h2 className={`font-medium text-lg leading-tight truncate ${item.isRead ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {item.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10 overflow-hidden">
                    {item.description}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2 h-10 hover:underline hover:underline-offset-1"> More details</p>
            </div>
        </Link>
    )
}

export default FeedItem