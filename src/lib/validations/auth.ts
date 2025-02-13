import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
    email: z.string().email("ایمیل نامعتبر است"),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
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

export const resendVerificationEmailSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .max(100, "رمز عبور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
    confirmPassword: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .max(100, "رمز عبور نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationEmailSchema = z.infer<
  typeof resendVerificationEmailSchema
>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
