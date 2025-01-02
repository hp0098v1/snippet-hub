import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Share2, Lock, ChevronDown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col container">
      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center space-y-12 px-4 py-24 text-center md:py-32">
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
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              // onClick={() => {
              //   document
              //     .getElementById("features")
              //     ?.scrollIntoView({ behavior: "smooth" });
              // }}
            >
              بیشتر بدانید
              <ChevronDown className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t py-24">
        <div className="container space-y-12">
          <h2 className="text-center text-3xl font-bold">
            ویژگی‌های اسنیپت‌هاب
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card text-card-foreground p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">مدیریت کد</h3>
              <p className="text-gray-500">
                کدهای خود را به صورت سازمان‌یافته ذخیره و مدیریت کنید
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card text-card-foreground p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Share2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">اشتراک‌گذاری</h3>
              <p className="text-gray-500">
                کدهای خود را به راحتی با دیگران به اشتراک بگذارید
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border bg-card text-card-foreground p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">حریم خصوصی</h3>
              <p className="text-gray-500">
                کنترل کامل روی خصوصی یا عمومی بودن کدهای خود داشته باشید
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
