import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code2, Lock, Pencil, Settings } from "lucide-react";

type Props = {
  isOwnProfile?: boolean;
  userImage: string | null;
  userName: string;
  userUsername: string;
  userBio: string | null;
  userSnippetsCount: number;
};

export function UserProfileHeader({
  isOwnProfile = false,
  userImage,
  userName,
  userUsername,
  userBio,
  userSnippetsCount,
}: Props) {
  return (
    <section className="flex flex-col gap-8 sm:flex-row sm:items-start">
      <Avatar className="h-32 w-32">
        <AvatarImage src={userImage ?? undefined} />
        <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{userName}</h1>
            <p dir="ltr" className="text-muted-foreground">
              @{userUsername}
            </p>
          </div>

          {isOwnProfile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">تنظیمات</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings/profile"
                    className="flex w-full items-center"
                  >
                    <Pencil className="ml-2 h-4 w-4" />
                    ویرایش پروفایل
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/settings/update-password"
                    className="flex w-full items-center"
                  >
                    <Lock className="ml-2 h-4 w-4" />
                    تغییر رمز عبور
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {userBio && <p className="text-muted-foreground">{userBio}</p>}

        <div className="flex gap-4 text-sm">
          <div>
            <Code2 className="h-4 w-4 text-primary" />
            <span className="font-medium">{userSnippetsCount}</span>{" "}
            <span className="text-muted-foreground">قطعه کد</span>
          </div>
        </div>
      </div>
    </section>
  );
}
