import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  DATABASE_URL: z.string(),
  BLOB_READ_WRITE_TOKEN: z.string(),
  NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN: z.string(),
  SESSION_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log("Environment variables are not set correctly", error.errors);
  }
}

export const env = envSchema.parse(process.env);
