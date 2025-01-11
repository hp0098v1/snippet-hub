"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { toggleSnippetLike } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
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
  const { execute, isPending } = useAction(toggleSnippetLike, {
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  function handleLike() {
    if (!isAuth) {
      toast.error("برای لایک کردن باید وارد شوید");
      return;
    }

    execute(snippetId);
  }

  return (
    <Badge
      className={cn(
        "cursor-pointer gap-1.5 transition-opacity",
        isPending && "cursor-default opacity-50",
        className
      )}
      variant="secondary"
      onClick={!isPending ? handleLike : undefined}
    >
      <Heart
        className={`size-4 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
      {likesCount.toLocaleString("fa")}
    </Badge>
  );
}
