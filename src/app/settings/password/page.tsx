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
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "تغییر رمز عبور | SnippetHub",
  description: "تغییر رمز عبور حساب کاربری",
};

export default function ChangePasswordPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">تغییر رمز عبور</h1>
          <p className="text-muted-foreground">
            برای تغییر رمز عبور، لطفاً رمز فعلی و رمز جدید خود را وارد کنید
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="ml-2 h-4 w-4" />
            بازگشت به داشبورد
          </Link>
        </Button>
      </div>

      {/* Success Alert - Show after successful password change */}
      <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle>رمز عبور با موفقیت تغییر کرد</AlertTitle>
        <AlertDescription>
          رمز عبور شما با موفقیت به‌روزرسانی شد. از این پس می‌توانید با رمز جدید
          وارد شوید.
        </AlertDescription>
      </Alert>

      {/* Change Password Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            فرم تغییر رمز عبور
          </CardTitle>
          <CardDescription>
            برای حفظ امنیت حساب کاربری خود، لطفاً از یک رمز عبور قوی استفاده
            کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">رمز عبور فعلی</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="رمز عبور فعلی خود را وارد کنید"
                required
              />
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
              <p>رمز عبور فعلی صحیح نیست. لطفاً مجدداً تلاش کنید.</p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              <ShieldCheck className="ml-2 h-4 w-4" />
              به‌روزرسانی رمز عبور
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
