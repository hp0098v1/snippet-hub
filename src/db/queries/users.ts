"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { and, asc, count, eq, ilike, or } from "drizzle-orm";
import {
  PaginationParams,
  PaginatedResponse,
  User,
  UserWithSnippets,
} from "@/db/types";

export async function getUserById(id: string): Promise<User | undefined> {
  const conditions = [eq(users.id, id), eq(users.emailVerified, true)];

  const user = await db.query.users.findFirst({
    where: and(...conditions),
  });

  return user;
}

export async function getUsers(
  params: {
    query?: string;
  } & PaginationParams = {}
): Promise<PaginatedResponse<UserWithSnippets>> {
  const { query, page = 1, limit = 6 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    query
      ? or(
          ilike(users.name, `%${query.trim()}%`),
          ilike(users.username, `%${query.trim()}%`)
        )
      : undefined,
    eq(users.emailVerified, true),
  ];

  // Base query
  const data = await db.query.users.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      snippets: true,
    },
    orderBy: asc(users.createdAt),
  });

  // Get total count
  const totalItems = await db
    .select({ count: count() })
    .from(users)
    .where(and(...conditions))
    .execute()
    .then((res) => Number(res[0].count));

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    metadata: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}