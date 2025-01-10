import { Menu } from "lucide-react";
import Link from "next/link";

import { AuthButtons } from "@/components/shared/auth-buttons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_LINKS } from "@/lib/constants";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="hidden items-center gap-4 sm:flex">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              className="flex items-center space-x-2 space-x-reverse hover:text-primary"
              href={link.href}
              key={`${link.label}-${link.href}`}
            >
              <link.icon className="size-4" />
              <span className="text-sm font-bold">{link.label}</span>
            </Link>
          ))}
        </div>

        <NavigationMenu className="sm:hidden" dir="rtl">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <Menu className="size-4" />
                <span className="text-sm font-bold">منو</span>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex w-[200px] flex-col gap-4 p-4">
                {NAVIGATION_LINKS.map((link) => (
                  <NavigationMenuLink
                    asChild
                    key={`mobile-${link.label}-${link.href}`}
                  >
                    <Link
                      className="flex items-center space-x-2 space-x-reverse hover:text-primary"
                      href={link.href}
                    >
                      <link.icon className="size-4" />
                      <span className="text-sm font-bold">{link.label}</span>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <nav className="flex items-center gap-4">
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}
