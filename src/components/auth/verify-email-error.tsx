import Link from "next/link";

import { AuthContainer } from "@/components/auth/auth-container";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";

export function VerifyEmailError() {
  return (
    <AuthContainer
      description="آدرس ایمیل مورد نیاز است. لطفاً دوباره از طریق صفحه ثبت‌نام اقدام کنید."
      showFooter={false}
      title="خطا در تأیید ایمیل"
    >
      <div className="flex justify-center gap-4">
        <Button asChild variant="outline">
          <Link href={config.routes.auth.signUp()}>ثبت‌نام</Link>
        </Button>
        <Button asChild>
          <Link href={config.routes.auth.login()}>ورود</Link>
        </Button>
      </div>
    </AuthContainer>
  );
}
