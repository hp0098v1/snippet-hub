import { ChevronLeft, Code2 } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";

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
              <AvatarImage alt={name} src={image} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <CardTitle>
                <h3>
                  <Link
                    className="transition-colors hover:text-primary"
                    href={config.routes.public.usersProfile(id)}
                  >
                    {name}
                  </Link>
                </h3>
              </CardTitle>
              <CardDescription>
                {username && <p dir="ltr">@{username}</p>}
              </CardDescription>
            </div>
          </div>
          <Button asChild size="icon" variant="ghost">
            <Link href={config.routes.public.usersProfile(id)}>
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
