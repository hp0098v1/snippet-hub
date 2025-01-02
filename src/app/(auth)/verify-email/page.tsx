import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AuthContainer } from "@/components/auth/auth-container";

export const metadata: Metadata = {
  title: "تأیید ایمیل | SnippetHub",
  description: "تأیید آدرس ایمیل حساب کاربری",
};

export default function VerifyEmailPage() {
  return (
    <AuthContainer
      title="تأیید ایمیل"
      description="برای تکمیل ثبت‌نام، لطفاً کد تأیید ارسال شده به ایمیل خود را وارد کنید"
      showFooter={false}
    >
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-4">
            {/* OTP Input */}
            <div className="space-y-2">
              <Label htmlFor="otp">کد تأیید</Label>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {/* <p className="text-sm text-muted-foreground">
                  کد تأیید به آدرس example@gmail.com ارسال شد
                </p> */}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              تأیید ایمیل
            </Button>

            {/* Help Text */}
            <p className="text-center text-sm text-muted-foreground">
              اگر ایمیلی دریافت نکرده‌اید، لطفاً پوشه اسپم را نیز بررسی کنید
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthContainer>
  );
}
