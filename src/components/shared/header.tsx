import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <Code2 />
            <span className="text-xl font-bold">SnippetHub</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            خانه
          </Link>
          <Link
            href="/snippets"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            اسنیپت‌ها
          </Link>
          <Link
            href="/users"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            کاربران
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">ورود</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">ثبت‌نام</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
