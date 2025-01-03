import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns-jalali";
import { Pencil, Eye } from "lucide-react";
import { getSnippetById, getSnippetByLanguage } from "@/db/queries";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { CodeBlock } from "@/components/shared/code-block";
import { SnippetDeleteForm } from "@/components/forms/snippet-delete-form";
import { getSession } from "@/lib/session";
import { incrementSnippetViews } from "@/db/actions";
import { LikeButton } from "@/components/snippets/like-button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = await props.params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    return {
      title: "قطعه کد یافت نشد | SnippetHub",
    };
  }

  return {
    title: `${snippet.title} | SnippetHub`,
    description: snippet.description,
  };
}

export default async function SnippetPage(props: Props) {
  const { id } = await props.params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    notFound();
  }

  // Get session
  const { userId } = await getSession();

  // Increment views
  await incrementSnippetViews(id);

  const relatedSnippets = await getSnippetByLanguage(
    snippet?.languageId,
    snippet?.id
  );

  const isOwner = userId === snippet.user.id;

  return (
    <div className="container py-8 space-y-8">
      {/* user and metadata section */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={snippet.user.image ?? undefined} />
            <AvatarFallback>{snippet.user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link
              href={`/users/${snippet.user.id}`}
              className="text-lg font-medium hover:underline"
            >
              {snippet.user.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(snippet.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <Eye className="h-4 w-4" />
            {snippet.views.toLocaleString("fa")}
          </Badge>
          <LikeButton
            snippetId={snippet.id}
            isLiked={snippet.isLiked ?? false}
            likesCount={snippet._count?.likes ?? 0}
          />
          <Badge variant="secondary" className="capitalize">
            {snippet.language.name}
          </Badge>

          {isOwner && (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/snippets/edit/${id}`}>
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">ویرایش</span>
                </Link>
              </Button>

              <SnippetDeleteForm id={id} />
            </div>
          )}
        </div>
      </div>

      {/* Title and description */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{snippet.title}</h1>
        <p className="text-muted-foreground">{snippet.description}</p>
      </div>

      {/* Code section */}
      <Card>
        <CardContent dir="ltr" className="p-6">
          <CodeBlock code={snippet.code} language={snippet.language.slug} />
        </CardContent>
      </Card>

      {/* Related snippets */}
      {relatedSnippets.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">قطعه کدهای مشابه</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSnippets.map((relatedSnippet) => (
              <SnippetCard key={relatedSnippet.id} snippet={relatedSnippet} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
