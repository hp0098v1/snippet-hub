"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/shared/image-upload";
import { User } from "@/lib/mock/users";
import Link from "next/link";

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const handleImageChange = (file: File) => {
    // Here you would handle the file upload to your server
    console.log("Selected file:", file);
  };

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <ImageUpload
            defaultImage={user.image}
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
        <form className="space-y-6">
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
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={`/users/${user.username}`}>انصراف</Link>
            </Button>
            <Button type="submit">ذخیره تغییرات</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
