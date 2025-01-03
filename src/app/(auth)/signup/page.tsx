import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { AuthSignupForm } from "@/components/forms/auth-signup-form";

export const metadata: Metadata = {
  title: "ثبت‌نام | SnippetHub",
  description: "ایجاد حساب کاربری جدید",
};

export default function SignupPage() {
  return (
    <AuthContainer
      title="ایجاد حساب کاربری"
      description="برای استفاده از امکانات SnippetHub ثبت‌نام کنید"
    >
      <AuthSignupForm />
    </AuthContainer>
  );
}
