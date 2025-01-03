"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/db/actions";
import { useSession } from "@/components/providers/session-provider";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export function AuthButtons() {
  const { isAuth } = useSession();

  return (
    <div className="flex items-center gap-2">
      {isAuth ? (
        <>
          <form action={logout}>
            <Button aria-label="خروج" title="خروج" variant="ghost" size="icon">
              <LogOut />
              <span className="sr-only">خروج</span>
            </Button>
          </form>
          <Button aria-label="داشبورد" title="داشبورد" variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <User />
              <span className="sr-only">داشبورد</span>
            </Link>
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild>
            <Link href="/login">ورود</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">ثبت‌نام</Link>
          </Button>
        </>
      )}
    </div>
  );
}
