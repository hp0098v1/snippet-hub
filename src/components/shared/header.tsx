import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">اسنیپت‌هاب</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="/explore"
              className="text-sm font-medium hover:text-primary"
            >
              جستجو
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium hover:text-primary"
            >
              راهنما
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
            >
              درباره ما
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">ورود</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">ثبت‌نام</Link>
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/explore">جستجو</Link>
                <Link href="/docs">راهنما</Link>
                <Link href="/about">درباره ما</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
