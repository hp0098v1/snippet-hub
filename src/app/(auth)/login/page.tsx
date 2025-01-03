import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { AuthLoginForm } from "@/components/forms/auth-login-form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ورود | SnippetHub",
  description: "وارد حساب کاربری خود شوید",
};

export default function LoginPage() {
  return (
    <AuthContainer
      title="ورود به حساب کاربری"
      description="برای استفاده از امکانات SnippetHub وارد شوید"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AuthLoginForm />
      </Suspense>
    </AuthContainer>
  );
}
