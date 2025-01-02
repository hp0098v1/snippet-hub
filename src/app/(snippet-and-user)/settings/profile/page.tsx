import { Metadata } from "next";
import { getMockCurrentUser } from "@/lib/mock/auth";
import { notFound } from "next/navigation";
import { ProfileForm } from "@/components/forms/profile-form";

export const metadata: Metadata = {
  title: "تنظیمات پروفایل | SnippetHub",
  description: "ویرایش اطلاعات پروفایل کاربری",
};

export default async function ProfileSettingsPage() {
  const user = await getMockCurrentUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="container max-w-2xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">تنظیمات پروفایل</h1>
        <p className="text-muted-foreground">
          اطلاعات پروفایل خود را مدیریت کنید
        </p>
      </div>

      <ProfileForm user={user}  />
    </div>
  );
}
