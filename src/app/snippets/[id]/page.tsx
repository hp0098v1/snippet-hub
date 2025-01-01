import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Globe,
  Lock,
  MoreVertical,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "نمونه اسنیپت | SnippetHub",
  description: "جزئیات اسنیپت کد",
};

// This would come from your database
const snippetData = {
  id: "1",
  title: "نمونه اسنیپت",
  description: "این یک نمونه اسنیپت برای نمایش قابلیت‌های سایت است.",
  language: "JavaScript",
  visibility: "public",
  createdAt: "۱۴۰۲/۱۰/۱۵",
  code: `// Example code
function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting("SnippetHub"));`,
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SnippetDetailsPage(props: Props) {
  const { id } = await props.params;
  if (id !== snippetData.id) {
    return notFound();
  }

  return (
    <div className="container flex-1 space-y-8 p-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {snippetData.title}
            </h2>
            <Badge
              variant={
                snippetData.visibility === "public" ? "default" : "secondary"
              }
            >
              <div className="flex items-center gap-1">
                {snippetData.visibility === "public" ? (
                  <Globe className="h-3 w-3" />
                ) : (
                  <Lock className="h-3 w-3" />
                )}
                {snippetData.visibility === "public" ? "عمومی" : "خصوصی"}
              </div>
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {snippetData.createdAt}
            </div>
            <Badge variant="outline">{snippetData.language}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/snippets/edit/${snippetData.id}`}>
              <Pencil className="ml-2 h-4 w-4" />
              ویرایش
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="ml-2 h-4 w-4" />
                اشتراک‌گذاری
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Description */}
        {snippetData.description && (
          <Card>
            <CardHeader>
              <CardTitle>توضیحات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{snippetData.description}</p>
            </CardContent>
          </Card>
        )}

        {/* Code */}
        <Card>
          <CardHeader>
            <CardTitle>کد</CardTitle>
            <CardDescription>زبان: {snippetData.language}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-md bg-muted">
              <div className="absolute right-4 top-4">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <pre
                className="overflow-x-auto p-4 text-sm"
                style={{ direction: "ltr" }}
              >
                <code className="block font-mono text-left">
                  {snippetData.code}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
