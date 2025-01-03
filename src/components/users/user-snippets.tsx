import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PaginationControl } from "@/components/shared/pagination-control";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { SnippetWithAuthorAndLanguage } from "@/db/types";

type Props = {
  isOwnProfile?: boolean;
  totalPages: number;
  userSnippets: SnippetWithAuthorAndLanguage[];
};

export function UserSnippets({
  isOwnProfile = false,
  totalPages,
  userSnippets,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">قطعه کدها</h2>
        {isOwnProfile && (
          <Button asChild>
            <Link href="/dashboard/snippets/new">ایجاد قطعه کد جدید</Link>
          </Button>
        )}
      </div>

      {userSnippets.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {userSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
          <PaginationControl totalPages={totalPages} />
        </>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            {isOwnProfile
              ? "شما هنوز هیچ قطعه کدی ایجاد نکرده‌اید"
              : "این کاربر هنوز هیچ قطعه کدی ایجاد نکرده است"}
          </p>
          {isOwnProfile && (
            <Button className="mt-4" asChild>
              <Link href="/dashboard/snippets/new">ایجاد اولین قطعه کد</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
