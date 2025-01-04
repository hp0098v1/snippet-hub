"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcryptjs";
import { updateUserSchema, updatePasswordSchema } from "@/lib/validations/user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/session";

import { FormState } from "@/db/types";

export async function updateUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = await verifySession();
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedFormData = updateUserSchema.safeParse(formDataObj);

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
    };
  }

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, parsedFormData.data.username),
    });

    if (existingUser && existingUser.id !== userId) {
      return {
        errors: {
          username: "این نام کاربری قبلاً استفاده شده است",
        },
      };
    }

    await db
      .update(users)
      .set({
        ...parsedFormData.data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath(`/dashboard`);
  revalidatePath(`/users`);
  revalidatePath(`/users/${userId}`);
  redirect(`/dashboard`);
}


export async function updatePassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedData = updatePasswordSchema.safeParse(formDataObj);

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    const { userId } = await verifySession();
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        errors: {
          message: "کاربر یافت نشد",
        },
      };
    }

    const isPasswordCorrect = await compare(
      parsedData.data.currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return {
        errors: {
          currentPassword: "رمز عبور فعلی اشتباه است",
        },
      };
    }

    const hashedPassword = await hash(parsedData.data.newPassword, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  redirect("/dashboard");
}
