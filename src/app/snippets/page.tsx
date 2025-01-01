import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Code2, Search, User } from "lucide-react";

export const metadata: Metadata = {
  title: "اسنیپت‌های عمومی | SnippetHub",
  description: "مرور و کشف اسنیپت‌های کد عمومی",
};

const languages = [
  { value: "all", label: "همه زبان‌ها" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "popular", label: "محبوب‌ترین" },
  { value: "alphabetical", label: "حروف الفبا" },
];

// This would come from your database
const snippets = [
  {
    id: "1",
    title: "نمونه اسنیپت جاوااسکریپت",
    description: "یک تابع ساده برای سلام و احوالپرسی",
    language: "JavaScript",
    author: {
      id: "1",
      name: "علی محمدی",
    },
    code: `function greeting(name) {
  return \`Hello, \${name}!\`;
}`,
    createdAt: "۱۴۰۲/۱۰/۱۵",
  },
  {
    id: "2",
    title: "مثال کلاس پایتون",
    description: "پیاده‌سازی یک کلاس ساده در پایتون",
    language: "Python",
    author: {
      id: "2",
      name: "سارا احمدی",
    },
    code: `class Person:
    def __init__(self, name):
        self.name = name`,
    createdAt: "۱۴۰۲/۱۰/۱۴",
  },
  // Add more snippets here
];

export default function PublicSnippetsPage() {
  return (
    <div className="container flex-1 space-y-8 p-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">اسنیپت‌های عمومی</h1>
        <p className="text-muted-foreground">
          اسنیپت‌های کد عمومی را مرور کنید و از آن‌ها ایده بگیرید
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="جستجو در اسنیپت‌ها..." className="pr-9" />
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="زبان برنامه‌نویسی" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="مرتب‌سازی" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => (
          <Card key={snippet.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="line-clamp-1">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {snippet.description}
                  </CardDescription>
                </div>
                <Badge variant="outline">{snippet.language}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <pre className="line-clamp-3 overflow-x-auto rounded-lg bg-muted p-4">
                <code className="text-xs">{snippet.code}</code>
              </pre>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <Link
                  href={`/users/${snippet.author.id}`}
                  className="hover:text-primary hover:underline"
                >
                  {snippet.author.name}
                </Link>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/snippets/${snippet.id}`}>
                  <Code2 className="ml-2 h-4 w-4" />
                  مشاهده
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 space-x-reverse">
        <Button variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="min-w-[40px]">
          ۱
        </Button>
        <Button variant="outline" className="min-w-[40px]" disabled>
          ۲
        </Button>
        <Button variant="outline" className="min-w-[40px]">
          ۳
        </Button>
        <Button variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
