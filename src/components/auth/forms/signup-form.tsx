"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signup } from "@/db/actions";

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, { errors: {} });

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                autoComplete="name"
                defaultValue={state.data?.name ?? ""}
                id="name"
                name="name"
                type="text"
              />
              {state.errors?.name && (
                <p className="text-sm text-destructive">{state.errors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                autoComplete="email"
                className="text-left"
                defaultValue={state.data?.email ?? ""}
                dir="ltr"
                id="email"
                name="email"
                placeholder="example@domain.com"
              />
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">رمز عبور</Label>
              <PasswordInput
                className="text-left"
                defaultValue={state.data?.password ?? ""}
                dir="ltr"
                id="password"
                name="password"
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
                className="text-left"
                defaultValue={state.data?.confirmPassword ?? ""}
                dir="ltr"
                id="confirm-password"
                name="confirmPassword"
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
        <p className="w-full text-center text-sm text-muted-foreground">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link className="text-primary hover:underline" href="/login">
            وارد شوید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
