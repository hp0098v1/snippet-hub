"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { updatePassword } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";
import {
  updatePasswordSchema,
  type UpdatePasswordSchema,
} from "@/lib/validations/user";

export function ChangePasswordForm() {
  const router = useRouter();

  const { execute, isPending } = useAction(updatePassword, {
    onSuccess: () => {
      toast.success("رمز عبور با موفقیت تغییر کرد");
      router.push(config.routes.dashboard.home());
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: UpdatePasswordSchema) {
    execute(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>تغییر رمز عبور</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور فعلی</FormLabel>
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

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور جدید</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      className="text-left"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تکرار رمز عبور جدید</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autoComplete="new-password"
                      className="text-left"
                      dir="ltr"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button asChild variant="outline">
                <Link href={config.routes.dashboard.home()}>انصراف</Link>
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "در حال تغییر رمز عبور..." : "تغییر رمز عبور"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
