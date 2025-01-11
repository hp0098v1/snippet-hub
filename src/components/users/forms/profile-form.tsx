"use client";

import Link from "next/link";
import { useActionState, useRef } from "react";

import { ImageUpload } from "@/components/shared/image-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/db/actions";
import { User } from "@/db/types";
import { config } from "@/lib/config";

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(updateUser, {
    errors: {},
  });

  const handleImageChange = (file: File | null) => {
    // Create a hidden input if it doesn't exist
    let input = formRef.current?.querySelector(
      'input[name="image"]'
    ) as HTMLInputElement;
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.name = "image";
      input.style.display = "none";
      formRef.current?.appendChild(input);
    }

    // Create a DataTransfer object to set the file
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
    } else {
      input.value = "";
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <ImageUpload
            defaultFallback={user.name.slice(0, 2)}
            defaultImage={user.image ?? undefined}
            variant="avatar"
            onChange={handleImageChange}
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              تصویر پروفایل خود را تغییر دهید
            </p>
          </div>
          {state.errors?.image && (
            <p className="text-sm text-red-500">{state.errors.image}</p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6" ref={formRef}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">
                نام
              </label>
              <Input
                defaultValue={state.data?.name ?? user.name}
                id="name"
                name="name"
                placeholder="نام خود را وارد کنید"
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">
                نام کاربری
              </label>
              <Input
                className="text-left"
                defaultValue={state.data?.username ?? user.username}
                dir="ltr"
                id="username"
                name="username"
                placeholder="نام کاربری خود را وارد کنید"
              />
              {state.errors?.username && (
                <p className="text-sm text-red-500">{state.errors.username}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="bio">
              بیوگرافی
            </label>
            <Textarea
              className="h-32 resize-none"
              defaultValue={state.data?.bio ?? (user.bio || "")}
              id="bio"
              name="bio"
              placeholder="درباره خود بنویسید..."
            />
            <p className="text-[0.8rem] text-muted-foreground">
              بیوگرافی شما در پروفایل عمومی نمایش داده می‌شود.
            </p>
            {state.errors?.bio && (
              <p className="text-sm text-red-500">{state.errors.bio}</p>
            )}
          </div>

          {state.errors?.message && (
            <p className="text-sm text-red-500">{state.errors.message}</p>
          )}

          <div className="flex justify-end gap-4">
            <Button asChild variant="outline">
              <Link href={config.routes.dashboard.home()}>انصراف</Link>
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
