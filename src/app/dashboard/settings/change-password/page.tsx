import { Metadata } from "next";

import { ChangePasswordForm } from "@/components/users/forms/change-password-form";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "تنظیمات | SnippetHub",
  description: "تنظیمات حساب کاربری",
};

export default function SettingsPage() {
  return (
    <div className="container max-w-xl py-8 space-y-8">
      <PageHeader
        title="تغییر رمز عبور"
        description="رمز عبور خود را تغییر دهید"
      />

      <ChangePasswordForm />
    </div>
  );
}
