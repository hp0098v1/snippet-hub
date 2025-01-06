import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
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
    <div className="container max-w-2xl space-y-8 py-8">
      <PageHeader
        description="اطلاعات پروفایل خود را مدیریت کنید"
        title="تنظیمات پروفایل"
      />

      <ProfileForm user={user} />
    </div>
  );
}
