"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyEmail, resendVerificationCode } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { useCountdown } from "@/hooks/use-countdown";
import { config } from "@/lib/config";
import {
  verifyEmailSchema,
  type VerifyEmailSchema,
} from "@/lib/validations/auth";

interface VerifyEmailFormProps {
  email: string;
}

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const router = useRouter();

  const { execute, isPending } = useAction(verifyEmail, {
    onSuccess: () => {
      router.push(config.routes.dashboard.home());
    },
  });

  const form = useForm<VerifyEmailSchema>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(verifyEmailSchema),
  });

  function onSubmit(data: VerifyEmailSchema) {
    execute({ ...data, email });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد تأیید</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="one-time-code"
                      className="text-left"
                      dir="ltr"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="کد ۶ رقمی"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              {isPending ? "در حال تأیید..." : "تأیید ایمیل"}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t p-6">
        <ResendVerificationForm email={email} />
      </CardFooter>
    </Card>
  );
}

interface ResendVerificationFormProps {
  email: string;
}

function ResendVerificationForm({ email }: ResendVerificationFormProps) {
  const { execute, isPending } = useAction(resendVerificationCode, {
    onSuccess: () => {
      restart();
    },
  });

  const { isFinished, formattedTime, restart } = useCountdown({
    initialSeconds: 120, // 2 minutes
  });

  function handleResend() {
    execute({ email });
  }

  if (!isFinished) {
    return (
      <p className="w-full text-center text-sm text-muted-foreground">
        {formattedTime} تا ارسال مجدد کد
      </p>
    );
  }

  return (
    <div className="w-full text-center">
      <Button
        className="w-full"
        disabled={isPending}
        variant="outline"
        onClick={handleResend}
      >
        {isPending ? "در حال ارسال..." : "ارسال مجدد کد تأیید"}
        <ArrowLeft className="mr-2 h-4 w-4" />
      </Button>
    </div>
  );
}
