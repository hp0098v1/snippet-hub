import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن یکسان نیستند",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export const verifyEmailSchema = z.object({
  code: z.string().length(6, "کد تأیید باید ۶ رقم باشد"),
});
