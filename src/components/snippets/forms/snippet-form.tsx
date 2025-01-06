"use client";

import dynamic from "next/dynamic";
import Form from "next/form";
import Link from "next/link";
import { useActionState, useState } from "react";

import { RichTextEditorSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CreateSnippet, Language, FormState } from "@/db/types";

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
  defaultValues?: Omit<CreateSnippet, "views">;
  onSubmit: (prevState: FormState, formData: FormData) => Promise<FormState>;
  cancelLink: string;
}

const initialState = {
  errors: {},
};

export function SnippetForm({
  snippetId,
  languages,
  defaultValues,
  onSubmit,
  cancelLink,
}: SnippetFormProps) {
  const isEditing = !!defaultValues;

  const [content, setContent] = useState(defaultValues?.content || "");
  const [language, setLanguage] = useState(defaultValues?.languageId || "");

  const [state, formAction, isSubmitting] = useActionState(
    onSubmit,
    initialState
  );

  return (
    <Form
      action={(formData: FormData) => {
        const newFormData = new FormData();
        if (isEditing) {
          newFormData.append("id", snippetId as string);
        }

        newFormData.append("title", formData.get("title") as string);
        newFormData.append("languageId", formData.get("languageId") as string);
        newFormData.append("content", content);

        formAction(newFormData);
      }}
    >
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:*:flex-1">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان</Label>
            <Input
              defaultValue={defaultValues?.title}
              id="title"
              name="title"
              placeholder="یک عنوان توصیفی برای قطعه کد خود وارد کنید"
            />
            {state.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">زبان برنامه‌نویسی</Label>
            <Select
              defaultValue={defaultValues?.languageId}
              name="languageId"
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب زبان برنامه‌نویسی" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.errors?.languageId && (
              <p className="text-sm text-red-500">{state.errors.languageId}</p>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">محتوا</Label>
            <RichTextEditor
              languages={languages}
              value={content}
              onChange={setContent}
            />
            {state.errors?.content && (
              <p className="text-sm text-red-500">{state.errors.content}</p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}

          <div className="flex justify-end gap-4">
            <Button
              asChild
              disabled={isSubmitting}
              type="button"
              variant="outline"
            >
              <Link href={cancelLink}>انصراف</Link>
            </Button>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting
                ? "در حال ارسال..."
                : isEditing
                  ? "ذخیره تغییرات"
                  : "ایجاد قطعه کد"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
}
