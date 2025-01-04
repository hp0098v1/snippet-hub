"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { logout } from "@/db/actions";
import { useSession } from "@/context/session-provider";
import { DashboardMenu } from "@/components/shared/dashboard-menu";
import { LogOut } from "lucide-react";

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
          <DashboardMenu />
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
