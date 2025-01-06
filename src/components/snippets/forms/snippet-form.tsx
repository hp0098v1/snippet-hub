"use client";

import dynamic from "next/dynamic";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { CreateSnippet, Language } from "@/db/types";

import { useActionState, useState } from "react";
import Form from "next/form";
import { FormState } from "@/db/types";
import { RichTextEditorSkeleton } from "@/components/shared/skeletons";

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
              id="title"
              name="title"
              defaultValue={defaultValues?.title}
              placeholder="یک عنوان توصیفی برای قطعه کد خود وارد کنید"
            />
            {state.errors?.title && (
              <p className="text-red-500 text-sm">{state.errors.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">زبان برنامه‌نویسی</Label>
            <Select
              value={language}
              onValueChange={setLanguage}
              name="languageId"
              defaultValue={defaultValues?.languageId}
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
              <p className="text-red-500 text-sm">{state.errors.languageId}</p>
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
              <p className="text-red-500 text-sm">{state.errors.content}</p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-red-500 text-sm">{state.errors.message}</p>
          )}

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isSubmitting}
              asChild
            >
              <Link href={cancelLink}>انصراف</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
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
