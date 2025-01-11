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
import { ActionResult } from "@/types";

export async function createSnippet(
  data: CreateSnippetSchema
): Promise<ActionResult<{ id: string }>> {
  try {
    const { userId } = await verifySession();
    const snippetId = nanoid();

    await db.insert(snippets).values({
      id: snippetId,
      userId,
      ...data,
    });

    revalidatePath(config.routes.public.snippets());
    revalidatePath(config.routes.public.usersProfile(userId));

    return {
      type: "success",
      data: { id: snippetId },
      message: "قطعه کد با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در ایجاد قطعه کد رخ داده است",
    };
  }
}

export async function updateSnippet(
  data: UpdateSnippetSchema
): Promise<ActionResult<{ id: string }>> {
  try {
    const { userId } = await verifySession();

    const selectedSnippet = await db.query.snippets.findFirst({
      where: eq(snippets.id, data.id),
    });

    if (!selectedSnippet) {
      return {
        type: "error",
        error: "قطعه کد یافت نشد",
      };
    }

    const isOwner = selectedSnippet.userId === userId;

    if (!isOwner) {
      return {
        type: "error",
        error: "شما نمیتوانید قطعه کد دیگری را ویرایش کنید",
      };
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

    return {
      type: "success",
      data: { id: data.id },
      message: "قطعه کد با موفقیت ویرایش شد",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در ویرایش قطعه کد رخ داده است",
    };
  }
}

export async function deleteSnippet(
  id: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const { userId } = await verifySession();

    const selectedSnippet = await db.query.snippets.findFirst({
      where: eq(snippets.id, id),
    });

    if (!selectedSnippet) {
      return {
        type: "error",
        error: "قطعه کد یافت نشد",
      };
    }

    if (selectedSnippet.userId !== userId) {
      return {
        type: "error",
        error: "شما نمیتوانید قطعه کد دیگری را حذف کنید",
      };
    }

    await db.delete(snippets).where(eq(snippets.id, id));

    revalidatePath(config.routes.public.snippets());
    revalidatePath(config.routes.public.usersProfile(userId));

    return {
      type: "success",
      data: { id },
      message: "قطعه کد با موفقیت حذف شد",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در حذف قطعه کد رخ داده است",
    };
  }
}

export async function incrementSnippetViews(
  id: string
): Promise<ActionResult<null>> {
  try {
    await db
      .update(snippets)
      .set({
        views: sql`${snippets.views} + 1`,
      })
      .where(eq(snippets.id, id));

    return {
      type: "success",
      data: null,
      message: "بازدید قطعه کد افزایش یافت",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در افزایش بازدید قطعه کد رخ داده است",
    };
  }
}

export async function toggleSnippetLike(
  snippetId: string
): Promise<ActionResult<null>> {
  try {
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
      data: null,
      message: existingLike ? "لایک برداشته شد" : "لایک اضافه شد",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در لایک گیری قطعه کد رخ داده است",
    };
  }
}

export async function toggleSaveSnippet(
  snippetId: string
): Promise<ActionResult<null>> {
  try {
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
      data: null,
      message: existingSave ? "از ذخیره‌ها حذف شد" : "به ذخیره‌ها اضافه شد",
    };
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      error: "خطایی در ذخیره قطعه کد رخ داده است",
    };
  }
}
