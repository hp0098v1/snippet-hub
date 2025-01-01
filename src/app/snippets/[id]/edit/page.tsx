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
  title: "ویرایش اسنیپت | SnippetHub",
  description: "ویرایش اسنیپت کد",
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

// This would come from your database based on the ID
const snippetData = {
  id: "1",
  title: "نمونه اسنیپت",
  description: "این یک نمونه اسنیپت برای نمایش قابلیت‌های سایت است.",
  language: "javascript",
  visibility: "public",
  code: `// Example code
function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting("SnippetHub"));`,
};

export default function EditSnippetPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">ویرایش اسنیپت</h2>
          <p className="text-muted-foreground">اطلاعات اسنیپت را ویرایش کنید</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href={`/snippets/${snippetData.id}`}>
              <ArrowLeft className="ml-2 h-4 w-4" />
              انصراف
            </Link>
          </Button>
          <Button>
            <Save className="ml-2 h-4 w-4" />
            ذخیره تغییرات
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
                defaultValue={snippetData.title}
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
                defaultValue={snippetData.description}
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label>زبان برنامه‌نویسی</Label>
              <Select defaultValue={snippetData.language}>
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
              <RadioGroup
                defaultValue={snippetData.visibility}
                className="flex gap-4"
              >
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
                defaultValue={snippetData.code}
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
