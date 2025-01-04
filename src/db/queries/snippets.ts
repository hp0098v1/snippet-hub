"use server";

import { db } from "@/db";
import { savedSnippets, snippets } from "@/db/schema";
import { and, desc, count, eq, ilike, or, ne } from "drizzle-orm";
import {
  PaginationParams,
  PaginatedResponse,
  SnippetWithAuthorAndLanguage,
} from "@/db/types";
import { getSession } from "@/lib/session";

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
      savedBy: true,
    },
  });

  if (!snippet) return undefined;

  return {
    ...snippet,
    _count: {
      likes: snippet.likes.length,
      saves: snippet.savedBy.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
    isSaved: currentUserId
      ? snippet.savedBy.some((save) => save.userId === currentUserId)
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
      savedBy: true,
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

  // Transform data to include likes count and user's like/save status
  const snippetsWithLikesAndSaves = data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
      saves: snippet.savedBy.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
    isSaved: currentUserId
      ? snippet.savedBy.some((save) => save.userId === currentUserId)
      : false,
  }));

  return {
    data: snippetsWithLikesAndSaves,
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
      savedBy: true,
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

  // Transform data to include likes count and user's like/save status
  const snippetsWithLikesAndSaves = data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
      saves: snippet.savedBy.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
    isSaved: currentUserId
      ? snippet.savedBy.some((save) => save.userId === currentUserId)
      : false,
  }));

  return {
    data: snippetsWithLikesAndSaves,
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

export async function getSavedSnippets(
  params: {
    userId: string;
  } & PaginationParams
): Promise<PaginatedResponse<SnippetWithAuthorAndLanguage>> {
  const { userId, page = 1, limit = 12 } = params;
  const offset = (page - 1) * limit;

  // Get current user for like status
  const session = await getSession();
  const currentUserId = session.userId;

  // Get saved snippets
  const data = await db.query.savedSnippets.findMany({
    where: eq(savedSnippets.userId, userId),
    limit,
    offset,
    with: {
      snippet: {
        with: {
          user: true,
          language: true,
          likes: true,
          savedBy: true,
        },
      },
    },
    orderBy: desc(savedSnippets.createdAt),
  });

  // Get total count
  const totalItems = await db
    .select({ count: count() })
    .from(savedSnippets)
    .where(eq(savedSnippets.userId, userId))
    .execute()
    .then((res) => Number(res[0].count));

  const totalPages = Math.ceil(totalItems / limit);

  // Transform data to include likes count and user's like/save status
  const snippetsWithLikesAndSaves = data.map(({ snippet }) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
      saves: snippet.savedBy.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
    isSaved: currentUserId
      ? snippet.savedBy.some((save) => save.userId === currentUserId)
      : false,
  }));

  return {
    data: snippetsWithLikesAndSaves,
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
      savedBy: true,
    },
    orderBy: desc(snippets.createdAt),
  });

  // Transform data to include likes count and user's like/save status
  return data.map((snippet) => ({
    ...snippet,
    _count: {
      likes: snippet.likes.length,
      saves: snippet.savedBy.length,
    },
    isLiked: currentUserId
      ? snippet.likes.some((like) => like.userId === currentUserId)
      : false,
    isSaved: currentUserId
      ? snippet.savedBy.some((save) => save.userId === currentUserId)
      : false,
  }));
}
