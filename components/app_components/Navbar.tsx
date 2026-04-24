"use client";
import { PlusIcon, Search, Slash } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import ThemeToggleButton from "./ThemeToggleButton";
import AddNewFeedDialog from "./AddNewFeed";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
const navItems = [{
    name: "Feed",
    href: "/feed"
},
// {
//     name: "Digest",
//     href: "/digest"
// }, 
{
    name: "Discover",
    href: "/discover"
}]
const Navbar = () => {
    const pathname = usePathname()

    return (
        <nav className="h-16 z-50 shrink-0 fixed left-0 top-0 bg-bg-primary border-b w-full flex items-center px-4 ">
            <div className="flex items-center gap-4 flex-1">

                <h1 className="text-xl text-primary font-bold hidden sm:block">Frontpage</h1>
                <SidebarTrigger className="md:hidden" />
                <ul className="flex gap-1">
                    {navItems.map((item, idx) => (
                        <li key={idx} >
                            <Link
                                className={`text-text-secondary text-sm
                            hover:text-text-primary cursor-pointer 
                            hover:bg-bg-tertiary px-3 py-1.5 rounded-md transition-colors ${item.href === pathname ? "text-text-primary bg-bg-tertiary" : ""}`}
                                href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-2" >
                <div className="hidden lg:block">
                    <InputGroup className="max-w-[200px]">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <Search size={16} />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <AddNewFeedDialog />
                <ThemeToggleButton />
                <Button size="icon" variant="outline" className="rounded-full h-8 w-8 text-xs" >
                    Ms
                </Button>
            </div>
        </nav>
    )
}
export default Navbar