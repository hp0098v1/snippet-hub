import { Suspense } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { SnippetsList } from "@/components/snippets/snippets-list";
import { getSavedSnippets } from "@/db/queries";
import { verifySession } from "@/lib/session";

type Props = {
  searchParams: Promise<{
    page: string;
    limit: string;
  }>;
};

export default async function SavedSnippetsPage({ searchParams }: Props) {
  const { userId: id, isAuth } = await verifySession();
  const { page, limit } = await searchParams;

  const { data: snippets, metadata } = await getSavedSnippets({
    userId: id,
    page: Number(page) || 1,
    limit: Number(limit) || 12,
  });

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        description="قطعه کدهایی که ذخیره کرده‌اید"
        title="قطعه کدهای ذخیره شده"
      />

      <Suspense fallback={<div>Loading...</div>}>
        <SnippetsList
          isAuth={isAuth}
          snippets={snippets}
          totalPages={metadata.totalPages}
        />
      </Suspense>
    </div>
  );
}
