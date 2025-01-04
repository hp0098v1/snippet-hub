import { PaginationControl } from "@/components/shared/pagination-control";
import { UserCard } from "@/components/users/user-card";
import { UserWithSnippets } from "@/db/types";
import { cn } from "@/lib/utils";

type Props = {
  users: UserWithSnippets[];
  totalPages: number;
  className?: string;
};

export function UsersList({ users, totalPages, className }: Props) {
  return (
    <>
      <div
        className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      >
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

      <PaginationControl totalPages={totalPages} />
    </>
  );
}
