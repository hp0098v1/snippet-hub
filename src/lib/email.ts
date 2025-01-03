"server-only";
import nodemailer from "nodemailer";
import type { TransportOptions } from "nodemailer";

import { env } from "@/lib/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
} as TransportOptions);

export async function sendVerificationEmail(email: string, code: string) {
  await transporter.sendMail({
    sender: "SnippetHub",
    from: "SnippetHub",
    to: email,
    subject: "تأیید ایمیل SnippetHub",
    text: `کد تأیید شما: ${code}`,
  });
}

export async function sendResetPasswordEmail(email: string, resetLink: string) {
  const mailOptions = {
    from: `"SnippetHub" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "بازیابی رمز عبور | SnippetHub",
    html: `
      <div dir="rtl" style="font-family: system-ui, sans-serif;">
        <h1>بازیابی رمز عبور</h1>
        <p>برای بازیابی رمز عبور خود روی لینک زیر کلیک کنید:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          بازیابی رمز عبور
        </a>
        <p>این لینک تا یک ساعت معتبر است.</p>
        <p>اگر شما درخواست بازیابی رمز عبور نداده‌اید، این ایمیل را نادیده بگیرید.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
}
