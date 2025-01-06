import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <div className="container space-y-8 py-24 text-center">
      <h2 className="text-3xl font-bold">همین حالا به اسنیپت‌هاب بپیوندید</h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground">
        ثبت‌نام رایگان و شروع مدیریت و اشتراک‌گذاری کدهای خود
      </p>
      <Button asChild size="lg">
        <Link href="/signup">
          ثبت‌نام کنید
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
