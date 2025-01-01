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
import { ArrowLeft, KeyRound, RefreshCw, Save } from "lucide-react";

export const metadata: Metadata = {
  title: "بازیابی رمز عبور | SnippetHub",
  description: "بازیابی رمز عبور حساب کاربری",
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            بازیابی رمز عبور
          </h1>
          <p className="text-sm text-muted-foreground">
            کد تأیید ارسال شده به ایمیل و رمز عبور جدید خود را وارد کنید
          </p>
        </div>

        {/* Success Alert - Show after successful reset */}
        <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
          <KeyRound className="h-4 w-4" />
          <AlertTitle>رمز عبور با موفقیت تغییر کرد</AlertTitle>
          <AlertDescription>
            رمز عبور شما با موفقیت تغییر کرد. اکنون می‌توانید با رمز عبور جدید
            وارد شوید.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              فرم بازیابی رمز عبور
            </CardTitle>
            <CardDescription>
              برای بازیابی رمز عبور، کد تأیید و رمز عبور جدید را وارد کنید
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

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password">رمز عبور جدید</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="رمز عبور جدید را وارد کنید"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و اعداد
                  باشد
                </p>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تکرار رمز عبور جدید</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="رمز عبور جدید را مجدداً وارد کنید"
                  required
                />
              </div>

              {/* Error Message - Show when there's an error */}
              <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>
                  کد تأیید نامعتبر یا منقضی شده است. لطفاً مجدداً تلاش کنید.
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                <Save className="ml-2 h-4 w-4" />
                تغییر رمز عبور
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
            </form>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2">
          <Button variant="link" asChild>
            <Link href="/login">
              <ArrowLeft className="ml-2 h-4 w-4" />
              بازگشت به صفحه ورود
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
