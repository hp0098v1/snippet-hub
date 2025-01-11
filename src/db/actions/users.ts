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

export async function updateUser(
  data: UpdateUserSchema & { image?: File | null }
) {
  const { userId } = await verifySession();

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, data.username),
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("این نام کاربری قبلاً استفاده شده است");
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
      throw new Error(uploadResult.error);
    }

    imageUrl = uploadResult.url;
  }

  try {
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

    return { success: "اطلاعات کاربری با موفقیت بروزرسانی شد" };
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("خطایی در بروزرسانی اطلاعات رخ داده است");
  }
}

export async function updatePassword(data: UpdatePasswordSchema) {
  const { userId } = await verifySession();

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("کاربر یافت نشد");
  }

  const isPasswordCorrect = await compare(data.currentPassword, user.password);

  if (!isPasswordCorrect) {
    throw new Error("رمز عبور فعلی اشتباه است");
  }

  try {
    const hashedPassword = await hash(data.newPassword, 10);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));

    revalidatePath(config.routes.dashboard.home());
    return { success: "رمز عبور با موفقیت تغییر کرد" };
  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("خطایی در تغییر رمز عبور رخ داده است");
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
