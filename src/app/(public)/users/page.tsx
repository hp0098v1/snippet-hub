import { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { SearchForm } from "@/components/shared/search-form";
import { UsersList } from "@/components/users/users-list";
import { getUsers } from "@/db/queries";
import { USERS_SORT_OPTIONS } from "@/lib/constants";
import { UsersSortOption } from "@/types";
export const metadata: Metadata = {
  title: "کاربران | SnippetHub",
  description: "مشاهده لیست کاربران و پروفایل‌های عمومی",
};

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
  }>;
};

export default async function UsersPage(props: Props) {
  const { query, page, sortBy } = await props.searchParams;

  const { data: users, metadata } = await getUsers({
    query,
    page: Number(page) || 1,
    limit: 6,
    sortBy: sortBy as UsersSortOption,
  });

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        description="پروفایل کاربران را مشاهده کنید و از قطعه کدهای آن‌ها استفاده کنید"
        title="کاربران"
      />

      <SearchForm
        hasSortFilter
        action="/users"
        query={query || ""}
        searchButtonText="جستجو"
        searchPlaceholder="جستجو در کاربران..."
        sortBy={sortBy || "newest"}
        sortOptions={USERS_SORT_OPTIONS}
      />

      <UsersList totalPages={metadata.totalPages} users={users} />
    </div>
  );
}
