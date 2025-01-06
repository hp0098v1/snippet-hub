import { ArrowLeft, Home, XCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center space-y-8 p-8 text-center">
      {/* Icon */}
      <div className="rounded-full bg-muted p-4">
        <XCircle className="h-12 w-12 text-muted-foreground" />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          ۴۰۴ - صفحه مورد نظر یافت نشد
        </h1>
        <p className="text-lg text-muted-foreground">
          صفحه‌ای که به دنبال آن هستید وجود ندارد یا به مکان دیگری منتقل شده است
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="ml-2 h-5 w-5" />
            صفحه اصلی
          </Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          //   onClick={() => window.history.back()}
        >
          <ArrowLeft className="ml-2 h-5 w-5" />
          بازگشت
        </Button>
      </div>

      {/* Additional Help Text */}
      <p className="text-sm text-muted-foreground">
        اگر فکر می‌کنید این یک خطا است، لطفاً با پشتیبانی تماس بگیرید
      </p>
    </div>
  );
}
