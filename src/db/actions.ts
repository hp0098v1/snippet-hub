'use server'

import { db } from "@/db";
import { snippets, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import {  CreateUser,  UpdateUser } from "./types";
import {  createSnippetSchema,  updateSnippetSchema } from "@/lib/validations/snippets";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type FormState = {
  errors?: {
    message?: string;
    [key: string]: string[] | string | undefined;
  };
};

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// User Actions
export async function createUser(data: CreateUser) {
  const userId = nanoid();
  await db.insert(users).values({
    id: userId,
    ...data,
  });
  return userId;
}

export async function updateUser({ id, ...data }: UpdateUser) {
  await db.update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id));
  return id;
}

export async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, id));
}

// Snippet Actions
export async function createSnippet(prevState: FormState, formData: FormData): Promise<FormState> {
  await wait(2000)
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedFormData = createSnippetSchema.safeParse(formDataObj)
  console.log(parsedFormData.data?.userId);

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
    };
  }

  const snippetId = nanoid();

  try {
    await db.insert(snippets).values({
      id: snippetId,
      ...parsedFormData.data,
    });
  } catch  {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath('/snippets')
  revalidatePath(`/users/${parsedFormData.data.userId}`)
  revalidatePath(`/snippets/${snippetId}`)
  redirect(`/snippets/${snippetId}`)
}


export async function updateSnippet(prevState: FormState, formData: FormData): Promise<FormState> {
  await wait(2000)
  const formDataObj = Object.fromEntries(formData.entries())
  const parsedFormData = updateSnippetSchema.safeParse(formDataObj)

  if (!parsedFormData.success) {
    return {
      errors: parsedFormData.error.flatten().fieldErrors,
    };
  }

  

  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, parsedFormData.data.id)
  })

 const isOwner = selectedSnippet?.userId === parsedFormData.data.userId

  if (!isOwner) {
    return {
      errors: {
        message: "شما نمیتوانید قطعه کد دیگری را ویرایش کنید",
      },
    };
  }

  try {
    await db.update(snippets).set({
      ...parsedFormData.data,
      updatedAt: new Date(),
    }).where(eq(snippets.id, parsedFormData.data.id))
  } catch  {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath('/snippets')
  revalidatePath(`/snippets/${parsedFormData.data.id}`)
  revalidatePath(`/users/${parsedFormData.data.userId}`)
  redirect(`/snippets/${parsedFormData.data.id}`)
}

export async function deleteSnippet(id: string): Promise<FormState> {
  
  const selectedSnippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, id)
  })

  console.log(selectedSnippet)

  if (!selectedSnippet) {
    return {
      errors: {
        message: "قطعه کد یافت نشد",
      },
    };
  }

  try {
    await db.delete(snippets).where(eq(snippets.id, id));
  } catch {
    return {
      errors: {
        message: "خطایی رخ داده است",
      },
    };
  }

  revalidatePath('/snippets')
  revalidatePath(`/users/${selectedSnippet.userId}`)
  redirect(`/users/${selectedSnippet.userId}`)
} 
