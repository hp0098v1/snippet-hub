import { type InferSelectModel } from "drizzle-orm";
import { languages, snippets, users, likes, savedSnippets } from "./schema";

export type FormState = {
  success?: boolean;
  errors?: {
    message?: string;
    [key: string]: string[] | string | undefined;
  };
};

export type SortOption = {
  label: string;
  value: string;
};

export type SnippetsSortOption =
  | "newest"
  | "oldest"
  | "views"
  | "likes"
  | "saves";

export type UsersSortOption = "newest" | "oldest" | "snippets";

export type Stats = {
  usersCount: number;
  snippetsCount: number;
  likesCount: number;
  viewsCount: number;
};

export type User = InferSelectModel<typeof users>;
export type Snippet = InferSelectModel<typeof snippets>;
export type Language = InferSelectModel<typeof languages>;
export type Like = InferSelectModel<typeof likes>;
export type SavedSnippet = InferSelectModel<typeof savedSnippets>;

export type UserWithSnippets = User & {
  snippets: Snippet[];
  savedSnippets?: SavedSnippet[];
};

export type SnippetWithAuthorAndLanguage = Snippet & {
  user: User;
  language: Language;
  likes: Like[];
  savedBy?: SavedSnippet[];
  _count?: {
    likes: number;
    saves?: number;
  };
  isLiked?: boolean;
  isSaved?: boolean;
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
