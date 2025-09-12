import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

export function Navbar({ className }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <nav className={
      `w-full fixed top-0 left-0 z-40 bg-background border-b ` +
      (isDark ? "text-white " : "text-black ") +
      (className || "")
    }>
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <span className={"font-bold text-xl tracking-wide " + (isDark ? "text-white" : "text-black")}>Portfolio</span>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/homepage" className={"hover:underline " + (isDark ? "text-white" : "text-black")}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/aboutpage" className={"hover:underline " + (isDark ? "text-white" : "text-black")}>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/experiencepage" className={"hover:underline " + (isDark ? "text-white" : "text-black")}>Experience</Link>
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
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-black" />
          )}
        </Button>
      </div>
    </nav>
  );
}
