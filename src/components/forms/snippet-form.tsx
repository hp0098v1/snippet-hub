"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { CodeEditor } from "@/components/forms/code-editor";
import { useActionState, useState } from "react";
import Form from "next/form";
import { FormState } from "@/db/actions";

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

  const [code, setCode] = useState(defaultValues?.code || "");
  const [language, setLanguage] = useState(defaultValues?.languageId || "");
  const handleCodeChange = (value: string) => setCode(value);

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
        newFormData.append(
          "description",
          formData.get("description") as string
        );
        newFormData.append("languageId", formData.get("languageId") as string);
        newFormData.append("code", code);

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
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValues?.description || ""}
              placeholder="توضیحات مختصری درباره قطعه کد و کاربرد آن بنویسید"
              className="h-24 resize-none"
            />
            {state.errors?.description && (
              <p className="text-red-500 text-sm">{state.errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">کد</Label>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language={languages.find((lang) => lang.id === language)?.slug}
            />
            {state.errors?.code && (
              <p className="text-red-500 text-sm">{state.errors.code}</p>
            )}
            <p className="text-[0.8rem] text-muted-foreground">
              کد خود را با فرمت مناسب و توضیحات کافی وارد کنید.
            </p>
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
