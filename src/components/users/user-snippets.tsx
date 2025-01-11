import Link from "next/link";

import { SnippetsList } from "@/components/snippets/snippets-list";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { SnippetWithAuthorAndLanguage } from "@/types";

type Props = {
  isOwnProfile?: boolean;
  isAuth?: boolean;
  totalPages: number;
  userSnippets: SnippetWithAuthorAndLanguage[];
};

export function UserSnippets({
  isOwnProfile = false,
  isAuth = false,
  totalPages,
  userSnippets,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">قطعه کدها</h2>
        {isOwnProfile && (
          <Button asChild>
            <Link href={config.routes.dashboard.snippets.create()}>
              ایجاد قطعه کد جدید
            </Link>
          </Button>
        )}
      </div>

      <SnippetsList
        isAuth={isAuth}
        noSnippetMessage={
          isOwnProfile
            ? "شما هنوز هیچ قطعه کدی ایجاد نکرده‌اید"
            : "این کاربر هنوز هیچ قطعه کدی ایجاد نکرده است"
        }
        snippets={userSnippets}
        totalPages={totalPages}
      />
    </div>
  );
}
