import { formatDistanceToNow } from "date-fns-jalali";
import { Pencil, Eye } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SnippetDeleteForm } from "@/components/snippets/forms/snippet-delete-form";
import { LikeButton } from "@/components/snippets/like-button";
import { RichTextContent } from "@/components/snippets/rich-text-content";
import { SaveButton } from "@/components/snippets/save-button";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { incrementSnippetViews } from "@/db/actions";
import { getSnippetById, getSnippetByLanguage } from "@/db/queries";
import { config } from "@/lib/config";
import { getSession } from "@/lib/session";

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
    description: snippet.content,
  };
}

export default async function SnippetPage(props: Props) {
  const { id } = await props.params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    notFound();
  }

  // Get session
  const { userId, isAuth } = await getSession();

  // Increment views
  await incrementSnippetViews(id);

  const relatedSnippets = await getSnippetByLanguage(
    snippet?.languageId,
    snippet?.id
  );

  const isOwner = userId === snippet.user.id;

  return (
    <div className="container space-y-8 py-8">
      {/* user and metadata section */}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={snippet.user.image ?? undefined} />
            <AvatarFallback>{snippet.user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link
              className="text-lg font-medium hover:underline"
              href={config.routes.public.usersProfile(snippet.user.id)}
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
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{snippet.language.name}</Badge>
            <Badge className="gap-1.5" variant="secondary">
              <Eye className="h-4 w-4" />
              {snippet.views.toLocaleString("fa")}
            </Badge>
            <LikeButton
              isAuth={isAuth}
              isLiked={snippet.isLiked ?? false}
              likesCount={snippet._count?.likes ?? 0}
              snippetId={snippet.id}
            />
            {isAuth && (
              <SaveButton
                isAuth={isAuth}
                isSaved={snippet.isSaved ?? false}
                snippetId={snippet.id}
              />
            )}
          </div>

          {isOwner && (
            <div className="flex items-center gap-1">
              <Button asChild size="icon" variant="ghost">
                <Link href={config.routes.dashboard.snippets.edit(id)}>
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
        <RichTextContent content={snippet.content || ""} />
      </div>

      {/* Related snippets */}
      {relatedSnippets.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">قطعه کدهای مشابه</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSnippets.map((relatedSnippet) => (
              <SnippetCard
                isAuth={isAuth}
                key={relatedSnippet.id}
                snippet={relatedSnippet}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
