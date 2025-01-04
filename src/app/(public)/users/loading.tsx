import { PageHeader } from "@/components/shared/page-header";
import {
  SearchFormSkeleton,
  UserListSkeleton,
} from "@/components/shared/skeletons";

export default function UsersLoading() {
  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="کاربران"
        description="پروفایل کاربران را مشاهده کنید و از قطعه کدهای آن‌ها استفاده کنید"
      />

      <SearchFormSkeleton />

      <UserListSkeleton />
    </div>
  );
}
