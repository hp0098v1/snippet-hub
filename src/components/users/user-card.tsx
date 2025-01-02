import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UserCardProps {
  id: string;
  name: string;
  username?: string;
  bio?: string;
  image?: string;
  snippetsCount: number;
  className?: string;
}

export function UserCard({
  id,
  name,
  username,
  bio,
  image,
  snippetsCount,
  className,
}: UserCardProps) {
  return (
    <Card
      className={cn("group transition-all hover:border-primary", className)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <CardTitle>
                <h3>
                  <Link
                    className="transition-colors hover:text-primary"
                    href={`/users/${id}`}
                  >
                    {name}
                  </Link>
                </h3>
              </CardTitle>
              <CardDescription>
                {username && <p>@{username}</p>}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/users/${id}`}>
              <ChevronLeft className="size-5 text-muted-foreground" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      {(bio || snippetsCount > 0) && (
        <CardContent className="space-y-2">
          {bio && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{bio}</p>
          )}
          {snippetsCount > 0 && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4 text-primary" />
              <span>{snippetsCount} قطعه کد</span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
