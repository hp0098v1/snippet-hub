"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { updatePassword } from "@/db/actions";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePassword, {
    errors: {},
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>تغییر رمز عبور</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
            <PasswordInput
              className="text-left"
              defaultValue={state.data?.currentPassword ?? ""}
              dir="ltr"
              id="currentPassword"
              name="currentPassword"
            />
            {state.errors?.currentPassword && (
              <p className="text-sm text-destructive">
                {state.errors.currentPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">رمز عبور جدید</Label>
            <PasswordInput
              className="text-left"
              defaultValue={state.data?.newPassword ?? ""}
              dir="ltr"
              id="newPassword"
              name="newPassword"
            />
            {state.errors?.newPassword && (
              <p className="text-sm text-destructive">
                {state.errors.newPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
            <PasswordInput
              className="text-left"
              defaultValue={state.data?.confirmPassword ?? ""}
              dir="ltr"
              id="confirmPassword"
              name="confirmPassword"
            />
            {state.errors?.confirmPassword && (
              <p className="text-sm text-destructive">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-sm text-destructive">{state.errors.message}</p>
          )}

          <div className="flex justify-end gap-4">
            <Button asChild variant="outline">
              <Link href={`/dashboard`}>انصراف</Link>
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "در حال تغییر رمز عبور..." : "تغییر رمز عبور"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
