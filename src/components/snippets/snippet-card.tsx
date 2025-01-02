import { Snippet } from "@/lib/mock/snippets";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  snippet: Snippet;
};

export function SnippetCard({ snippet }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={snippet.author.image} />
              <AvatarFallback>{snippet.author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <Link
              href={`/users/${snippet.author.username}`}
              className="text-sm font-medium hover:underline"
            >
              {snippet.author.name}
            </Link>
          </div>
          <Badge variant="secondary" className="capitalize">
            {snippet.language}
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
