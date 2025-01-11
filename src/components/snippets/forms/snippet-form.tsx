"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { RichTextEditorSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createSnippet, updateSnippet } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";
import {
  createSnippetSchema,
  type CreateSnippetSchema,
} from "@/lib/validations/snippets";
import { Language } from "@/types";

const RichTextEditor = dynamic(
  () =>
    import("@/components/snippets/rich-text-editor").then(
      (mod) => mod.RichTextEditor
    ),
  { ssr: false, loading: () => <RichTextEditorSkeleton /> }
);

interface SnippetFormProps {
  snippetId?: string;
  languages: Language[];
  defaultValues?: CreateSnippetSchema;
  cancelLink: string;
}

export function SnippetForm({
  snippetId,
  languages,
  defaultValues,
  cancelLink,
}: SnippetFormProps) {
  const router = useRouter();
  const isEditing = !!snippetId;

  const { execute: executeCreate, isPending: isCreatePending } = useAction(
    createSnippet,
    {
      onSuccess: (data) => {
        router.push(config.routes.public.snippetsDetail(data.id));
      },
    }
  );

  const { execute: executeUpdate, isPending: isUpdatePending } = useAction(
    updateSnippet,
    {
      onSuccess: () => {
        router.push(config.routes.public.snippetsDetail(snippetId!));
      },
    }
  );

  const form = useForm<CreateSnippetSchema>({
    resolver: zodResolver(createSnippetSchema),
    defaultValues: defaultValues || {
      title: "",
      languageId: "",
      content: "",
    },
  });

  async function onSubmit(data: CreateSnippetSchema) {
    if (isEditing && snippetId) {
      await executeUpdate({
        ...data,
        id: snippetId,
      });
    } else {
      await executeCreate(data);
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:*:flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="یک عنوان توصیفی برای قطعه کد خود وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>زبان برنامه‌نویسی</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب زبان برنامه‌نویسی" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.id} value={lang.id}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوا</FormLabel>
                  <FormControl>
                    <RichTextEditor languages={languages} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex justify-end gap-4">
              <Button asChild variant="outline">
                <Link href={cancelLink}>انصراف</Link>
              </Button>
              <Button
                disabled={isCreatePending || isUpdatePending}
                type="submit"
              >
                {isCreatePending || isUpdatePending
                  ? "در حال ارسال..."
                  : isEditing
                    ? "ذخیره تغییرات"
                    : "ایجاد قطعه کد"}
              </Button>
            </div>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
}
