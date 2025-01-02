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

import { languages } from "@/lib/mock/languages";
import Link from "next/link";

interface SnippetFormProps {
  defaultValues?: {
    title?: string;
    description?: string;
    language?: string;
    code?: string;
    isPublic?: boolean;
  };
  isSubmitting?: boolean;
  onSubmit?: (data: FormData) => void;
  cancelLink: string;
}

export function SnippetForm({
  defaultValues,
  isSubmitting = false,
  onSubmit,
  cancelLink,
}: SnippetFormProps) {
  const isEditing = !!defaultValues;

  return (
    <form action={onSubmit}>
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:*:flex-1">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان</Label>
            <Input
              id="title"
              name="title"
              defaultValue={defaultValues?.title}
              placeholder="یک عنوان توصیفی برای قطعه کد خود وارد کنید"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">زبان برنامه‌نویسی</Label>
            <Select name="language" defaultValue={defaultValues?.language}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب زبان برنامه‌نویسی" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValues?.description}
              placeholder="توضیحات مختصری درباره قطعه کد و کاربرد آن بنویسید"
              className="h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">کد</Label>
            <Textarea
              dir="ltr"
              id="code"
              name="code"
              defaultValue={defaultValues?.code}
              placeholder="// کد خود را اینجا وارد کنید"
              className="h-72 font-mono resize-none"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              کد خود را با فرمت مناسب و توضیحات کافی وارد کنید.
            </p>
          </div>

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
    </form>
  );
}
