import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { AuthContainer } from "@/components/auth/auth-container";

export const metadata: Metadata = {
  title: "ثبت‌نام | SnippetHub",
  description: "ایجاد حساب کاربری جدید",
};

export default function SignupPage() {
  return (
    <AuthContainer
      title="ایجاد حساب کاربری"
      description="برای استفاده از امکانات SnippetHub ثبت‌نام کنید"
    >
      <Card>
        <CardContent className="pt-6">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input id="name" type="text" autoComplete="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  dir="ltr"
                  className="text-left"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">رمز عبور</Label>
                <PasswordInput
                  id="password"
                  dir="ltr"
                  className="text-left"
                  autoComplete="current-password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
                <PasswordInput
                  id="confirm-password"
                  dir="ltr"
                  className="text-left"
                  autoComplete="new-password"
                />
              </div>
              <Button className="w-full">
                ایجاد حساب
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t p-6">
          <p className="text-center text-sm text-muted-foreground w-full">
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link href="/login" className="text-primary hover:underline">
              وارد شوید
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthContainer>
  );
}
