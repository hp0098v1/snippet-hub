"use server";

import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { users, snippets, likes } from "@/db/schema";
import { Stats } from "@/db/types";

export async function getStats(): Promise<Stats> {
  // Get verified users count
  const usersCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.emailVerified, true))
    .then((res) => Number(res[0].count));

  // Get total snippets count
  const snippetsCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(snippets)
    .then((res) => Number(res[0].count));

  // Get total likes count
  const likesCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(likes)
    .then((res) => Number(res[0].count));

  // Get total views count
  const viewsCount = await db
    .select({ sum: sql<number>`sum(${snippets.views})` })
    .from(snippets)
    .then((res) => Number(res[0].sum || 0));

  return {
    usersCount,
    snippetsCount,
    likesCount,
    viewsCount,
  };
}
