"use server";

import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { and, eq, sql } from "drizzle-orm";
import { hash, compare } from "bcryptjs";

import { db } from "@/db";
import { users } from "@/db/schema";
import {
  loginSchema,
  signupSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";
import { sendVerificationEmail, sendResetPasswordEmail } from "@/lib/email";
import { createSession, deleteSession } from "@/lib/session";

import { FormState } from "@/db/types";

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedData = signupSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    // Generate verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const hashedPassword = await hash(parsedData.data.password, 10);

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, parsedData.data.email),
    });

    if (existingUser && existingUser.emailVerified) {
      return {
        errors: {
          email: "این ایمیل قبلاً ثبت شده است",
        },
      };
    } else if (existingUser && !existingUser.emailVerified) {
      await db
        .update(users)
        .set({
          name: parsedData.data.name,
          verificationCode,
          verificationCodeExpiresAt,
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));
    } else {
      // Create user
      const userId = nanoid();
      const username = `user-${Math.floor(100000 + Math.random() * 900000)}`;
      const data = await db
        .insert(users)
        .values({
          id: userId,
          name: parsedData.data.name,
          username,
          email: parsedData.data.email,
          password: hashedPassword,
          verificationCode,
          verificationCodeExpiresAt,
          deleteAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Delete after 24 hours if not verified
        })
        .returning({ id: users.id });

      const user = data[0];

      if (!user) {
        return {
          errors: {
            message: "خطایی رخ داده است",
          },
        };
      }
    }

    // Send verification email
    await sendVerificationEmail(parsedData.data.email, verificationCode);
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  // Redirect to verify page
  redirect(`/verify-email?email=${parsedData.data.email}`);
}

export async function login(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedData = loginSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, parsedData.data.email),
  });

  if (!user) {
    return {
      errors: {
        message: "ایمیل یا رمز عبور اشتباه است",
      },
    };
  }

  const isPasswordCorrect = await compare(
    parsedData.data.password,
    user.password
  );

  if (!isPasswordCorrect) {
    return {
      errors: {
        message: "ایمیل یا رمز عبور اشتباه است",
      },
    };
  }

  await createSession(user.id);

  // Get callback URL from form data
  const callbackUrl = formData.get("callbackUrl") as string;
  redirect(callbackUrl || "/dashboard");
}

export async function verifyEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const code = formData.get("code") as string;

  const parsedData = verifyEmailSchema.safeParse({ code });
  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  let user;

  try {
    user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || user.verificationCode !== code) {
      return {
        errors: {
          code: "کد تأیید نامعتبر است",
        },
      };
    }

    if (
      user.verificationCodeExpiresAt &&
      user.verificationCodeExpiresAt < new Date()
    ) {
      return {
        errors: {
          code: "کد تأیید منقضی شده است",
        },
      };
    }

    // Verify user
    await db
      .update(users)
      .set({
        emailVerified: true,
        verificationCode: null,
        verificationCodeExpiresAt: null,
      })
      .where(eq(users.id, user.id));

    // Create session token
    await createSession(user.id);
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  redirect(`/dashboard`);
}

export async function resendVerificationCode(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || user.emailVerified) {
      return {
        errors: {
          message: "کاربر یافت نشد یا قبلاً تأیید شده است",
        },
      };
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db
      .update(users)
      .set({
        verificationCode,
        verificationCodeExpiresAt,
        deleteAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Extend deletion time
      })
      .where(eq(users.id, user.id));

    await sendVerificationEmail(email, verificationCode);

    return {};
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function forgotPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedData = forgotPasswordSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, parsedData.data.email),
    });

    if (!user || !user.emailVerified) {
      return {
        errors: {
          email: "کاربری با این ایمیل یافت نشد",
        },
      };
    }

    // Generate reset token
    const resetToken = nanoid(32);
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user with reset token
    await db
      .update(users)
      .set({
        resetToken,
        resetTokenExpiresAt,
      })
      .where(eq(users.id, user.id));

    // Send reset password email
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    await sendResetPasswordEmail(user.email, resetLink);

    return {
      success: true,
    };
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }
}

export async function resetPassword(
  token: string,
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedData = resetPasswordSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    // Find user with valid reset token
    const user = await db.query.users.findFirst({
      where: and(
        eq(users.resetToken, token),
        sql`${users.resetTokenExpiresAt} > NOW()`
      ),
    });

    if (!user) {
      return {
        errors: {
          message: "لینک بازیابی رمز عبور نامعتبر یا منقضی شده است",
        },
      };
    }

    // Hash new password
    const hashedPassword = await hash(parsedData.data.password, 10);

    // Update user password and clear reset token
    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return {
      success: true,
    };
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }
}
