import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Mail, Save, User2 } from "lucide-react";

export const metadata: Metadata = {
  title: "ویرایش پروفایل | SnippetHub",
  description: "ویرایش اطلاعات پروفایل کاربری",
};

// This would come from your database or auth session
const userData = {
  username: "@alimohammadi",
  name: "علی محمدی",
  bio: "توسعه‌دهنده فول‌استک و علاقه‌مند به اشتراک‌گذاری دانش",
  email: "ali@example.com",
};

export default function EditProfilePage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">ویرایش پروفایل</h1>
          <p className="text-muted-foreground">
            اطلاعات پروفایل خود را ویرایش کنید
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="ml-2 h-4 w-4" />
            بازگشت به داشبورد
          </Link>
        </Button>
      </div>

      {/* Success Alert - Show after successful profile update */}
      <Alert className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400">
        <User2 className="h-4 w-4" />
        <AlertTitle>پروفایل با موفقیت به‌روزرسانی شد</AlertTitle>
        <AlertDescription>
          تغییرات شما با موفقیت در پروفایل اعمال شد.
        </AlertDescription>
      </Alert>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5" />
            فرم ویرایش پروفایل
          </CardTitle>
          <CardDescription>
            اطلاعات پروفایل خود را به‌روزرسانی کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">نام کاربری</Label>
              <div className="relative">
                <span className="absolute right-3 top-2.5 text-muted-foreground">
                  @
                </span>
                <Input
                  id="username"
                  defaultValue={userData.username.replace("@", "")}
                  className="pr-8"
                  placeholder="نام کاربری خود را وارد کنید"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                این نام در URL پروفایل شما نمایش داده می‌شود
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                id="name"
                defaultValue={userData.name}
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">درباره من</Label>
              <Textarea
                id="bio"
                defaultValue={userData.bio}
                placeholder="درباره خود بنویسید"
                className="min-h-[100px] resize-y"
              />
              <p className="text-sm text-muted-foreground">
                یک توضیح مختصر درباره خودتان بنویسید که در پروفایل نمایش داده
                شود
              </p>
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  className="pr-9"
                  disabled
                />
              </div>
              <p className="text-sm text-muted-foreground">
                برای تغییر ایمیل با پشتیبانی تماس بگیرید
              </p>
            </div>

            {/* Error Message - Show when there's an error */}
            <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <p>
                خطایی در به‌روزرسانی پروفایل رخ داد. لطفاً مجدداً تلاش کنید.
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              <Save className="ml-2 h-4 w-4" />
              ذخیره تغییرات
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
