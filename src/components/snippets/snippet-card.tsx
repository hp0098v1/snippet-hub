import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SnippetWithAuthorAndLanguage } from "@/db/types";
import { formatDistanceToNow } from "date-fns-jalali";
import { Eye } from "lucide-react";
import { LikeButton } from "./like-button";

type Props = {
  snippet: SnippetWithAuthorAndLanguage;
};

export function SnippetCard({ snippet }: Props) {
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
                href={`/users/${snippet.user.id}`}
                className="text-sm font-medium hover:underline"
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
          <Badge variant="secondary" className="capitalize">
            {snippet.language.name}
          </Badge>
        </div>
        <Link href={`/snippets/${snippet.id}`}>
          <h3 className="line-clamp-1 text-lg font-semibold hover:underline">
            {snippet.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {snippet.description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <Eye className="h-4 w-4" />
            {snippet.views.toLocaleString("fa")}
          </Badge>
          <LikeButton
            snippetId={snippet.id}
            isLiked={snippet.isLiked ?? false}
            likesCount={snippet._count?.likes ?? 0}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
