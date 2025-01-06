import { UserProfileHeader } from "@/components/users/user-profile-header";
import { UserSnippets } from "@/components/users/user-snippets";
import { getUserById, getUserSnippets } from "@/db/queries";
import { verifySession } from "@/lib/session";

export type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function DashboardPage(props: Props) {
  const { page } = await props.searchParams;
  const { userId: id, isAuth } = await verifySession();

  const pageNumber = Number(page) || 1;

  const user = await getUserById(id);

  if (!user) {
    return <div>Server Error</div>;
  }

  const userSnippets = await getUserSnippets({
    userId: id,
    page: pageNumber,
    limit: 6,
  });

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
        isOwnProfile={true}
        totalPages={userSnippets.metadata.totalPages}
        userSnippets={userSnippets.data}
      />
    </div>
  );
}
