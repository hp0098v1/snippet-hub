"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { login } from "@/db/actions";

export function AuthLoginForm() {
  const [state, formAction, isPending] = useActionState(login, { errors: {} });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction}>
          <input name="callbackUrl" type="hidden" value={callbackUrl || ""} />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                autoComplete="email"
                className="text-left"
                dir="ltr"
                id="email"
                name="email"
                placeholder="example@domain.com"
                type="email"
              />
              {state.errors?.email ? (
                <p className="text-sm text-red-500">{state.errors.email}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">رمز عبور</Label>
                <Link
                  className="text-xs text-muted-foreground hover:underline"
                  href="/forgot-password"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>
              <PasswordInput
                autoComplete="current-password"
                className="text-left"
                dir="ltr"
                id="password"
                name="password"
              />
              {state.errors?.password ? (
                <p className="text-sm text-red-500">{state.errors.password}</p>
              ) : null}
            </div>

            {state.errors?.message ? (
              <p className="text-sm text-red-500">{state.errors.message}</p>
            ) : null}
            <Button className="w-full" disabled={isPending}>
              {isPending ? "در حال ورود..." : "ورود به حساب"}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t p-6">
        <p className="w-full text-center text-sm text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link className="text-primary hover:underline" href="/signup">
            ثبت‌نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
