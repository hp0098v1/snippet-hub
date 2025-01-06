"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useActionState, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { verifyEmail, resendVerificationCode } from "@/db/actions";

export function AuthVerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const [state, formAction, isPending] = useActionState(verifyEmail, {
    errors: {},
  });
  const [resendState, resendAction, resendPending] = useActionState(
    resendVerificationCode,
    {
      errors: {},
    }
  );
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  useEffect(() => {
    if (!email) {
      router.push("/signup");
    }
  }, [email, router]);

  const handleResend = async (formData: FormData) => {
    await resendAction(formData);
    setCanResend(false);
    setTimeLeft(120);
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-4">
          <input name="email" type="hidden" value={email} />
          {/* OTP Input */}
          <div className="space-y-2">
            <Label htmlFor="code">کد تأیید</Label>
            <InputOTP id="code" maxLength={6} name="code">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-muted-foreground">
              کد تأیید به آدرس {email} ارسال شد
            </p>
            {state.errors?.code && (
              <p className="text-sm text-destructive">{state.errors.code}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? "در حال تأیید..." : "تأیید ایمیل"}
          </Button>

          {/* Help Text */}
          <p className="text-center text-sm text-muted-foreground">
            اگر ایمیلی دریافت نکرده‌اید، لطفاً پوشه اسپم را نیز بررسی کنید
          </p>

          {state.errors?.message && (
            <p className="text-sm text-destructive">{state.errors.message}</p>
          )}
        </form>

        <div className="mt-4 space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            کد را دریافت نکردید؟
            {!canResend && timeLeft > 0 ? (
              <span className="block text-sm">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")} تا ارسال مجدد
              </span>
            ) : (
              <>
                <form action={handleResend}>
                  <input name="email" type="hidden" value={email} />
                  <Button
                    className="w-full"
                    disabled={!canResend || resendPending}
                    type="submit"
                    variant="ghost"
                  >
                    {resendPending ? "در حال ارسال..." : "ارسال مجدد کد"}
                  </Button>
                </form>
                {resendState.errors?.message && (
                  <p className="text-sm text-destructive">
                    {resendState.errors.message}
                  </p>
                )}
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
