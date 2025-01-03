"use client";

import { useActionState } from "react";
import {  resetPassword } from "@/db/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";

type Props = {
  token: string;
};

export function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const resetPasswordBinded = resetPassword.bind(null, token);
  const [state, formAction, isPending] = useActionState(resetPasswordBinded, {});

  useEffect(() => {
    if (state.success) {
      toast.success("رمز عبور با موفقیت تغییر کرد");
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">تغییر رمز عبور</CardTitle>
        <CardDescription>رمز عبور جدید خود را وارد کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <PasswordInput
              id="password"
              name="password"
              placeholder="رمز عبور جدید"
              dir="ltr"
              className="text-left"
            />
            {state.errors?.password && (
              <p className="text-sm text-red-500">{state.errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="تکرار رمز عبور جدید"
              dir="ltr"
              className="text-left"
            />
            {state.errors?.confirmPassword && (
              <p className="text-sm text-red-500">
                {state.errors.confirmPassword}
              </p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                در حال ذخیره...
              </>
            ) : (
              "ذخیره رمز عبور جدید"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
