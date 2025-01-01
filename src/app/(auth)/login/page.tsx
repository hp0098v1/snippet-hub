import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "ورود | SnippetHub",
  description: "وارد حساب کاربری خود شوید",
};

export default function LoginPage() {
  return (
    <div className="container relative flex h-[calc(100vh-8rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <span className="text-xl font-bold text-white">SnippetHub</span>
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              اسنیپت‌هاب به من کمک کرد تا کدهایم را به شکلی حرفه‌ای مدیریت کنم و
              به راحتی با تیمم به اشتراک بگذارم.
            </p>
            <footer className="text-sm">علی محمدی</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              ورود به حساب کاربری
            </h1>
            <p className="text-sm text-muted-foreground">
              برای استفاده از امکانات SnippetHub وارد شوید
            </p>
          </div>
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
                      <Link
                        href="/forgot-password"
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        فراموشی رمز عبور؟
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
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
          <p className="px-8 text-center text-sm text-muted-foreground">
            با ورود به سایت، شما{" "}
            <Link
              href="/legal/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              قوانین و مقررات
            </Link>{" "}
            و{" "}
            <Link
              href="/legal/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              حریم خصوصی
            </Link>{" "}
            را می‌پذیرید.
          </p>
        </div>
      </div>
    </div>
  );
}
