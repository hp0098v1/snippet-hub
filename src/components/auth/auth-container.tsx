import Link from "next/link";

import { config } from "@/lib/config";

type Props = {
  title: string;
  description: string;
  showFooter?: boolean;
  children: React.ReactNode;
};

export function AuthContainer({
  children,
  title,
  description,
  showFooter = true,
}: Props) {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {children}

        {showFooter && (
          <p className="px-8 text-center text-sm text-muted-foreground">
            با ورود به سایت، شما{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href={config.routes.public.legal()}
            >
              قوانین و مقررات
            </Link>{" "}
            و{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href={config.routes.public.legal()}
            >
              حریم خصوصی
            </Link>{" "}
            را می‌پذیرید.
          </p>
        )}
      </div>
    </div>
  );
}
