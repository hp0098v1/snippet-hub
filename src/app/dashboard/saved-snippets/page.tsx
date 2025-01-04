import { Suspense } from "react";
import { getSavedSnippets } from "@/db/queries";
import { verifySession } from "@/lib/session";
import { PageHeader } from "@/components/shared/page-header";
import { SnippetsList } from "@/components/snippets/snippets-list";

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
    <div className="container py-8 space-y-8">
      <PageHeader
        title="قطعه کدهای ذخیره شده"
        description="قطعه کدهایی که ذخیره کرده‌اید"
      />

      <Suspense fallback={<div>Loading...</div>}>
        <SnippetsList
          snippets={snippets}
          totalPages={metadata.totalPages}
          isAuth={isAuth}
        />
      </Suspense>
    </div>
  );
}
