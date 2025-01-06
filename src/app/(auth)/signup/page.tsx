import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { AuthSignupForm } from "@/components/auth/forms/auth-signup-form";

export const metadata: Metadata = {
  title: "ثبت‌نام | SnippetHub",
  description: "ایجاد حساب کاربری جدید",
};

export default function SignupPage() {
  return (
    <AuthContainer
      description="برای استفاده از امکانات SnippetHub ثبت‌نام کنید"
      title="ایجاد حساب کاربری"
    >
      <AuthSignupForm />
    </AuthContainer>
  );
}
