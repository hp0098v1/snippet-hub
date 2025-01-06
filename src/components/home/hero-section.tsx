import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-12 px-4 py-24 text-center md:py-32">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          مدیریت و اشتراک‌گذاری کد،
          <br />
          به سادگی و زیبایی
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
          اسنیپت‌هاب پلتفرمی برای ذخیره، مدیریت و اشتراک‌گذاری قطعات کد است.
          کدهای خود را به صورت خصوصی یا عمومی به اشتراک بگذارید.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">
              شروع کنید
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/snippets">
              جستجو در کد ها
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
