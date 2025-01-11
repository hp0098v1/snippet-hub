"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { forgotPassword } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const router = useRouter();

  const { execute, isPending } = useAction(forgotPassword, {
    onSuccess: () => {
      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
      router.push(config.routes.auth.login());
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(data: ForgotPasswordSchema) {
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

            <Button className="w-full" disabled={isPending}>
              {isPending ? "در حال ارسال..." : "ارسال لینک بازیابی"}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t p-6">
        <p className="w-full text-center text-sm text-muted-foreground">
          رمز عبور خود را به یاد آوردید؟{" "}
          <Link
            className="text-primary hover:underline"
            href={config.routes.auth.login()}
          >
            وارد شوید
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
