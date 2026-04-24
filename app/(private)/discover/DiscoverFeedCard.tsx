"use client"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Check } from "lucide-react"
import { addFeedAction } from "@/lib/actions/feed-actions"
import { useIsNotification } from "@/hooks/notificationContext"

export default function DiscoverFeedCard({ feed, categoryName }: { feed: any, categoryName: string }) {
    const [isPending, startTransition] = useTransition()
    const [isSubscribed, setIsSubscribed] = useState(false)
    const { notify } = useIsNotification()

    const handleSubscribe = () => {
        startTransition(async () => {
            const formData = new FormData()
            formData.append("url", feed.feedUrl)
            formData.append("category", categoryName)
            
            const result = await addFeedAction(formData)
            if (result.error) {
                if (result.error.includes("already exists")) {
                    setIsSubscribed(true)
                    notify(`You are already subscribed to ${feed.title}`, "success")
                } else {
                    notify(result.error, "error")
                }
            } else {
                setIsSubscribed(true)
                notify(`Subscribed to ${feed.title}`, "success")
            }
        })
    }

    return (
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg line-clamp-1 mb-1">{feed.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">{feed.description}</p>
            <div className="flex items-center justify-between mt-auto">
                <a href={feed.siteUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                    Visit Website
                </a>
                <Button 
                    variant={isSubscribed ? "secondary" : "default"} 
                    size="sm" 
                    onClick={handleSubscribe} 
                    disabled={isPending || isSubscribed}
                    className="gap-1"
                >
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : 
                     isSubscribed ? <Check size={14} /> : <Plus size={14} />}
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                </Button>
            </div>
        </div>
    )
}
