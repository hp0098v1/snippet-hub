import { Metadata } from "next";
import { redirect } from "next/navigation";

import { ResetPasswordForm } from "@/components/auth/forms/reset-password-form";

export const metadata: Metadata = {
  title: "تغییر رمز عبور | SnippetHub",
  description: "تغییر رمز عبور حساب کاربری",
};

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <div className="container max-w-lg py-10">
      <ResetPasswordForm token={token} />
    </div>
  );
}
