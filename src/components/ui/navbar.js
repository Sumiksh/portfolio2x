import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faHouse,
  faMoon,
  faSun,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar({ className }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-40 border-b transition-colors duration-300
        ${mounted && isDark ? "bg-[#18181b] border-zinc-800" : "bg-white border-gray-200"}
        ${className || ""}`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <span
          className={`font-bold text-xl tracking-wide flex items-center gap-2
            ${mounted && isDark ? "text-white" : "text-black"}`}
        >
          <FontAwesomeIcon icon={faCode} className="text-primary" />
          Portfolio
        </span>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={`flex items-center gap-2 transition hover:underline
                    ${mounted && isDark ? "text-white" : "text-black"}`}
                >
                  <FontAwesomeIcon icon={faHouse} />
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/aboutpage"
                  className={`flex items-center gap-2 transition hover:underline
                    ${mounted && isDark ? "text-white" : "text-black"}`}
                >
                  <FontAwesomeIcon icon={faUser} />
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/experiencepage"
                  className={`flex items-center gap-2 transition hover:underline
                    ${mounted && isDark ? "text-white" : "text-black"}`}
                >
                  <FontAwesomeIcon icon={faBriefcase} />
                  Experience
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="hover:bg-transparent"
        >
          {mounted && (
            <FontAwesomeIcon
              icon={isDark ? faSun : faMoon}
              className={`h-5 w-5 transition
                ${isDark ? "text-yellow-400" : "text-gray-800"}`}
            />
          )}
        </Button>
      </div>
    </nav>
  );
}
