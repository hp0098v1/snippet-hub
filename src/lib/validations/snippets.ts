import {z} from 'zod'

export const createSnippetSchema = z.object({
  title: z.string({message: "عنوان باید نمیتواند خالی باشد"}).min(3, {message: "عنوان باید حداقل 3 کاراکتر باشد"}),
  description: z.string({message: "توضیحات باید نمیتواند خالی باشد"}).min(10, {message: "توضیحات باید حداقل 10 کاراکتر باشد"}),
  languageId: z.string({message: "زبان باید انتخاب شود"}).min(1, {message: "زبان باید انتخاب شود"}),
  // userId: z.string({message: "کاربر باید انتخاب شود"}).min(1, {message: "کاربر باید انتخاب شود"}),
  code: z.string({message: "کد باید نمیتواند خالی باشد"}).min(10, {message: "کد باید حداقل 10 کاراکتر باشد"}),
})

export const updateSnippetSchema = createSnippetSchema.partial().extend({
  id: z.string().min(1),
})

export type CreateSnippet = z.infer<typeof createSnippetSchema>
export type UpdateSnippet = z.infer<typeof updateSnippetSchema>