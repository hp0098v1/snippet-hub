import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileForm } from "@/components/users/forms/profile-form";
import { getUserById } from "@/db/queries";
import { verifySession } from "@/lib/session";

export const metadata: Metadata = {
  title: "تنظیمات پروفایل | SnippetHub",
  description: "ویرایش اطلاعات پروفایل کاربری",
};

export default async function ProfileSettingsPage() {
  const { userId } = await verifySession();

  const user = await getUserById(userId);

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
