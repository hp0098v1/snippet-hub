import Link from "next/link";

import { AuthButtons } from "@/components/shared/auth-buttons";
import { NAVIGATION_LINKS } from "@/constants";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {NAVIGATION_LINKS.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="flex items-center space-x-2 space-x-reverse hover:text-primary"
            >
              <link.icon className="size-4" />
              <span className="text-sm font-bold">{link.label}</span>
            </Link>
          ))}
        </div>

        <nav className="flex items-center gap-4">
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}
