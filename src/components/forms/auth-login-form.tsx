"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/db/actions";
import { useSearchParams } from "next/navigation";

export function AuthLoginForm() {
  const [state, formAction, isPending] = useActionState(login, { errors: {} });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction}>
          <input type="hidden" name="callbackUrl" value={callbackUrl || ""} />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="example@domain.com"
                dir="ltr"
                className="text-left"
                autoComplete="email"
              />
              {state.errors?.email ? (
                <p className="text-sm text-red-500">{state.errors.email}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">رمز عبور</Label>
              </div>
              <PasswordInput
                id="password"
                name="password"
                dir="ltr"
                className="text-left"
                autoComplete="current-password"
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
        <p className="text-center text-sm text-muted-foreground w-full">
          حساب کاربری ندارید؟{" "}
          <Link href="/signup" className="text-primary hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
