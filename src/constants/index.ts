import { Bookmark, Code, Home, Lock, Pencil, User, Users } from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    label: "خانه",
    icon: Home,
    href: "/",
  },
  {
    label: "قطعه کدها",
    icon: Code,
    href: "/snippets",
  },
  {
    label: "کاربران",
    icon: Users,
    href: "/users",
  },
];

export const DASHBOARD_LINKS = [
  {
    label: "پروفایل",
    href: "/dashboard",
    icon: User,
  },
  {
    label: "ویرایش پروفایل",
    href: "/dashboard/settings/profile",
    icon: Pencil,
  },
  {
    label: "تغییر رمز عبور",
    href: "/dashboard/settings/change-password",
    icon: Lock,
  },
  {
    label: "کد های ذخیره شده",
    href: "/dashboard/saved-snippets",
    icon: Bookmark,
  },
];
