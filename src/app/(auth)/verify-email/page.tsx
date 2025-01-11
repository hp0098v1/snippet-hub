import { Metadata } from "next";

import { AuthContainer } from "@/components/auth/auth-container";
import { VerifyEmailForm } from "@/components/auth/forms/verify-email-form";

export const metadata: Metadata = {
  title: "تأیید ایمیل | SnippetHub",
  description: "تأیید آدرس ایمیل حساب کاربری",
};

type Props = {
  searchParams: Promise<{ email: string }>;
};

export default async function VerifyEmailPage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <AuthContainer
      description="برای تکمیل ثبت‌نام، لطفاً کد تأیید ارسال شده به ایمیل خود را وارد کنید"
      showFooter={false}
      title="تأیید ایمیل"
    >
      <VerifyEmailForm email={searchParams.email} />
    </AuthContainer>
  );
}
