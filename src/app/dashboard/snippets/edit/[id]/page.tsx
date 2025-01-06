import { Metadata } from "next";
import { SnippetForm } from "@/components/snippets/forms/snippet-form";
import { notFound } from "next/navigation";
import { getLanguages, getSnippetById } from "@/db/queries";
import { updateSnippet } from "@/db/actions";
import { PageHeader } from "@/components/shared/page-header";

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
    <div className="container max-w-3xl py-8 space-y-8">
      <PageHeader
        title="ویرایش قطعه کد"
        description="تغییرات مورد نظر خود را اعمال کنید"
      />

      <SnippetForm
        snippetId={params.id}
        defaultValues={{
          title: snippet.title,
          content: snippet.content,
          languageId: snippet.languageId,
          userId: snippet.userId,
        }}
        languages={languages}
        onSubmit={updateSnippet}
        cancelLink={`/snippets/${params.id}`}
      />
    </div>
  );
}
