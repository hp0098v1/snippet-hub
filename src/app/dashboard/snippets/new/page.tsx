import { Metadata } from "next";

import { SnippetForm } from "@/components/snippets/forms/snippet-form";
import { getLanguages } from "@/db/queries";
import { createSnippet } from "@/db/actions";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "ایجاد قطعه کد جدید | SnippetHub",
  description: "ایجاد و اشتراک‌گذاری قطعه کد جدید",
};

export default async function NewSnippetPage() {
  const languages = await getLanguages();

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <PageHeader
        title="ایجاد قطعه کد جدید"
        description="قطعه کد خود را به اشتراک بگذارید و به دیگران کمک کنید"
      />

      <SnippetForm
        languages={languages}
        onSubmit={createSnippet}
        cancelLink={`/dashboard`}
      />
    </div>
  );
}
