import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  varchar,
  boolean,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).unique().notNull(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("email_verified").default(false),
  password: text("password").notNull(),
  image: text("image"),
  bio: text("bio"),
  verificationCode: text("verification_code"),
  verificationCodeExpiresAt: timestamp("verification_code_expires_at"),
  resetToken: text("reset_token"),
  resetTokenExpiresAt: timestamp("reset_token_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deleteAt: timestamp("delete_at"),
});

// Languages table
export const languages = pgTable("languages", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
});

// Snippets table
export const snippets = pgTable("snippets", {
  id: text("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  languageId: text("language_id")
    .notNull()
    .references(() => languages.id, { onDelete: "cascade" }),
  views: integer("views").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Likes table
export const likes = pgTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    snippetId: text("snippet_id")
      .notNull()
      .references(() => snippets.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.snippetId), // Composite primary key
  })
);

// Saved Snippets table
export const savedSnippets = pgTable(
  "saved_snippets",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    snippetId: text("snippet_id")
      .notNull()
      .references(() => snippets.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.snippetId), // Composite primary key
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  snippets: many(snippets),
  likes: many(likes),
  savedSnippets: many(savedSnippets),
}));

export const snippetsRelations = relations(snippets, ({ one, many }) => ({
  user: one(users, {
    fields: [snippets.userId],
    references: [users.id],
  }),
  language: one(languages, {
    fields: [snippets.languageId],
    references: [languages.id],
  }),
  likes: many(likes),
  savedBy: many(savedSnippets),
}));

export const languagesRelations = relations(languages, ({ many }) => ({
  snippets: many(snippets),
}));

// Likes relations
export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  snippet: one(snippets, {
    fields: [likes.snippetId],
    references: [snippets.id],
  }),
}));

// Saved Snippets relations
export const savedSnippetsRelations = relations(savedSnippets, ({ one }) => ({
  user: one(users, {
    fields: [savedSnippets.userId],
    references: [users.id],
  }),
  snippet: one(snippets, {
    fields: [savedSnippets.snippetId],
    references: [snippets.id],
  }),
}));
