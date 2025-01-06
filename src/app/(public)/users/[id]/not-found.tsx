import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-32 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">کاربر یافت نشد</h1>
        <p className="text-muted-foreground">
          کاربر مورد نظر شما یافت نشد یا حساب کاربری خود را حذف کرده است
        </p>
        <Button asChild>
          <Link href="/users">بازگشت به کاربران</Link>
        </Button>
      </div>
    </div>
  );
}
