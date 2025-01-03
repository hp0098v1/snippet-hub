import { UserProfileHeader } from "@/components/users/user-profile-header";
import { UserSnippets } from "@/components/users/user-snippets";
import { getUserById } from "@/db/queries";
import { getUserSnippets } from "@/db/queries";
import { verifySession } from "@/lib/session";

export type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function DashboardPage(props: Props) {
  const { page } = await props.searchParams;
  const { userId: id } = await verifySession();
  
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
    <div className="container py-8 space-y-8">
      {/* Profile header */}
      <UserProfileHeader
        isOwnProfile={true}
        userImage={user.image}
        userName={user.name}
        userUsername={user.username}
        userBio={user.bio}
        userSnippetsCount={userSnippets.metadata.totalItems}
      />

      {/* User's snippets */}
      <UserSnippets
        isOwnProfile={true}
        totalPages={userSnippets.metadata.totalPages}
        userSnippets={userSnippets.data}
      />
    </div>
  );
}
