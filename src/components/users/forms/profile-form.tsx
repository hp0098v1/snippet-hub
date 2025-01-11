"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ImageUpload } from "@/components/shared/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";
import {
  updateUserSchema,
  type UpdateUserSchema,
} from "@/lib/validations/user";
import { User } from "@/types";

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { execute, isPending } = useAction(updateUser, {
    onSuccess: () => {
      toast.success("اطلاعات کاربری با موفقیت بروزرسانی شد");
      router.push(config.routes.dashboard.home());
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user.username,
      name: user.name,
      bio: user.bio || "",
    },
  });

  function onSubmit(data: UpdateUserSchema) {
    // Add image to form data if it exists
    execute({
      ...data,
      image: imageFile,
    });
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <ImageUpload
            defaultFallback={user.name.slice(0, 2)}
            defaultImage={user.image ?? undefined}
            variant="avatar"
            onChange={setImageFile}
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              تصویر پروفایل خود را تغییر دهید
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input placeholder="نام خود را وارد کنید" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام کاربری</FormLabel>
                    <FormControl>
                      <Input
                        className="text-left"
                        dir="ltr"
                        placeholder="نام کاربری خود را وارد کنید"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>بیوگرافی</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-32 resize-none"
                      placeholder="درباره خود بنویسید..."
                      {...field}
                    />
                  </FormControl>
                  <p className="text-[0.8rem] text-muted-foreground">
                    بیوگرافی شما در پروفایل عمومی نمایش داده می‌شود.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button asChild variant="outline">
                <Link href={config.routes.dashboard.home()}>انصراف</Link>
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
