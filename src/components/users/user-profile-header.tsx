import { Code2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  userImage: string | null;
  userName: string;
  userUsername: string;
  userBio: string | null;
  userSnippetsCount: number;
};

export function UserProfileHeader({
  userImage,
  userName,
  userUsername,
  userBio,
  userSnippetsCount,
}: Props) {
  return (
    <section className="flex flex-col gap-8 sm:flex-row sm:items-start">
      <Avatar className="h-32 w-32">
        <AvatarImage src={userImage ?? undefined} />
        <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{userName}</h1>
            <p className="text-muted-foreground">@{userUsername}</p>
          </div>
        </div>

        {userBio && <p className="text-muted-foreground">{userBio}</p>}

        <div className="flex items-center gap-2 text-sm">
          <Code2 className="h-4 w-4 text-primary" />
          {userSnippetsCount} قطعه کد
        </div>
      </div>
    </section>
  );
}
