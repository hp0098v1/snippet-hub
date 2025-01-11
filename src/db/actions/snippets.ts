"use server";

import { eq, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { snippets, likes, savedSnippets } from "@/db/schema";
import { config } from "@/lib/config";
import { verifySession } from "@/lib/session";
import {
  createSnippetSchema,
  updateSnippetSchema,
} from "@/lib/validations/snippets";
import { FormState } from "@/types";

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

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.usersProfile(userId));
  redirect(config.routes.public.snippets());
}

export async function updateSnippet(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.snippetsDetail(parsedFormData.data.id));
  revalidatePath(config.routes.public.usersProfile(userId));
  redirect(config.routes.public.snippetsDetail(parsedFormData.data.id));
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

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.usersProfile(selectedSnippet.userId));
  redirect(config.routes.public.usersProfile(selectedSnippet.userId));
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
    revalidatePath(config.routes.public.snippets());
    revalidatePath(config.routes.public.snippetsDetail(snippetId));
    revalidatePath(config.routes.public.usersProfile(userId));

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

export async function toggleSaveSnippet(snippetId: string): Promise<FormState> {
  const { userId } = await verifySession();

  try {
    // Check if user has already saved the snippet
    const existingSave = await db.query.savedSnippets.findFirst({
      where: and(
        eq(savedSnippets.userId, userId),
        eq(savedSnippets.snippetId, snippetId)
      ),
    });

    if (existingSave) {
      // Unsave: Remove the save
      await db
        .delete(savedSnippets)
        .where(
          and(
            eq(savedSnippets.userId, userId),
            eq(savedSnippets.snippetId, snippetId)
          )
        );
    } else {
      // Save: Add new save
      await db.insert(savedSnippets).values({
        userId,
        snippetId,
      });
    }

    revalidatePath(config.routes.public.snippets());
    revalidatePath(config.routes.public.snippetsDetail(snippetId));
    revalidatePath(config.routes.public.usersProfile(userId));
    revalidatePath(config.routes.dashboard.savedSnippets());

    return {
      success: true,
    };
  } catch (error) {
    console.log("Failed to toggle save:", error);
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }
}
