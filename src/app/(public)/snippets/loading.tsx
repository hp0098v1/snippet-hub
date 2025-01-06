import { PageHeader } from "@/components/shared/page-header";
import {
  SearchFormSkeleton,
  SnippetListSkeleton,
} from "@/components/shared/skeletons";

export default function SnippetsLoading() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        description="قطعه کدهای به اشتراک گذاشته شده توسط کاربران"
        title="قطعه کدها"
      />

      {/* Search and Filter Section */}
      <SearchFormSkeleton btnCount={3} />

      {/* Snippets Grid */}
      <SnippetListSkeleton />
    </div>
  );
}
