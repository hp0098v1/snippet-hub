import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-32 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">قطعه کد یافت نشد</h1>
        <p className="text-muted-foreground">
          قطعه کد مورد نظر شما یافت نشد یا حذف شده است
        </p>
        <Button asChild>
          <Link href="/snippets">بازگشت به قطعه کدها</Link>
        </Button>
      </div>
    </div>
  );
}
