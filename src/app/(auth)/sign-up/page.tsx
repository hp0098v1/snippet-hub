import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { SignUpForm } from "@/components/auth/forms/sign-up-form";

export const metadata: Metadata = {
  title: "ثبت‌نام | SnippetHub",
  description: "ایجاد حساب کاربری جدید",
};

export default function SignUpPage() {
  return (
    <AuthContainer
      description="برای استفاده از امکانات SnippetHub ثبت‌نام کنید"
      title="ایجاد حساب کاربری"
    >
      <SignUpForm />
    </AuthContainer>
  );
}
