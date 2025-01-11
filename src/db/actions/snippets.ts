"use server";

import { eq, sql, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { snippets, likes, savedSnippets } from "@/db/schema";
import { config } from "@/lib/config";
import { verifySession } from "@/lib/session";
import {
  type CreateSnippetSchema,
  type UpdateSnippetSchema,
} from "@/lib/validations/snippets";

export async function createSnippet(data: CreateSnippetSchema) {
  const { userId } = await verifySession();
  const snippetId = nanoid();

  await db.insert(snippets).values({
    id: snippetId,
    userId,
    ...data,
  });

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.usersProfile(userId));

  return { id: snippetId };
}

export async function updateSnippet(data: UpdateSnippetSchema) {
  const { userId } = await verifySession();

  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, data.id),
  });

  if (!selectedSnippet) {
    throw new Error("قطعه کد یافت نشد");
  }

  const isOwner = selectedSnippet.userId === userId;

  if (!isOwner) {
    throw new Error("شما نمیتوانید قطعه کد دیگری را ویرایش کنید");
  }

  await db
    .update(snippets)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(snippets.id, data.id));

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.snippetsDetail(data.id));
  revalidatePath(config.routes.public.usersProfile(userId));

  return { id: data.id };
}

export async function deleteSnippet(id: string) {
  const { userId } = await verifySession();

  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, id),
  });

  if (!selectedSnippet) {
    throw new Error("قطعه کد یافت نشد");
  }

  if (selectedSnippet.userId !== userId) {
    throw new Error("شما نمیتوانید قطعه کد دیگری را حذف کنید");
  }

  await db.delete(snippets).where(eq(snippets.id, id));

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.usersProfile(userId));
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

export async function toggleSnippetLike(snippetId: string) {
  const { userId } = await verifySession();

  const existingLike = await db.query.likes.findFirst({
    where: and(eq(likes.userId, userId), eq(likes.snippetId, snippetId)),
  });

  if (existingLike) {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.snippetId, snippetId)));
  } else {
    await db.insert(likes).values({
      userId,
      snippetId,
    });
  }

  revalidatePath(config.routes.public.snippets());
  revalidatePath(config.routes.public.snippetsDetail(snippetId));
  revalidatePath(config.routes.public.usersProfile(userId));

  return {
    type: "success",
    message: existingLike ? "لایک برداشته شد" : "لایک اضافه شد",
  };
}

export async function toggleSaveSnippet(snippetId: string) {
  const { userId } = await verifySession();

  const existingSave = await db.query.savedSnippets.findFirst({
    where: and(
      eq(savedSnippets.userId, userId),
      eq(savedSnippets.snippetId, snippetId)
    ),
  });

  if (existingSave) {
    await db
      .delete(savedSnippets)
      .where(
        and(
          eq(savedSnippets.userId, userId),
          eq(savedSnippets.snippetId, snippetId)
        )
      );
  } else {
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
    type: "success",
    message: existingSave ? "از ذخیره‌ها حذف شد" : "به ذخیره‌ها اضافه شد",
  };
}
