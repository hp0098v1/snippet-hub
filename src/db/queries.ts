"use server";
import { db } from "@/db";
import { languages, snippets, users } from "@/db/schema";
import { and, asc, count, desc, eq, ilike, ne, or } from "drizzle-orm";
import {
  PaginationParams,
  PaginatedResponse,
  User,
  UserWithSnippets,
  SnippetWithAuthorAndLanguage,
  Language,
} from "./types";
import { getSession } from "@/lib/session";

// User Queries
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

// Snippet Queries
export async function getSnippetById(
  id: string
): Promise<SnippetWithAuthorAndLanguage | undefined> {
  // Get current user for like status
  const session = await getSession();
  const currentUserId = session.userId;

  const snippet = await db.query.snippets.findFirst({
    where: eq(snippets.id, id),
    with: {
      user: true,
      language: true,
      likes: true,
    },
  });

  if (!snippet) return undefined;

  return {
    ...snippet,
    _count: {
      likes: snippet.likes.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
  };
}

export async function getSnippets(
  params: {
    query?: string;
    languageId?: string;
    userId?: string;
  } & PaginationParams = {}
): Promise<PaginatedResponse<SnippetWithAuthorAndLanguage>> {
  const { query, languageId, userId, page = 1, limit = 12 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    query
      ? or(
          ilike(snippets.title, `%${query}%`),
          ilike(snippets.description, `%${query}%`)
        )
      : undefined,
    languageId ? eq(snippets.languageId, languageId) : undefined,
    userId ? eq(snippets.userId, userId) : undefined,
  ].filter(Boolean);

  // Get current user for like status
  const session = await getSession();
  const currentUserId = session.userId;

  // Get snippets with likes count and user's like status
  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      user: true,
      language: true,
      likes: true,
    },
    orderBy: desc(snippets.views),
  });

  // Get total count
  const totalItems = await db
    .select({ count: count() })
    .from(snippets)
    .where(and(...conditions))
    .execute()
    .then((res) => Number(res[0].count));

  const totalPages = Math.ceil(totalItems / limit);

  // Transform data to include likes count and user's like status
  const snippetsWithLikes = data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
  }));

  return {
    data: snippetsWithLikes,
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

export async function getUserSnippets(
  params: {
    userId: string;
  } & PaginationParams
): Promise<PaginatedResponse<SnippetWithAuthorAndLanguage>> {
  const { userId, page = 1, limit = 6 } = params;
  const offset = (page - 1) * limit;

  // Get current user for like status
  const session = await getSession();
  const currentUserId = session.userId;

  const conditions = [eq(snippets.userId, userId)];

  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      user: true,
      language: true,
      likes: true,
    },
    orderBy: desc(snippets.createdAt),
  });

  const totalItems = await db
    .select({ count: count() })
    .from(snippets)
    .where(and(...conditions))
    .execute()
    .then((res) => Number(res[0].count));

  const totalPages = Math.ceil(totalItems / limit);

  // Transform data to include likes count and user's like status
  const snippetsWithLikes = data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
  }));

  return {
    data: snippetsWithLikes,
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

export async function getSnippetByLanguage(
  languageId: string,
  snippetId?: string
): Promise<SnippetWithAuthorAndLanguage[]> {
  // Get current user for like status
  const session = await getSession();
  const currentUserId = session.userId;

  const conditions = [
    eq(snippets.languageId, languageId),
    snippetId ? ne(snippets.id, snippetId) : undefined,
  ].filter(Boolean);

  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit: 3,
    with: {
      user: true,
      language: true,
      likes: true,
    },
    orderBy: desc(snippets.createdAt),
  });

  // Transform data to include likes count and user's like status
  return data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
  }));
}

// Language Queries
export async function getLanguages(): Promise<Language[]> {
  return db.select().from(languages).orderBy(languages.name);
}

export async function getLanguageBySlug(
  slug: string
): Promise<Language | undefined> {
  const [language] = await db
    .select()
    .from(languages)
    .where(eq(languages.slug, slug))
    .limit(1);
  return language;
}
