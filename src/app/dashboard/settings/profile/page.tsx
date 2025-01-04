import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProfileForm } from "@/components/users/forms/profile-form";
import { getUserById } from "@/db/queries";
import { verifySession } from "@/lib/session";
import { PageHeader } from "@/components/shared/page-header";

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
      <PageHeader
        title="تنظیمات پروفایل"
        description="اطلاعات پروفایل خود را مدیریت کنید"
      />

      <ProfileForm user={user} />
    </div>
  );
}
