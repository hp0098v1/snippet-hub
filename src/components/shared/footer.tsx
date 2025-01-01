import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <span className="text-lg font-bold">SnippetHub</span>
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/legal" className="hover:text-primary">
              قوانین و مقررات
            </Link>
            <Link href="/legal" className="hover:text-primary">
              حریم خصوصی
            </Link>
            <Link href="/contact" className="hover:text-primary">
              تماس با ما
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://twitter.com/snippethub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/snippethub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
