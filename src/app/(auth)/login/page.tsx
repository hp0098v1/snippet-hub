import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { LoginForm } from "@/components/auth/forms/login-form";

export const metadata: Metadata = {
  title: "ورود | SnippetHub",
  description: "وارد حساب کاربری خود شوید",
};

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <AuthContainer
      description="برای استفاده از امکانات SnippetHub وارد شوید"
      title="ورود به حساب کاربری"
    >
      <LoginForm callbackUrl={searchParams.callbackUrl} />
    </AuthContainer>
  );
}
