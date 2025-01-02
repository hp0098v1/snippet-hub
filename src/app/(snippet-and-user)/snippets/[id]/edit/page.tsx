import { Metadata } from "next";
import { SnippetForm } from "@/components/forms/snippet-form";
import { getMockSnippets } from "@/lib/mock/snippets";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: snippets } = await getMockSnippets({});
  const snippet = snippets.find((s) => s.id === params.id);

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
  const { data: snippets } = await getMockSnippets({});
  const snippet = snippets.find((s) => s.id === params.id);

  if (!snippet) {
    notFound();
  }

  async function updateSnippet(formData: FormData) {
    "use server";
    console.log(formData);

    // Handle snippet update
    redirect(`/snippets/${params.id}`);
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
        defaultValues={{
          title: snippet.title,
          description: snippet.description,
          language: snippet.language,
          code: snippet.code,
          isPublic: true, // This would come from your actual data
        }}
        onSubmit={updateSnippet}
        cancelLink={`/snippets/${params.id}`}
      />
    </div>
  );
}
