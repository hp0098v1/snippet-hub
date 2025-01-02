import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMockUsers } from "@/lib/mock/users";
import { getMockSnippets } from "@/lib/mock/snippets";
import { getMockCurrentUser } from "@/lib/mock/auth";
import { Button } from "@/components/ui/button";
import { PaginationControl } from "@/components/shared/pagination-control";
import { SnippetCard } from "@/components/snippets/snippet-card";
import { Pencil } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{
    username: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const { data: users } = await getMockUsers({});
  const user = users.find((u) => u.username === username);

  if (!user) {
    return {
      title: "کاربر یافت نشد | SnippetHub",
    };
  }

  return {
    title: `${user.name} (${user.username}) | SnippetHub`,
    description: user.bio,
  };
}

export default async function UserProfilePage({ params, searchParams }: Props) {
  const { username } = await params;
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

  const { data: users } = await getMockUsers({});
  const user = users.find((u) => u.username === username);
  const currentUser = await getMockCurrentUser();

  if (!user) {
    notFound();
  }

  const { data: snippets, metadata } = await getMockSnippets({
    page: pageNumber,
    limit: 6,
  });

  const userSnippets = snippets.filter((s) => s.author.username === username);
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="container py-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Avatar className="h-32 w-32">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>

            {isOwnProfile && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings/profile">
                  <Pencil className="ml-2 h-4 w-4" />
                  ویرایش پروفایل
                </Link>
              </Button>
            )}
          </div>

          {user.bio && <p className="text-muted-foreground">{user.bio}</p>}

          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-medium">{user.snippetsCount}</span>{" "}
              <span className="text-muted-foreground">قطعه کد</span>
            </div>
          </div>
        </div>
      </div>

      {/* User's snippets */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">قطعه کدها</h2>
          {isOwnProfile && (
            <Button asChild>
              <Link href="/snippets/new">ایجاد قطعه کد جدید</Link>
            </Button>
          )}
        </div>

        {userSnippets.length > 0 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userSnippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
              ))}
            </div>
            <PaginationControl totalPages={metadata.totalPages} />
          </>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              {isOwnProfile
                ? "شما هنوز هیچ قطعه کدی ایجاد نکرده‌اید"
                : "این کاربر هنوز هیچ قطعه کدی ایجاد نکرده است"}
            </p>
            {isOwnProfile && (
              <Button className="mt-4" asChild>
                <Link href="/snippets/new">ایجاد اولین قطعه کد</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}