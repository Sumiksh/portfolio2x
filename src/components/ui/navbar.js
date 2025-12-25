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
          className={`font-extrabold text-2xl tracking-wide flex items-center gap-3 group cursor-pointer`}
        >
          {/* Icon with a pulse/glow effect on hover */}
          <FontAwesomeIcon
            icon={faCode}
            className="text-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
          />

          <span className={`transition-all duration-300 transform group-hover:-translate-y-0.5
          text-transparent bg-clip-text bg-gradient-to-r 
          ${mounted && isDark
              ? "from-purple-400 via-fuchsia-300 to-white"
              : "from-purple-700 via-purple-900 to-black"
            }`}
          >
            Sumiksh Portfolio
          </span>
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
                  <FontAwesomeIcon icon={faHouse} className="text-purple-600 mr-2"/>
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
                  <FontAwesomeIcon icon={faUser} className="text-purple-600 mr-2"/>
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
                  <FontAwesomeIcon icon={faBriefcase} className="text-purple-600 mr-2"/>
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
