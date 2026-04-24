import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Bookmark, ChevronDown, User2, LayoutGrid, LogOut } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import React from 'react'
import FirstLetter from './FirstLetter'
import { colorMap, dotColorMap, firstLetterColor } from '@/lib/utils'
import { getFeedsAction } from '@/lib/actions/feed-actions'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { SidebarNavLink } from "./SidebarNavLink"
import { signOut } from "@/lib/actions/auth-actions"
import { Button } from "../ui/button"

const SideBar = async () => {
    const feeds = await getFeedsAction();
    const session = await auth.api.getSession({ headers: await headers() });
    const groupedFeeds = feeds.reduce((acc, feed) => {
        const category = feed.category || "General";
        if (!acc[category]) acc[category] = [];
        acc[category].push(feed);
        return acc;
    }, {} as Record<string, typeof feeds>);
    const handleSignOut = async () => {
        await signOut();
        //router.push('/signin')
    }
    return (
        <Sidebar variant='sidebar' collapsible="icon" className="border-border">
            <SidebarContent>
                <Collapsible defaultOpen className="group/collapsible" >
                    {/* FIRST GROUUUP */}
                    <SidebarGroup className='border-b'>
                        <SidebarGroupLabel className='flex w-full items-center justify-between'>
                            <CollapsibleTrigger className="flex w-full items-center">
                                For you
                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem className="my-1">
                                        <SidebarNavLink href="/feed?tab=all">
                                            <LayoutGrid />
                                            All Items
                                        </SidebarNavLink>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem className="my-1">
                                        <SidebarNavLink href="/feed?tab=saved">
                                            <Bookmark />
                                            Saved
                                        </SidebarNavLink>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
                {/* SECOND GROUUUP */}
                <Collapsible defaultOpen className="group/collapsible" >
                    <SidebarGroup>
                        <SidebarGroupLabel className='flex w-full items-center justify-between'>
                            <CollapsibleTrigger className="flex w-full items-center">
                                Subscriptions
                                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {
                                        Object.entries(groupedFeeds).map(([category, feeds]) => {
                                            const color = firstLetterColor(category)
                                            const bgColor = dotColorMap[color]
                                            return (
                                                <SidebarMenuItem key={category}>
                                                    <SidebarMenuButton className=''>
                                                        <span className={`w-2 h-2 mr-2 shrink-0 ${bgColor} rounded-full`} />
                                                        {category}
                                                    </SidebarMenuButton>
                                                    <SidebarMenuSub>
                                                        {feeds.map((feed) => (
                                                            <SidebarMenuSubItem key={feed.id}>
                                                                {/* <SidebarMenuSubButton asChild>
                                                                    <Link href={`?feedId=${feed.id}`} className="flex items-center justify-between w-full">
                                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                                            <FirstLetter text={feed.title} />
                                                                            <span className="truncate">{feed.title}</span>
                                                                        </div>
                                                                        {feed._count.items > 0 && (
                                                                            <span className="flex shrink-0 h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                                                                {feed._count.items}
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                </SidebarMenuSubButton> */}
                                                                <SidebarNavLink href={`/feed?feedId=${feed.id}`} isSub className="flex items-center justify-between w-full">
                                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                                        <FirstLetter text={feed.title} />
                                                                        <span className="truncate">{feed.title}</span>
                                                                    </div>
                                                                    {feed._count.items > 0 && (
                                                                        <span className="flex shrink-0 h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                                                            {feed._count.items}
                                                                        </span>
                                                                    )}
                                                                </SidebarNavLink>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </SidebarMenuItem>
                                            )
                                        })
                                    }
                                    {feeds.length === 0 && (
                                        <div className="px-4 py-2 text-xs text-muted-foreground italic">
                                            No feeds yet. Click + to add one.
                                        </div>
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

            </SidebarContent>

            <SidebarFooter className='border-t'>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <form action={signOut}>
                            <Button className="w-full" variant='outline' >
                                <LogOut /> SignOut
                            </Button>
                        </form>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
export default SideBar
