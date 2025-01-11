import {
  Bookmark,
  Code,
  Home,
  Lock,
  Pencil,
  Search,
  Share,
  User,
  Users,
} from "lucide-react";

import { config } from "@/lib/config";

export const NAVIGATION_LINKS = [
  {
    label: "خانه",
    icon: Home,
    href: config.routes.public.home(),
  },
  {
    label: "قطعه کدها",
    icon: Code,
    href: config.routes.public.snippets(),
  },
  {
    label: "کاربران",
    icon: Users,
    href: config.routes.public.users(),
  },
];

export const DASHBOARD_LINKS = [
  {
    label: "پروفایل",
    href: config.routes.dashboard.home(),
    icon: User,
  },
  {
    label: "ویرایش پروفایل",
    href: config.routes.dashboard.settings.profile(),
    icon: Pencil,
  },
  {
    label: "تغییر رمز عبور",
    href: config.routes.dashboard.settings.changePassword(),
    icon: Lock,
  },
  {
    label: "کد های ذخیره شده",
    href: config.routes.dashboard.savedSnippets(),
    icon: Bookmark,
  },
];

export const FEATURES = [
  {
    title: "جستجو در کد ها",
    description: "جستجوی کدهای خود را به صورت سریع و سازمان‌یافته انجام دهید",
    icon: Search,
  },
  {
    title: "اشتراک‌گذاری",
    description: "کدهای خود را به راحتی با دیگران به اشتراک بگذارید",
    icon: Share,
  },
  {
    title: "حریم خصوصی",
    description: "کدهای خود را به صورت سازمان‌یافته و در امنیت ذخیره کنید",
    icon: Lock,
  },
];

export const POPULAR_LANGUAGES = [
  { name: "JavaScript", image: "/languages/javascript.svg" },
  { name: "TypeScript", image: "/languages/typescript.svg" },
  { name: "Python", image: "/languages/python.svg" },
  { name: "PHP", image: "/languages/php.svg" },
  { name: "Java", image: "/languages/java.svg" },
  { name: "Go", image: "/languages/go.svg" },
  { name: "HTML", image: "/languages/html.svg" },
  { name: "CSS", image: "/languages/css.svg" },
];

export const SNIPPETS_SORT_OPTIONS = [
  { label: "جدیدترین", value: "newest" },
  { label: "قدیمی ترین", value: "oldest" },
  { label: "بیشترین بازدید", value: "views" },
  { label: "بیشترین لایک", value: "likes" },
];

export const USERS_SORT_OPTIONS = [
  { label: "جدیدترین", value: "newest" },
  { label: "قدیمی ترین", value: "oldest" },
  { label: "بیشترین کد", value: "snippets" },
];
