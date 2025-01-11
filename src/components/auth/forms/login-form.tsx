"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { login } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";
import { loginSchema, type LoginSchema } from "@/lib/validations/auth";

type Props = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl }: Props) {
  const router = useRouter();

  const { execute, isPending } = useAction(login, {
    isProtected: false,
    onSuccess: () => {
      router.push(callbackUrl || config.routes.dashboard.home());
    },
  });

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginSchema) {
    execute(data);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <input name="callbackUrl" type="hidden" value={callbackUrl || ""} />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      className="text-left"
                      dir="ltr"
                      placeholder="example@domain.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>رمز عبور</FormLabel>
                    <Link
                      className="text-xs text-muted-foreground hover:underline"
                      href={config.routes.auth.forgotPassword()}
                    >
                      رمز عبور را فراموش کرده‌اید؟
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      autoComplete="current-password"
                      className="text-left"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              {isPending ? "در حال ورود..." : "ورود به حساب"}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t p-6">
        <p className="w-full text-center text-sm text-muted-foreground">
          حساب کاربری ندارید؟{" "}
          <Link
            className="text-primary hover:underline"
            href={config.routes.auth.signUp()}
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
