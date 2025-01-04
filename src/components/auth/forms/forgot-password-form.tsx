"use client";

import { useActionState } from "react";
import { forgotPassword } from "@/db/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, {});

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">فراموشی رمز عبور</CardTitle>
        <CardDescription>
          ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              dir="ltr"
              className="text-left"
            />
            {state.errors?.email && (
              <p className="text-sm text-red-500">{state.errors.email}</p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}

          {state.success && (
            <p className="text-sm text-green-500">
              لینک بازیابی رمز عبور به ایمیل شما ارسال شد
            </p>
          )}

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال ارسال...
                </>
              ) : (
                "ارسال لینک بازیابی"
              )}
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/login">بازگشت به صفحه ورود</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
