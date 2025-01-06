import { Metadata } from "next";
import { notFound } from "next/navigation";

import { UserProfileHeader } from "@/components/users/user-profile-header";
import { UserSnippets } from "@/components/users/user-snippets";
import { getUserById, getUserSnippets } from "@/db/queries";
import { getSession } from "@/lib/session";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);

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
  const { id } = await params;
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;

  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const userSnippets = await getUserSnippets({
    userId: user.id,
    page: pageNumber,
    limit: 6,
  });

  const { isAuth, userId } = await getSession();
  const isOwnProfile = isAuth && userId === user.id;

  return (
    <div className="container space-y-8 py-8">
      {/* Profile header */}
      <UserProfileHeader
        userBio={user.bio}
        userImage={user.image}
        userName={user.name}
        userSnippetsCount={userSnippets.metadata.totalItems}
        userUsername={user.username}
      />

      {/* User's snippets */}
      <UserSnippets
        isAuth={isAuth}
        isOwnProfile={isOwnProfile}
        totalPages={userSnippets.metadata.totalPages}
        userSnippets={userSnippets.data}
      />
    </div>
  );
}
