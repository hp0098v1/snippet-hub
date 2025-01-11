import { PaginationControl } from "@/components/shared/pagination-control";
import { UserCard } from "@/components/users/user-card";
import { cn } from "@/lib/utils";
import { UserWithSnippets } from "@/types";

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
            bio={user.bio ?? undefined}
            id={user.id}
            image={user.image ?? undefined}
            key={user.id}
            name={user.name}
            snippetsCount={user.snippets.length}
            username={user.username}
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
