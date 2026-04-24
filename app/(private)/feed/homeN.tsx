"use client"
import IsNotificationProvider from "@/hooks/notificationContext"


const HomeN = ({ children }: { children: React.ReactNode }) => {
    return (
        <IsNotificationProvider>
            {children}
        </IsNotificationProvider>
    )
}

export default HomeN