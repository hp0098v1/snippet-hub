"use client";

import { Bookmark } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { toggleSaveSnippet } from "@/db/actions";
import { cn } from "@/lib/utils";

type Props = {
  snippetId: string;
  isSaved: boolean;
  isAuth: boolean;
  className?: string;
};

export function SaveButton({
  snippetId,
  isSaved,
  isAuth = false,
  className,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    if (!isAuth) {
      toast.error("برای ذخیره کردن باید وارد شوید");
      return;
    }

    startTransition(async () => {
      const result = await toggleSaveSnippet(snippetId);

      if (result.errors) {
        toast.error(result.errors.message);
      }
    });
  }

  return (
    <Badge
      className={cn(
        "cursor-pointer gap-1.5 transition-opacity",
        isPending && "cursor-default opacity-50",
        className
      )}
      variant="secondary"
      onClick={!isPending ? handleSave : undefined}
    >
      <Bookmark
        className={cn("size-4", isSaved ? "fill-current text-yellow-500" : "")}
      />
      <span className="sr-only">Save</span>
    </Badge>
  );
}
