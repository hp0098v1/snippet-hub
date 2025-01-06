import { Metadata } from "next";
import { Suspense } from "react";

import { AuthContainer } from "@/components/auth/auth-container";
import { AuthVerifyEmailForm } from "@/components/auth/forms/auth-verify-email";

export const metadata: Metadata = {
  title: "تأیید ایمیل | SnippetHub",
  description: "تأیید آدرس ایمیل حساب کاربری",
};

export default function VerifyEmailPage() {
  return (
    <AuthContainer
      description="برای تکمیل ثبت‌نام، لطفاً کد تأیید ارسال شده به ایمیل خود را وارد کنید"
      showFooter={false}
      title="تأیید ایمیل"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AuthVerifyEmailForm />
      </Suspense>
    </AuthContainer>
  );
}
