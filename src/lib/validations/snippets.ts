import { z } from "zod";

export const createSnippetSchema = z.object({
  title: z
    .string({ message: "عنوان نمیتواند خالی باشد" })
    .min(3, { message: "عنوان باید حداقل 3 کاراکتر باشد" }),
  content: z
    .string({ message: "محتوا نمیتواند خالی باشد" })
    .min(10, { message: "محتوا باید حداقل 10 کاراکتر باشد" }),
  languageId: z
    .string({ message: "زبان باید انتخاب شود" })
    .min(1, { message: "زبان باید انتخاب شود" }),
});

export const updateSnippetSchema = createSnippetSchema.partial().extend({
  id: z.string().min(1),
});

export type CreateSnippetSchema = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetSchema = z.infer<typeof updateSnippetSchema>;
