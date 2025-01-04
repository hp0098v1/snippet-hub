import Link from "next/link";
import { Github, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 space-x-reverse"
          >
            <Image src="/logo.png" alt="SnippetHub" width={30} height={30} />
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
            href="mailto:erfanpaya2021@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/hp0098v1/snippet-hub"
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
