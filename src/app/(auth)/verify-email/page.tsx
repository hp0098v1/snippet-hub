import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "تأیید ایمیل | SnippetHub",
  description: "تأیید آدرس ایمیل حساب کاربری",
};

export default function VerifyEmailPage() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">تأیید ایمیل</h1>
          <p className="text-sm text-muted-foreground">
            برای تکمیل ثبت‌نام، لطفاً کد تأیید ارسال شده به ایمیل خود را وارد
            کنید
          </p>
        </div>

        {/* Success Alert - Show after successful verification */}
        <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
          <Mail className="h-4 w-4" />
          <AlertTitle>ایمیل با موفقیت تأیید شد</AlertTitle>
          <AlertDescription>
            آدرس ایمیل شما با موفقیت تأیید شد. اکنون می‌توانید از تمام امکانات
            پلتفرم استفاده کنید.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              تأیید آدرس ایمیل
            </CardTitle>
            <CardDescription>
              کد تأیید ۶ رقمی به آدرس ایمیل شما ارسال شده است
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp">کد تأیید</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="کد ۶ رقمی را وارد کنید"
                  className="text-center tracking-[1em] text-lg"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  کد تأیید به آدرس example@gmail.com ارسال شد
                </p>
              </div>

              {/* Error Message - Show when there's an error */}
              <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>
                  کد تأیید نامعتبر یا منقضی شده است. لطفاً مجدداً تلاش کنید.
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                تأیید ایمیل
              </Button>

              {/* Resend Button */}
              <div className="text-center">
                <Button variant="link" className="h-auto p-0">
                  <RefreshCw className="ml-2 h-4 w-4" />
                  ارسال مجدد کد تأیید
                </Button>
                <p className="mt-2 text-sm text-muted-foreground">
                  ارسال مجدد کد تا ۲:۰۰ دقیقه دیگر
                </p>
              </div>

              {/* Help Text */}
              <p className="text-center text-sm text-muted-foreground">
                اگر ایمیلی دریافت نکرده‌اید، لطفاً پوشه اسپم را نیز بررسی کنید
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2">
          <Button variant="link" asChild>
            <Link href="/">
              <ArrowLeft className="ml-2 h-4 w-4" />
              بازگشت به صفحه اصلی
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
