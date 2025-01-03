"use server";

import { db } from "@/db";
import { snippets, users, likes } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import {
  createSnippetSchema,
  updateSnippetSchema,
} from "@/lib/validations/snippets";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { hash, compare } from "bcryptjs";
import {
  loginSchema,
  signupSchema,
  verifyEmailSchema,
} from "@/lib/validations/auth";
import { sendVerificationEmail } from "@/lib/email"; // You'll need to implement this

import { createSession, deleteSession, verifySession } from "@/lib/session";
import { updateUserSchema, updatePasswordSchema } from "@/lib/validations/user";

export type FormState = {
  success?: boolean;
  errors?: {
    message?: string;
    [key: string]: string[] | string | undefined;
  };
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// User Actions
export async function updateUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await wait(2000);
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

// Snippet Actions
export async function createSnippet(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedFormData = createSnippetSchema.safeParse(formDataObj);

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
    };
  }

  const { userId } = await verifySession();
  const snippetId = nanoid();

  try {
    await db.insert(snippets).values({
      id: snippetId,
      userId,
      ...parsedFormData.data,
    });
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath("/snippets");
  revalidatePath(`/users/${userId}`);
  redirect(`/snippets/${snippetId}`);
}

export async function updateSnippet(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await wait(2000);
  const formDataObj = Object.fromEntries(formData.entries());
  const parsedFormData = updateSnippetSchema.safeParse(formDataObj);

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
    };
  }

  const { userId } = await verifySession();

  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, parsedFormData.data.id),
  });

  const isOwner = selectedSnippet?.userId === userId;

  if (!isOwner) {
    return {
      errors: {
        message: "شما نمیتوانید قطعه کد دیگری را ویرایش کنید",
      },
    };
  }

  try {
    await db
      .update(snippets)
      .set({
        ...parsedFormData.data,
        updatedAt: new Date(),
      })
      .where(eq(snippets.id, parsedFormData.data.id));
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath("/snippets");
  revalidatePath(`/snippets/${parsedFormData.data.id}`);
  revalidatePath(`/users/${userId}`);
  redirect(`/snippets/${parsedFormData.data.id}`);
}

export async function deleteSnippet(id: string): Promise<FormState> {
  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, id),
  });

  if (!selectedSnippet) {
    return {
      errors: {
        message: "قطعه کد یافت نشد",
      },
    };
  }

  try {
    const { userId } = await verifySession();

    if (selectedSnippet.userId !== userId) {
      return {
        errors: {
          message: "شما نمیتوانید قطعه کد دیگری را حذف کنید",
        },
      };
    }

    await db.delete(snippets).where(eq(snippets.id, id));
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath("/snippets");
  revalidatePath(`/users/${selectedSnippet.userId}`);
  redirect(`/users/${selectedSnippet.userId}`);
}

export async function incrementSnippetViews(id: string) {
  try {
    await db
      .update(snippets)
      .set({
        views: sql`${snippets.views} + 1`,
      })
      .where(eq(snippets.id, id));
  } catch (error) {
    console.error("Failed to increment views:", error);
  }
}

// Auth Actions
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
  deleteSession();
  redirect("/login");
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

export async function toggleSnippetLike(snippetId: string): Promise<FormState> {
  try {
    const { userId } = await verifySession();

    // Check if user has already liked the snippet
    const existingLike = await db.query.likes.findFirst({
      where: and(eq(likes.userId, userId), eq(likes.snippetId, snippetId)),
    });

    if (existingLike) {
      // Unlike: Remove the like
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.snippetId, snippetId)));
    } else {
      // Like: Add new like
      await db.insert(likes).values({
        userId,
        snippetId,
      });
    }

    // Revalidate the pages
    revalidatePath("/snippets");
    revalidatePath(`/snippets/${snippetId}`);
    revalidatePath(`/users/${userId}`);

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
