import { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { ChangePasswordForm } from "@/components/users/forms/change-password-form";

export const metadata: Metadata = {
  title: "تنظیمات | SnippetHub",
  description: "تنظیمات حساب کاربری",
};

export default function SettingsPage() {
  return (
    <div className="container max-w-xl space-y-8 py-8">
      <PageHeader
        description="رمز عبور خود را تغییر دهید"
        title="تغییر رمز عبور"
      />

      <ChangePasswordForm />
    </div>
  );
}
