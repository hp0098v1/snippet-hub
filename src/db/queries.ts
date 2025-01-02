'use server'
import { db } from "@/db";
import { languages, snippets, users } from "@/db/schema";
import { and, count, desc, eq, ilike, ne, or, sql } from "drizzle-orm";
import { PaginationParams, PaginatedResponse, User, UserWithSnippets, SnippetWithAuthorAndLanguage, Language } from "./types";

// User Queries
export async function getUserByUsername(username: string): Promise<User | undefined> {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });

  return user;
}

export async function getUsers(params: {
  query?: string;
} & PaginationParams = {}): Promise<PaginatedResponse<UserWithSnippets>> {
  const { query, page = 1, limit = 1 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    query ? or(ilike(users.name, `%${query.trim()}%`), ilike(users.username, `%${query.trim()}%`)) : undefined,
  ]

  // Base query
  const data = await db.query.users.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      snippets: true
    },
    orderBy: desc(users.createdAt),
  });

  // Get total count
  const totalItems = await db.select({ count: count() }).from(users).where(and(...conditions)).execute().then((res) => Number(res[0].count));

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
export async function getSnippetById(id: string): Promise<SnippetWithAuthorAndLanguage | undefined> {
  const snippet = await db.query.snippets.findFirst({
    where: (snippets, { eq }) => eq(snippets.id, id),
    with: {
      language: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return snippet;
}

export async function getSnippets(params: {
  query?: string;
  languageId?: string;
  userId?: string;
} & PaginationParams = {}): Promise<PaginatedResponse<SnippetWithAuthorAndLanguage>> {
  const { query, languageId, userId, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    query ? sql`${snippets.title} ILIKE ${`%${query}%`} OR ${snippets.description} ILIKE ${`%${query}%`}` : undefined,
    languageId ? eq(snippets.languageId, languageId) : undefined,
    userId ? eq(snippets.userId, userId) : undefined,
  ]

  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      language: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy: desc(snippets.createdAt),
  });

  // Get total count with filters
  const totalItems = await db
    .select({ count: sql<number>`count(*)` })
    .from(snippets)
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

export async function getUserSnippets(params: {
  userId: string;
} & PaginationParams): Promise<PaginatedResponse<SnippetWithAuthorAndLanguage>> {
  const { userId, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const conditions = [
    eq(snippets.userId, userId),
  ]

  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit,
    offset,
    with: {
      language: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
    orderBy: (snippets, { desc }) => [desc(snippets.createdAt)],
  });

  // Get total count
  const totalItems = await db
    .select({ count: sql<number>`count(*)` })
    .from(snippets)
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

export async function getSnippetByLanguage(languageId: string, snippetId?: string): Promise<SnippetWithAuthorAndLanguage[]> {
  const conditions = [
    eq(snippets.languageId, languageId),
    snippetId ? ne(snippets.id, snippetId) : undefined,
  ]

  const data = await db.query.snippets.findMany({
    where: and(...conditions),
    limit: 3,
    with: {
      language: {
        columns: {
          id: true,
          name: true,
          slug: true,
        },
      },
      user: {
        columns: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return data;
}

// Language Queries
export async function getLanguages(): Promise<Language[]> {
  return db.select().from(languages).orderBy(languages.name);
}

export async function getLanguageBySlug(slug: string): Promise<Language | undefined> {
  const [language] = await db
    .select()
    .from(languages)
    .where(eq(languages.slug, slug))
    .limit(1);
  return language;
} 