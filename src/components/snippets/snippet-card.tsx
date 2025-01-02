import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SnippetWithAuthorAndLanguage } from "@/db/queries";

type Props = {
  snippet: SnippetWithAuthorAndLanguage;
};

export function SnippetCard({ snippet }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={snippet.user.image ?? undefined} />
              <AvatarFallback>{snippet.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <Link
              href={`/users/${snippet.user.username}`}
              className="text-sm font-medium hover:underline"
            >
              {snippet.user.name}
            </Link>
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
    </Card>
  );
}
