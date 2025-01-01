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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "داشبورد | SnippetHub",
  description: "مدیریت اسنیپت‌ها و پروفایل کاربری",
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
  },
  {
    id: "2",
    title: "مثال کلاس پایتون",
    description: "پیاده‌سازی یک کلاس ساده در پایتون",
    language: "Python",
    visibility: "private",
    createdAt: "۱۴۰۲/۱۰/۱۴",
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

export default function DashboardPage() {
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
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 text-center md:flex-1 md:text-right">
              <div>
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <CardTitle className="text-2xl">{userData.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
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
              <Card className="border-none shadow-none">
                <CardHeader className="p-0 text-center">
                  <CardTitle className="text-2xl font-bold text-primary">
                    {userData.stats.private}
                  </CardTitle>
                  <CardDescription>خصوصی</CardDescription>
                </CardHeader>
              </Card>
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
            </div>
          </div>
          <Button className="w-full md:w-auto">
            <Plus className="ml-2 h-4 w-4" />
            اسنیپت جدید
          </Button>
        </div>

        {/* Snippets Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان</TableHead>
                <TableHead>زبان</TableHead>
                <TableHead>وضعیت نمایش</TableHead>
                <TableHead>تاریخ ایجاد</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {snippets.map((snippet) => (
                <TableRow key={snippet.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/snippets/${snippet.id}`}
                      className="hover:text-primary hover:underline"
                    >
                      {snippet.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{snippet.language}</Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {snippet.createdAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Code2 className="ml-2 h-4 w-4" />
                          مشاهده
                        </DropdownMenuItem>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
