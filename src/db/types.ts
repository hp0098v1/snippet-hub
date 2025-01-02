import { type InferSelectModel } from "drizzle-orm";
import { languages, snippets, users } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Snippet = InferSelectModel<typeof snippets>;
export type Language = InferSelectModel<typeof languages>;

export type UserWithSnippets = User & {
  snippets: Snippet[];
};

export type SnippetWithAuthorAndLanguage = Snippet & {
  user: Pick<User, "id" | "name" | "username" | "image">;
  language: Pick<Language, "id" | "name" | "slug">;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  metadata: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

// Action Types
export type CreateSnippet = Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>

export type UpdateSnippet = Partial<CreateSnippet> & {
  id: string;
};

export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'image' | 'bio'>

export type UpdateUser = Partial<Omit<CreateUser, 'email'>> & {
  id: string;
}; 