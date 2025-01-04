"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signup } from "@/db/actions";
import { useActionState } from "react";

export function AuthSignupForm() {
  const [state, formAction, isPending] = useActionState(signup, { errors: {} });

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
               
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                name="email"
                placeholder="example@domain.com"
                dir="ltr"
                className="text-left"
                autoComplete="email"
               
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <PasswordInput
                id="password"
                name="password"
                dir="ltr"
                className="text-left"
                autoComplete="current-password"
              />
              {state.errors?.password && (
                <p className="text-sm text-destructive">
                  {state.errors.password}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">تکرار رمز عبور</Label>
              <PasswordInput
                id="confirm-password"
                name="confirmPassword"
                dir="ltr"
                className="text-left"
                autoComplete="new-password"
              />
              {state.errors?.confirmPassword && (
                <p className="text-sm text-destructive">
                  {state.errors.confirmPassword}
                </p>
              )}
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? "ایجاد حساب..." : "ایجاد حساب"}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
          {state.errors?.message && (
            <p className="text-sm text-destructive">{state.errors.message}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="border-t p-6">
        <p className="text-center text-sm text-muted-foreground w-full">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-primary hover:underline">
            وارد شوید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
