"use server";

import { db } from "@/db";
import { languages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Language } from "@/db/types";

export async function getLanguages(): Promise<Language[]> {
  return db.query.languages.findMany();
}

export async function getLanguageBySlug(
  slug: string
): Promise<Language | undefined> {
  return db.query.languages.findFirst({
    where: eq(languages.slug, slug),
  });
}
