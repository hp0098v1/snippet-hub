import { defineConfig } from "drizzle-kit";

import { config } from "@/lib/config";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.env.database.url!,
  },
});
