import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  bio: text("bio"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  verificationCode: text("verification_code"),
  verificationCodeExpiresAt: timestamp("verification_code_expires_at"),
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
  description: text("description"),
  code: text("code").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  languageId: text("language_id").notNull().references(() => languages.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  snippets: many(snippets),
}));

export const snippetsRelations = relations(snippets, ({ one }) => ({
  user: one(users, {
    fields: [snippets.userId],
    references: [users.id],
  }),
  language: one(languages, {
    fields: [snippets.languageId],
    references: [languages.id],
  }),
}));

export const languagesRelations = relations(languages, ({ many }) => ({
  snippets: many(snippets),
}));
