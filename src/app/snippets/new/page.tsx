import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";

export const metadata: Metadata = {
  title: "افزودن اسنیپت جدید | SnippetHub",
  description: "ایجاد اسنیپت کد جدید",
};

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

export default function NewSnippetPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            افزودن اسنیپت جدید
          </h2>
          <p className="text-muted-foreground">
            اطلاعات اسنیپت کد جدید را وارد کنید
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="ml-2 h-4 w-4" />
              انصراف
            </Link>
          </Button>
          <Button>
            <Save className="ml-2 h-4 w-4" />
            ذخیره
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات اسنیپت</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">عنوان</Label>
              <Input
                id="title"
                placeholder="عنوان اسنیپت را وارد کنید"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                placeholder="توضیحات مختصری درباره اسنیپت بنویسید"
                className="min-h-[100px]"
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label>زبان برنامه‌نویسی</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="زبان برنامه‌نویسی را انتخاب کنید" />
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

            {/* Visibility */}
            <div className="space-y-2">
              <Label>وضعیت نمایش</Label>
              <RadioGroup defaultValue="private" className="flex gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">خصوصی</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">عمومی</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Code Input */}
            <div className="space-y-2">
              <Label htmlFor="code">کد</Label>
              <Textarea
                id="code"
                dir="ltr"
                className="min-h-[400px] font-mono text-left"
                placeholder="// کد خود را اینجا وارد کنید"
                spellCheck={false}
                required
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
