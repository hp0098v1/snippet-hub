import { Metadata } from "next";
import { SnippetForm } from "@/components/forms/snippet-form";
import { redirect } from "next/navigation";
import { getMockCurrentUser } from "@/lib/mock/auth";
import { getLanguages } from "@/db/queries";

export const metadata: Metadata = {
  title: "ایجاد قطعه کد جدید | SnippetHub",
  description: "ایجاد و اشتراک‌گذاری قطعه کد جدید",
};

export default async function NewSnippetPage() {
  async function createSnippet(formData: FormData) {
    "use server";
    console.log(formData);
    // Handle snippet creation
    redirect("/snippets/1"); // Redirect to the new snippet
  }

  const languages = await getLanguages();
  const user = await getMockCurrentUser();

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ایجاد قطعه کد جدید</h1>
        <p className="text-muted-foreground">
          قطعه کد خود را به اشتراک بگذارید و به دیگران کمک کنید
        </p>
      </div>

      <SnippetForm
        languages={languages}
        onSubmit={createSnippet}
        cancelLink={`/users/${user?.username}`}
      />
    </div>
  );
}
