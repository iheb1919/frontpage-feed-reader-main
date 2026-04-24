"use client"
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { SidebarMenuButton, SidebarMenuSubButton } from '@/components/ui/sidebar'
import { ReactNode } from 'react'

export function SidebarNavLink({
    href,
    children,
    tabMatch,
    feedIdMatch,
    isSub = false,
    className
}: {
    href: string,
    children: ReactNode,
    tabMatch?: string,
    feedIdMatch?: string,
    isSub?: boolean,
    className?: string
}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    let isActive = false

    // Check if it's the discover or digest page
    if (href.startsWith("/discover") || href.startsWith("/digest")) {
        isActive = pathname === href
    } else {
        // Automatically determine what we're matching from the href if it's a query string
        const queryString = href.includes("?") ? href.split("?")[1] : ""
        const hrefParams = new URLSearchParams(queryString)
        
        const actualTabMatch = tabMatch || hrefParams.get("tab")
        const actualFeedIdMatch = feedIdMatch || hrefParams.get("feedId")

        const currentTab = searchParams.get("tab")
        const currentFeedId = searchParams.get("feedId")
        
        if (actualTabMatch) {
            if (actualTabMatch === "all") {
                // "all" is active when tab=all OR when there's no tab/feedId and we're on a feed page like /feed or /home
                isActive = currentTab === "all" || (!currentTab && !currentFeedId && (pathname === "/feed" || pathname === "/home" || pathname === "/"))
            } else {
                isActive = currentTab === actualTabMatch
            }
        } else if (actualFeedIdMatch) {
            isActive = currentFeedId === actualFeedIdMatch
        } else {
            // fallback: exact pathname match
            isActive = pathname === href.split("?")[0]
        }
    }

    if (isSub) {
        return (
            <SidebarMenuSubButton asChild isActive={isActive}>
                <Link href={href} className={className}>
                    {children}
                </Link>
            </SidebarMenuSubButton>
        )
    }
    return (
        <SidebarMenuButton asChild isActive={isActive}>
            <Link className={`flex items-center gap-2 ${className || ''}`} href={href}>
                {children}
            </Link>
        </SidebarMenuButton>
    )
}
