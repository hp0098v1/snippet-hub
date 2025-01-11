import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { SnippetForm } from "@/components/snippets/forms/snippet-form";
import { getLanguages, getSnippetById } from "@/db/queries";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const snippet = await getSnippetById(params.id);

  if (!snippet) {
    return {
      title: "قطعه کد یافت نشد | SnippetHub",
    };
  }

  return {
    title: `ویرایش ${snippet.title} | SnippetHub`,
    description: snippet.content,
  };
}

export default async function EditSnippetPage(props: Props) {
  const params = await props.params;
  const snippet = await getSnippetById(params.id);
  const languages = await getLanguages();

  if (!snippet) {
    notFound();
  }

  return (
    <div className="container max-w-3xl space-y-8 py-8">
      <PageHeader
        description="تغییرات مورد نظر خود را اعمال کنید"
        title="ویرایش قطعه کد"
      />

      <SnippetForm
        cancelLink={`/snippets/${params.id}`}
        defaultValues={{
          title: snippet.title,
          content: snippet.content ?? "",
          languageId: snippet.languageId,
        }}
        languages={languages}
        snippetId={params.id}
      />
    </div>
  );
}
