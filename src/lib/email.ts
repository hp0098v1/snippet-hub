"server-only"
import nodemailer from "nodemailer"
import type { TransportOptions } from "nodemailer"

import { env } from "@/lib/env"

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
} as TransportOptions)

export async function sendVerificationEmail(email: string, code: string) {
  await transporter.sendMail({
    sender: "SnippetHub",
    from: "SnippetHub",
    to: email,
    subject: "تأیید ایمیل SnippetHub",
    text: `کد تأیید شما: ${code}`,
  })
} 