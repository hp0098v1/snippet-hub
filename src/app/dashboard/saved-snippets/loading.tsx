import { PageHeader } from "@/components/shared/page-header";
import { SnippetListSkeleton } from "@/components/shared/skeletons";

export default function SavedSnippetsLoading() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        description="قطعه کدهایی که ذخیره کرده‌اید"
        title="قطعه کدهای ذخیره شده"
      />

      <SnippetListSkeleton />
    </div>
  );
}
