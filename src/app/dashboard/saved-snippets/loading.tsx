import { PageHeader } from "@/components/shared/page-header";
import { SnippetListSkeleton } from "@/components/shared/skeletons";

export default function SavedSnippetsLoading() {
  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="قطعه کدهای ذخیره شده"
        description="قطعه کدهایی که ذخیره کرده‌اید"
      />

      <SnippetListSkeleton />
    </div>
  );
}
