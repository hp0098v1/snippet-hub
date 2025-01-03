"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
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
              id="currentPassword"
              name="currentPassword"
              dir="ltr"
              className="text-left"
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
              id="newPassword"
              name="newPassword"
              dir="ltr"
              className="text-left"
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
              id="confirmPassword"
              name="confirmPassword"
              dir="ltr"
              className="text-left"
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

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "در حال تغییر رمز عبور..." : "تغییر رمز عبور"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
