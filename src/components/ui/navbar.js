import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export function Navbar({ className }) {
  const { theme, setTheme } = useTheme("light");
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // setTheme("light");
    setMounted(true);
  }, []);

  console.log("Mounted:", mounted, "Theme:", theme, "isDark:", isDark);
  return (
    <nav className={`w-full fixed top-0 left-0 z-40 border-b ${mounted && isDark ? "bg-[#18181b]" : "bg-white"} ${className || ""}`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <span className={"font-bold text-xl tracking-wide " + (mounted && isDark ? "text-white" : "text-black")}>Portfolio</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={"hover:underline " + (mounted && isDark ? "text-white" : "text-black")}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/aboutpage" className={"hover:underline " + (mounted && isDark ? "text-white" : "text-black")}>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/experiencepage" className={"hover:underline " + (mounted && isDark ? "text-white" : "text-black")}>Experience</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {mounted ? (isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-black" />
          )) : null}
        </Button>
      </div>
    </nav>
  );
}
