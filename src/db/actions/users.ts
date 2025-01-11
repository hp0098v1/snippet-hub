"use server";

import { hash, compare } from "bcryptjs";
import { eq, lt, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { uploadFile } from "@/db/actions/upload";
import { users } from "@/db/schema";
import { config } from "@/lib/config";
import { verifySession } from "@/lib/session";
import {
  type UpdateUserSchema,
  type UpdatePasswordSchema,
} from "@/lib/validations/user";
import { ActionResult } from "@/types";

export async function updateUser(
  data: UpdateUserSchema & { image?: File | null }
): Promise<ActionResult> {
  try {
    const { userId } = await verifySession();

    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, data.username),
    });

    if (existingUser && existingUser.id !== userId) {
      return { type: "error", error: "این نام کاربری قبلاً استفاده شده است" };
    }

    let imageUrl: string | undefined = undefined;

    if (data.image) {
      // Get current user to check if we need to delete old image
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      const uploadResult = await uploadFile(data.image, {
        oldUrl: user?.image,
        maxSize: 5 * 1024 * 1024, // 5MB
        accept: "image/*",
      });

      if (!uploadResult.success) {
        return {
          type: "error",
          error: uploadResult.error || "خطایی در آپلود فایل رخ داده است",
        };
      }

      imageUrl = uploadResult.url;
    }

    await db
      .update(users)
      .set({
        username: data.username,
        name: data.name,
        bio: data.bio,
        image: imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath(config.routes.dashboard.home());
    revalidatePath(config.routes.public.users());
    revalidatePath(config.routes.public.usersProfile(userId));

    return {
      type: "success",
      data: null,
      message: "اطلاعات کاربری با موفقیت بروزرسانی شد",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      type: "error",
      error: "خطایی در بروزرسانی اطلاعات رخ داده است",
    };
  }
}

export async function updatePassword(
  data: UpdatePasswordSchema
): Promise<ActionResult> {
  try {
    const { userId } = await verifySession();

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return {
        type: "error",
        error: "کاربر یافت نشد",
      };
    }

    const isPasswordCorrect = await compare(
      data.currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return {
        type: "error",
        error: "رمز عبور فعلی اشتباه است",
      };
    }

    const hashedPassword = await hash(data.newPassword, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath(config.routes.dashboard.home());
    return {
      type: "success",
      data: null,
      message: "رمز عبور با موفقیت تغییر کرد",
    };
  } catch (error) {
    console.error("Error updating password:", error);
    return {
      type: "error",
      error: "خطایی در تغییر رمز عبور رخ داده است",
    };
  }
}

export async function cleanupUnverifiedUsers() {
  const now = new Date();

  // Delete users who haven't verified their email within the deletion timeframe
  await db.delete(users).where(
    and(
      lt(users.deleteAt, now), // deleteAt is less than current time
      eq(users.emailVerified, false) // and email is not verified
    )
  );
}
