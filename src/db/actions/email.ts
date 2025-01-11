"server-only";

import { Resend } from "resend";

import { ResetPasswordEmail } from "@/components/email/reset-password";
import { VerificationEmail } from "@/components/email/verification";
import { config } from "@/lib/config";

const resend = new Resend(config.env.email.resendApiKey);

export async function sendVerificationEmail(
  email: string,
  name: string,
  code: string
) {
  await resend.emails.send({
    from: "SnippetHub <send@hp0098v1.site>",
    to: email,
    subject: "تأیید ایمیل SnippetHub",
    react: VerificationEmail({ name, code }),
  });
}

export async function sendResetPasswordEmail(
  email: string,
  name: string,
  resetLink: string
) {
  await resend.emails.send({
    from: "SnippetHub <send@hp0098v1.site>",
    to: email,
    subject: "بازیابی رمز عبور | SnippetHub",
    react: ResetPasswordEmail({ name, resetLink }),
  });
}
