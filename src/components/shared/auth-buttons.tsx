"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { DashboardMenu } from "@/components/shared/dashboard-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/context/session-provider";
import { logout } from "@/db/actions";
import { config } from "@/lib/config";

export function AuthButtons() {
  const { isAuth, isLoading } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isAuth ? (
        <>
          <form action={logout}>
            <Button aria-label="خروج" size="icon" title="خروج" variant="ghost">
              <LogOut />
              <span className="sr-only">خروج</span>
            </Button>
          </form>
          <DashboardMenu />
        </>
      ) : (
        <>
          <Button asChild variant="ghost">
            <Link href={config.routes.auth.login()}>ورود</Link>
          </Button>
          <Button asChild>
            <Link href={config.routes.auth.signUp()}>ثبت‌نام</Link>
          </Button>
        </>
      )}
    </div>
  );
}
