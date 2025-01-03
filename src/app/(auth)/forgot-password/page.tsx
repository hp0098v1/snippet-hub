import { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const metadata: Metadata = {
  title: "فراموشی رمز عبور | SnippetHub",
  description: "بازیابی رمز عبور حساب کاربری",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container max-w-lg py-10">
      <ForgotPasswordForm />
    </div>
  );
}
