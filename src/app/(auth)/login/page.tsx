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
  title: "ورود | SnippetHub",
  description: "وارد حساب کاربری خود شوید",
};

export default function LoginPage() {
  return (
    <AuthContainer
      title="ورود به حساب کاربری"
      description="برای استفاده از امکانات SnippetHub وارد شوید"
    >
      <Card>
        <CardContent className="pt-6">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  dir="ltr"
                  className="text-left"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">رمز عبور</Label>
                  {/* <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    فراموشی رمز عبور؟
                  </Link> */}
                </div>
                <PasswordInput
                  id="password"
                  dir="ltr"
                  className="text-left"
                  autoComplete="current-password"
                />
              </div>
              <Button className="w-full">
                ورود به حساب
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t p-6">
          <p className="text-center text-sm text-muted-foreground w-full">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="text-primary hover:underline">
              ثبت‌نام کنید
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthContainer>
  );
}
