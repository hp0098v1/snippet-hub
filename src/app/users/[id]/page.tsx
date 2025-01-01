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
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Code2,
  Edit2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Trash2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "پروفایل کاربر | SnippetHub",
  description: "مشاهده پروفایل و اسنیپت‌های کاربر",
};

// This would come from your database or auth session
const userData = {
  id: "1",
  name: "علی محمدی",
  username: "@alimohammadi",
  bio: "توسعه‌دهنده فول‌استک و علاقه‌مند به اشتراک‌گذاری دانش",
  email: "ali@example.com",
  avatarUrl: null,
  joinedAt: "۱۴۰۲/۰۸/۱۵",
  stats: {
    total: 12,
    public: 8,
    private: 4,
  },
};

// This would come from your database
const snippets = [
  {
    id: "1",
    title: "نمونه اسنیپت جاوااسکریپت",
    description: "یک تابع ساده برای سلام و احوالپرسی",
    language: "JavaScript",
    visibility: "public",
    createdAt: "۱۴۰۲/۱۰/۱۵",
    code: `function greeting(name) {
  return \`Hello, \${name}!\`;
}`,
  },
  {
    id: "2",
    title: "مثال کلاس پایتون",
    description: "پیاده‌سازی یک کلاس ساده در پایتون",
    language: "Python",
    visibility: "private",
    createdAt: "۱۴۰۲/۱۰/۱۴",
    code: `class Person:
    def __init__(self, name):
        self.name = name`,
  },
  // Add more snippets here
];

const languages = [
  { value: "all", label: "همه زبان‌ها" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

type Props = {
  params: Promise<{ id: string }>;
};

export default async function UserProfilePage(props: Props) {
  const { id } = await props.params;
  // In a real app, you would check if the logged-in user matches this profile
  const isOwnProfile = id === userData.id;

  return (
    <div className="container flex-1 space-y-8 p-8">
      {/* User Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-x-reverse md:space-y-0">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData.avatarUrl || ""}
                  alt={userData.name}
                />
                <AvatarFallback className="text-xl">
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2 text-center md:flex-1 md:text-right">
              <div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <CardTitle className="text-2xl">{userData.name}</CardTitle>
                  {isOwnProfile && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardDescription className="mt-1">
                  {userData.username}
                </CardDescription>
              </div>
              {userData.bio && (
                <p className="text-muted-foreground">{userData.bio}</p>
              )}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground md:justify-start">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  عضویت: {userData.joinedAt}
                </div>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="flex gap-4">
              <Card className="border-none shadow-none">
                <CardHeader className="p-0 text-center">
                  <CardTitle className="text-2xl font-bold text-primary">
                    {userData.stats.total}
                  </CardTitle>
                  <CardDescription>کل اسنیپت‌ها</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-none shadow-none">
                <CardHeader className="p-0 text-center">
                  <CardTitle className="text-2xl font-bold text-primary">
                    {userData.stats.public}
                  </CardTitle>
                  <CardDescription>عمومی</CardDescription>
                </CardHeader>
              </Card>
              {isOwnProfile && (
                <Card className="border-none shadow-none">
                  <CardHeader className="p-0 text-center">
                    <CardTitle className="text-2xl font-bold text-primary">
                      {userData.stats.private}
                    </CardTitle>
                    <CardDescription>خصوصی</CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Snippet Management Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
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
              {isOwnProfile && (
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="وضعیت نمایش" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه</SelectItem>
                    <SelectItem value="public">عمومی</SelectItem>
                    <SelectItem value="private">خصوصی</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          {isOwnProfile && (
            <Button className="w-full md:w-auto">
              <Plus className="ml-2 h-4 w-4" />
              اسنیپت جدید
            </Button>
          )}
        </div>

        {/* Snippets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {snippets
            .filter(
              (snippet) => isOwnProfile || snippet.visibility === "public"
            )
            .map((snippet) => (
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
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {snippet.createdAt}
                    </div>
                    <Badge
                      variant={
                        snippet.visibility === "public"
                          ? "default"
                          : "secondary"
                      }
                    >
                      <div className="flex items-center gap-1">
                        {snippet.visibility === "public" ? (
                          <Globe className="h-3 w-3" />
                        ) : (
                          <Lock className="h-3 w-3" />
                        )}
                        {snippet.visibility === "public" ? "عمومی" : "خصوصی"}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/snippets/${snippet.id}`}>
                        <Code2 className="ml-2 h-4 w-4" />
                        مشاهده
                      </Link>
                    </Button>
                    {isOwnProfile && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="ml-2 h-4 w-4" />
                            ویرایش
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {snippet.visibility === "public" ? (
                              <>
                                <EyeOff className="ml-2 h-4 w-4" />
                                خصوصی کردن
                              </>
                            ) : (
                              <>
                                <Eye className="ml-2 h-4 w-4" />
                                عمومی کردن
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                            <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
