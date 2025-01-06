import { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { SnippetForm } from "@/components/snippets/forms/snippet-form";
import { createSnippet } from "@/db/actions";
import { getLanguages } from "@/db/queries";

export const metadata: Metadata = {
  title: "ایجاد قطعه کد جدید | SnippetHub",
  description: "ایجاد و اشتراک‌گذاری قطعه کد جدید",
};

export default async function NewSnippetPage() {
  const languages = await getLanguages();

  return (
    <div className="container max-w-3xl space-y-8 py-8">
      <PageHeader
        description="قطعه کد خود را به اشتراک بگذارید و به دیگران کمک کنید"
        title="ایجاد قطعه کد جدید"
      />

      <SnippetForm
        cancelLink={`/dashboard`}
        languages={languages}
        onSubmit={createSnippet}
      />
    </div>
  );
}
