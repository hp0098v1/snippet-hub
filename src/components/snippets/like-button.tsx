"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { toggleSnippetLike } from "@/db/actions";
import { cn } from "@/lib/utils";

type Props = {
  snippetId: string;
  isLiked: boolean;
  likesCount: number;
  isAuth: boolean;
  className?: string;
};

export function LikeButton({
  snippetId,
  isLiked,
  likesCount,
  isAuth,
  className,
}: Props) {
  const [isPending, startTransition] = useTransition();

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
        isPending && "opacity-50 cursor-default",
        className
      )}
      onClick={!isPending ? handleLike : undefined}
    >
      <Heart
        className={`size-4 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
      {likesCount.toLocaleString("fa")}
    </Badge>
  );
}
