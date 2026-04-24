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
        <nav className="h-nav shrink-0 sticky top-0 bg-bg-primary border w-full justify-between flex items-center px-4">
            <div className="flex items-center gap-8">
                <h1 className="text-2xl text-primary font-bold">Frontpage</h1>

                <ul className="md:flex gap-2 hidden  ">
                    {navItems.map((item, idx) => (
                        <li key={idx} >
                            <Link
                                className={`text-text-secondary
                            hover:text-text-primary cursor-pointer 
                            hover:bg-bg-tertiary px-4 py-2 rounded-md ${item.href === pathname ? "text-text-primary bg-bg-tertiary" : ""}`}
                                href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    ))}

                </ul>
            </div>
            <div className="hidden md:flex items-center gap-2" >
                <InputGroup className="max-w-xs">
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Button size="icon" variant="outline" className="w-5 h-[70%] rounded-md border-gray-200" >
                            <Slash className="p-1" />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <AddNewFeedDialog />
                <ThemeToggleButton />
                <Button size="icon" variant="outline" className="rounded-full" >
                    Ms
                </Button>

            </div>
        </nav>
    )
}
export default Navbar