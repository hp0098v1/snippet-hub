import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-4 pb-4 pt-8 md:flex-row md:items-center md:justify-between md:pt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <Link
            className="flex items-center space-x-2 space-x-reverse"
            href="/"
          >
            <Image alt="SnippetHub" height={30} src="/logo.png" width={30} />
            <span className="text-lg font-bold">SnippetHub</span>
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link className="hover:text-primary" href="/legal">
              قوانین و مقررات
            </Link>
            <Link className="hover:text-primary" href="/legal">
              حریم خصوصی
            </Link>
            <Link className="hover:text-primary" href="/contact">
              تماس با ما
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="text-muted-foreground hover:text-primary"
            href="mailto:erfanpaya2021@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Mail className="h-5 w-5" />
          </Link>
          <Link
            className="text-muted-foreground hover:text-primary"
            href="https://github.com/hp0098v1/snippet-hub"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="container py-4 text-sm text-muted-foreground">
        ساخته شده با ❤️ توسط
        <Link
          className="hover:text-primary"
          href="https://portfolio-hp0098v1.vercel.app"
          rel="noopener noreferrer"
          target="_blank"
        >
          &nbsp;ErfanPaya (hp0098v1)
        </Link>
      </div>
    </footer>
  );
}
