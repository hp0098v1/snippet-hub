import { type InferSelectModel } from "drizzle-orm";
import { languages, snippets, users, likes } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Snippet = InferSelectModel<typeof snippets>;
export type Language = InferSelectModel<typeof languages>;
export type Like = InferSelectModel<typeof likes>;

export type UserWithSnippets = User & {
  snippets: Snippet[];
};

export type SnippetWithAuthorAndLanguage = Snippet & {
  user: User;
  language: Language;
  likes: Like[];
  _count?: {
    likes: number;
  };
  isLiked?: boolean;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

// Action Types
export type CreateSnippet = Omit<Snippet, "id" | "createdAt" | "updatedAt">;

export type UpdateSnippet = Partial<CreateSnippet> & {
  id: string;
};

export type CreateUser = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "image" | "bio"
>;

export type UpdateUser = Partial<Omit<CreateUser, "email">> & {
  id: string;
};
