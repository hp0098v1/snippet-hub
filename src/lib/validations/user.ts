import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),
  name: z.string().min(1, "نام و نام خانوادگی الزامی است"),
  bio: z.string().optional(),
  image: z.string().optional(),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    newPassword: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
