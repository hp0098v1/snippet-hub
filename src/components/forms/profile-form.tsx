"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/shared/image-upload";
import { User } from "@/db/types";
import { updateUser } from "@/db/actions";
import { useActionState } from "react";
import { useRef } from "react";

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(updateUser, {
    errors: {},
  });

  const handleImageChange = (url: string) => {
    // Add a hidden input to the form with the image URL
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "image";
    input.value = url;

    // Remove any existing image input
    const existingInput = formRef.current?.querySelector('input[name="image"]');
    if (existingInput) {
      existingInput.remove();
    }

    // Add the new input
    formRef.current?.appendChild(input);
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <ImageUpload
            defaultImage={user.image ?? undefined}
            defaultFallback={user.name.slice(0, 2)}
            onChange={handleImageChange}
          />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              تصویر پروفایل خود را تغییر دهید
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef} className="space-y-6" action={formAction}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                نام
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={user.name}
                placeholder="نام خود را وارد کنید"
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                نام کاربری
              </label>
              <Input
                id="username"
                name="username"
                defaultValue={user.username}
                placeholder="نام کاربری خود را وارد کنید"
                dir="ltr"
                className="text-left"
              />
              {state.errors?.username && (
                <p className="text-sm text-red-500">{state.errors.username}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">
              بیوگرافی
            </label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="درباره خود بنویسید..."
              className="h-32 resize-none"
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
            <Button variant="outline" asChild>
              <Link href={`/dashboard`}>انصراف</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
