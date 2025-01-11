"use server";

import { hash, compare } from "bcryptjs";
import { and, eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

import { db } from "@/db";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "@/db/actions/email";
import { users } from "@/db/schema";
import { config } from "@/lib/config";
import { createSession, deleteSession } from "@/lib/session";
import {
  LoginSchema,
  SignupSchema,
  VerifyEmailSchema,
  ResetPasswordSchema,
  ForgotPasswordSchema,
  ResendVerificationEmailSchema,
} from "@/lib/validations/auth";

export async function signup({ email, name, password }: SignupSchema) {
  // Generate verification code
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const hashedPassword = await hash(password, 10);

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser && existingUser.emailVerified) {
    throw new Error("این ایمیل قبلاً ثبت شده است");
  } else if (existingUser && !existingUser.emailVerified) {
    await db
      .update(users)
      .set({
        name: name,
        verificationCode,
        verificationCodeExpiresAt,
        password: hashedPassword,
      })
      .where(eq(users.id, existingUser.id));
  } else {
    const userId = nanoid();
    const username = `user-${Math.floor(100000 + Math.random() * 900000)}`;
    const data = await db
      .insert(users)
      .values({
        id: userId,
        name: name,
        username,
        email: email,
        password: hashedPassword,
        verificationCode,
        verificationCodeExpiresAt,
        deleteAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Delete after 24 hours if not verified
      })
      .returning({ id: users.id });

    const user = data[0];

    if (!user) {
      throw new Error("خطایی رخ داده است");
    }
  }

  await sendVerificationEmail(email, name, verificationCode);
}

export async function login({ email, password }: LoginSchema) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  await createSession(user.id);
}

export async function verifyEmail({
  email,
  code,
}: VerifyEmailSchema & { email: string }) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || user.verificationCode !== code) {
    throw new Error("کد تأیید اشتباه است");
  }

  if (
    user.verificationCodeExpiresAt &&
    user.verificationCodeExpiresAt < new Date()
  ) {
    throw new Error("کد تأیید منقضی شده است");
  }

  await db
    .update(users)
    .set({
      emailVerified: true,
      verificationCode: null,
      verificationCodeExpiresAt: null,
    })
    .where(eq(users.id, user.id));

  await createSession(user.id);
}

export async function resendVerificationCode({
  email,
}: ResendVerificationEmailSchema) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || user.emailVerified) {
    throw new Error("کاربر یافت نشد یا قبلاً تأیید شده است");
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

  await sendVerificationEmail(email, user.name, verificationCode);
}

export async function logout() {
  await deleteSession();
  redirect(config.routes.auth.login());
}

export async function forgotPassword({ email }: ForgotPasswordSchema) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user || !user.emailVerified) {
    throw new Error("کاربری با این ایمیل یافت نشد");
  }

  const resetToken = nanoid(32);
  const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db
    .update(users)
    .set({
      resetToken,
      resetTokenExpiresAt,
    })
    .where(eq(users.id, user.id));

  const resetLink = `${config.env.app.url}/reset-password?token=${resetToken}`;
  await sendResetPasswordEmail(user.email, user.name, resetLink);
}

export async function resetPassword({
  token,
  password,
}: ResetPasswordSchema & { token: string }) {
  const user = await db.query.users.findFirst({
    where: and(
      eq(users.resetToken, token),
      sql`${users.resetTokenExpiresAt} > NOW()`
    ),
  });

  if (!user) {
    throw new Error("لینک بازیابی رمز عبور نامعتبر یا منقضی شده است");
  }

  const hashedPassword = await hash(password, 10);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiresAt: null,
      updatedAt: new Date(),
    })
    .where(eq(users.id, user.id));
}
