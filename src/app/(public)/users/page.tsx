import { Metadata } from "next";

import { getUsers } from "@/db/queries";
import { PageHeader } from "@/components/shared/page-header";
import { UsersList } from "@/components/users/users-list";
import { SearchForm } from "@/components/shared/search-form";

export const metadata: Metadata = {
  title: "کاربران | SnippetHub",
  description: "مشاهده لیست کاربران و پروفایل‌های عمومی",
};

type Props = {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function UsersPage(props: Props) {
  const { query, page } = await props.searchParams;

  const { data: users, metadata } = await getUsers({
    query,
    page: Number(page) || 1,
    limit: 6,
  });

  return (
    <div className="container space-y-8 py-8">
      <PageHeader
        title="کاربران"
        description="پروفایل کاربران را مشاهده کنید و از قطعه کدهای آن‌ها استفاده کنید"
      />

      <SearchForm
        query={query || ""}
        action="/users"
        searchPlaceholder="جستجو در کاربران..."
        searchButtonText="جستجو"
      />

      <UsersList users={users} totalPages={metadata.totalPages} />
    </div>
  );
}
