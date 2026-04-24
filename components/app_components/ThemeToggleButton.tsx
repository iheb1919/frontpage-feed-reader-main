import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggleButton = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <Button size="icon" variant="outline" className="" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
    )
}
export default ThemeToggleButton