import { Metadata } from "next";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UserCard } from "@/components/users/user-card";
import { PaginationControl } from "@/components/shared/pagination-control";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/db/queries";

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
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">کاربران</h1>
        <p className="text-muted-foreground">
          پروفایل کاربران را مشاهده کنید و از قطعه کدهای آن‌ها استفاده کنید
        </p>
      </div>

      <Form
        action="/users"
        className="flex flex-col max-sm:items-start gap-4 sm:flex-row"
      >
        <div className="relative max-w-md w-full">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            name="query"
            defaultValue={query}
            placeholder="جستجو در کاربران..."
            className="w-full pr-9"
          />
        </div>

        <Button type="submit">جستجو</Button>
      </Form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            username={user.username}
            bio={user.bio ?? undefined}
            image={user.image ?? undefined}
            snippetsCount={user.snippets.length}
          />
        ))}
      </div>

      {users.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">هیچ کاربری یافت نشد</p>
        </div>
      )}

      <PaginationControl totalPages={metadata.totalPages} />
    </div>
  );
}
