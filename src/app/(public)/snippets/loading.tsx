import { PageHeader } from "@/components/shared/page-header";
import {
  SearchFormSkeleton,
  SnippetListSkeleton,
} from "@/components/shared/skeletons";

export default function SnippetsLoading() {
  return (
    <div className="container py-8 space-y-8">
      <PageHeader
        title="قطعه کدها"
        description="قطعه کدهای به اشتراک گذاشته شده توسط کاربران"
      />

      {/* Search and Filter Section */}
      <SearchFormSkeleton btnCount={3} />

      {/* Snippets Grid */}
      <SnippetListSkeleton />
    </div>
  );
}
