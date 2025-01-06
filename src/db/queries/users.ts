"use server";

import { and, count, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
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
    sortBy?: "snippets" | "newest" | "oldest";
  } & PaginationParams = {}
): Promise<PaginatedResponse<UserWithSnippets>> {
  const { query, sortBy = "newest", page = 1, limit = 12 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    query
      ? or(ilike(users.name, `%${query}%`), ilike(users.username, `%${query}%`))
      : undefined,
  ].filter(Boolean);

  const data = await db.query.users.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      snippets: true,
    },
  });

  const totalItems = await db
    .select({ count: count() })
    .from(users)
    .where(and(...conditions))
    .execute()
    .then((res) => Number(res[0].count));

  const totalPages = Math.ceil(totalItems / limit);

  const usersWithSnippets = data
    .map((user) => ({
      ...user,
      _count: {
        snippets: user.snippets.length,
      },
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case "snippets":
          return b._count.snippets - a._count.snippets;
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime();
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });

  return {
    data: usersWithSnippets,
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
