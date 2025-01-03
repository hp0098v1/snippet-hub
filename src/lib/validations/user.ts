import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(32),
  username: z.string().min(3).max(32),
  bio: z.string().min(0).max(1000),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
