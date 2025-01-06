import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative flex h-[calc(100vh-8rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <Image
          fill
          alt="auth background"
          className="absolute inset-0"
          src="/auth-bg.jpg"
        />
        <div className="absolute inset-0 bg-zinc-900/50"></div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <span className="text-xl font-bold text-white">SnippetHub</span>
          </Link>
        </div>
        {/* <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              با اسنیپت‌هاب، من توانستم تمام کدهای مفیدم را در یک جا جمع‌آوری
              کنم و هر زمان که نیاز داشتم به آنها دسترسی داشته باشم.
            </p>
            <footer className="text-sm">سارا احمدی</footer>
          </blockquote>
        </div> */}
      </div>
      {children}
    </div>
  );
}
