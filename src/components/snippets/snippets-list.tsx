import { PaginationControl } from "@/components/shared/pagination-control";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { SnippetWithAuthorAndLanguage } from "@/db/types";
import { cn } from "@/lib/utils";

type Props = {
  snippets: SnippetWithAuthorAndLanguage[];
  totalPages: number;
  isAuth: boolean;
  className?: string;
  noSnippetMessage?: string;
};

export function SnippetsList({
  snippets,
  totalPages,
  isAuth,
  className,
  noSnippetMessage = "هیچ قطعه کدی یافت نشد",
}: Props) {
  return (
    <>
      {snippets.length > 0 ? (
        <section
          className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
        >
          {snippets.map((snippet) => (
            <SnippetCard key={snippet.id} isAuth={isAuth} snippet={snippet} />
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-dashed py-32 md:py-48 text-center">
          <p className="text-lg text-muted-foreground">{noSnippetMessage}</p>
        </section>
      )}

      <PaginationControl totalPages={totalPages} />
    </>
  );
}
