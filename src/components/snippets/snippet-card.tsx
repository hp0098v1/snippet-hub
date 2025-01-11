import { formatDistanceToNow } from "date-fns-jalali";
import { Eye } from "lucide-react";
import Link from "next/link";

import { RichTextContent } from "@/components/snippets/rich-text-content";
import { SaveButton } from "@/components/snippets/save-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SnippetWithAuthorAndLanguage } from "@/db/types";
import { config } from "@/lib/config";

import { LikeButton } from "./like-button";

type Props = {
  isAuth: boolean;
  snippet: SnippetWithAuthorAndLanguage;
};

export function SnippetCard({ isAuth, snippet }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={snippet.user.image ?? undefined} />
              <AvatarFallback>{snippet.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Link
                className="text-sm font-medium hover:underline"
                href={config.routes.public.usersProfile(snippet.user.id)}
              >
                {snippet.user.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(snippet.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Badge className="capitalize" variant="secondary">
            {snippet.language.name}
          </Badge>
        </div>
        <Link href={config.routes.public.snippetsDetail(snippet.id)}>
          <h3 className="line-clamp-1 text-lg font-semibold hover:underline">
            {snippet.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <RichTextContent
          className="line-clamp-2 text-sm text-muted-foreground"
          content={snippet.content?.slice(0, 100) || ""}
        />
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Badge className="gap-1.5" variant="secondary">
            <Eye className="h-4 w-4" />
            {snippet.views.toLocaleString("fa")}
          </Badge>
          <LikeButton
            isAuth={isAuth}
            isLiked={snippet.isLiked ?? false}
            likesCount={snippet._count?.likes ?? 0}
            snippetId={snippet.id}
          />
          {isAuth && (
            <SaveButton
              isAuth={isAuth}
              isSaved={snippet.isSaved ?? false}
              snippetId={snippet.id}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
