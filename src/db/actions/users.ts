"use server";

import { hash, compare } from "bcryptjs";
import { eq, lt, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { uploadFile } from "@/db/actions/upload";
import { users } from "@/db/schema";
import { FormState } from "@/db/types";
import { verifySession } from "@/lib/session";
import { updatePasswordSchema, updateUserSchema } from "@/lib/validations/user";

export async function updateUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const { userId } = await verifySession();

  let imageUrl: string | undefined = undefined;
  const imageFile = formData.get("image") as File | null;

  formData.delete("image");
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedFormData = updateUserSchema.safeParse(formDataObj);

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
      data: formDataObj as { [key: string]: string | undefined },
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
        data: parsedFormData.data,
      };
    }

    if (imageFile && typeof imageFile !== "string") {
      // Get current user to check if we need to delete old image
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      const uploadResult = await uploadFile(imageFile, {
        oldUrl: user?.image,
        maxSize: 5 * 1024 * 1024, // 5MB
        accept: "image/*",
      });

      if (!uploadResult.success) {
        return {
          errors: {
            image: uploadResult.error,
          },
          data: parsedFormData.data,
        };
      }

      imageUrl = uploadResult.url;
    }

    await db
      .update(users)
      .set({
        ...parsedFormData.data,
        image: imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
      data: parsedFormData.data,
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
      data: formDataObj as { [key: string]: string | undefined },
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
        data: parsedData.data,
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
        data: parsedData.data,
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
      data: parsedData.data,
    };
  }

  redirect("/dashboard");
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
