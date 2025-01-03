"use client";

import { Badge } from "@/components/ui/badge";
import { useSession } from "@/components/providers/session-provider";
import { toggleSnippetLike } from "@/db/actions";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  snippetId: string;
  isLiked: boolean;
  likesCount: number;
  className?: string;
};

export function LikeButton({
  snippetId,
  isLiked,
  likesCount,
  className,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { isAuth } = useSession();

  function handleLike() {
    if (!isAuth) {
      toast.error("برای لایک کردن باید وارد شوید");
      return;
    }

    startTransition(async () => {
      const result = await toggleSnippetLike(snippetId);

      if (result.errors) {
        toast.error(result.errors.message);
      }
    });
  }

  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1.5 cursor-pointer transition-opacity",
        isPending && "opacity-50",
        className
      )}
      onClick={!isPending ? handleLike : undefined}
    >
      <Heart
        className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
      {likesCount.toLocaleString("fa")}
    </Badge>
  );
}
