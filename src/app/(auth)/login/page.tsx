import { Metadata } from "next";
import { Suspense } from "react";

import { AuthContainer } from "@/components/auth/auth-container";
import { AuthLoginForm } from "@/components/auth/forms/auth-login-form";

export const metadata: Metadata = {
  title: "ورود | SnippetHub",
  description: "وارد حساب کاربری خود شوید",
};

export default function LoginPage() {
  return (
    <AuthContainer
      description="برای استفاده از امکانات SnippetHub وارد شوید"
      title="ورود به حساب کاربری"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLoginForm />
      </Suspense>
    </AuthContainer>
  );
}
