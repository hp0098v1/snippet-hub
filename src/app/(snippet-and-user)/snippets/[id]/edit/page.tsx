import { Metadata } from "next";
import { SnippetForm } from "@/components/forms/snippet-form";
import { notFound } from "next/navigation";
import { getLanguages, getSnippetById } from "@/db/queries";
import { updateSnippet } from "@/db/actions";

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
    description: snippet.description,
  };
}

export default async function EditSnippetPage(props: Props) {
  const params = await props.params;
  const snippet = await getSnippetById(params.id);
  const languages = await getLanguages();
  const fakeUserId = "_c0YN4xpKdD2J6vA5EGRQ";

  if (!snippet) {
    notFound();
  }

  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ویرایش قطعه کد</h1>
        <p className="text-muted-foreground">
          تغییرات مورد نظر خود را اعمال کنید
        </p>
      </div>

      <SnippetForm
        snippetId={params.id}
        defaultValues={{
          title: snippet.title,
          description: snippet.description,
          languageId: snippet.languageId,
          code: snippet.code,
          userId: snippet.userId,
        }}
        languages={languages}
        userId={fakeUserId}
        onSubmit={updateSnippet}
        cancelLink={`/snippets/${params.id}`}
      />
    </div>
  );
}
