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
import { ArrowLeft, Mail, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "فراموشی رمز عبور | SnippetHub",
  description: "بازیابی رمز عبور حساب کاربری",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container flex flex-1 flex-col items-center justify-center p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            فراموشی رمز عبور
          </h1>
          <p className="text-sm text-muted-foreground">
            ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
          </p>
        </div>

        {/* Success Alert - Show after successful submission */}
        <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
          <Mail className="h-4 w-4" />
          <AlertTitle>لینک بازیابی ارسال شد</AlertTitle>
          <AlertDescription>
            لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق ورودی خود
            را بررسی کنید.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              بازیابی رمز عبور
            </CardTitle>
            <CardDescription>
              برای بازیابی رمز عبور، ایمیل حساب کاربری خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ایمیل خود را وارد کنید"
                  required
                />
              </div>

              {/* Error Message - Show when there's an error */}
              <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>
                  این ایمیل در سیستم ثبت نشده است. لطفاً ایمیل دیگری را امتحان
                  کنید.
                </p>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                <Send className="ml-2 h-4 w-4" />
                ارسال لینک بازیابی
              </Button>
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
