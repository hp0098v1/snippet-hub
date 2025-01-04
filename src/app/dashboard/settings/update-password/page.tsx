import { Metadata } from "next";

import { ChangePasswordForm } from "@/components/users/forms/change-password-form";

export const metadata: Metadata = {
  title: "تنظیمات | SnippetHub",
  description: "تنظیمات حساب کاربری",
};

export default function SettingsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">تنظیمات</h1>
        <p className="text-muted-foreground">
          تنظیمات حساب کاربری خود را مدیریت کنید
        </p>
      </div>

      <div className="max-w-lg">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
