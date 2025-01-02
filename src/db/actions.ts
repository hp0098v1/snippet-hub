'use server'

import { db } from "@/db";
import { snippets, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { CreateSnippet, CreateUser, UpdateSnippet, UpdateUser } from "./types";

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
export async function createSnippet(data: CreateSnippet) {
  const snippetId = nanoid();
  await db.insert(snippets).values({
    id: snippetId,
    ...data,
  });
  return snippetId;
}

export async function updateSnippet({ id, ...data }: UpdateSnippet) {
  await db.update(snippets)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(snippets.id, id));
  return id;
}

export async function deleteSnippet(id: string) {
  await db.delete(snippets).where(eq(snippets.id, id));
} 