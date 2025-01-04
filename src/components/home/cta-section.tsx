import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <div className="container text-center space-y-8 py-24">
      <h2 className="text-3xl font-bold">همین حالا به اسنیپت‌هاب بپیوندید</h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground">
        ثبت‌نام رایگان و شروع مدیریت و اشتراک‌گذاری کدهای خود
      </p>
      <Button size="lg" asChild>
        <Link href="/signup">
          ثبت‌نام کنید
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
