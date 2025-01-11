"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteSnippet } from "@/db/actions";
import { useAction } from "@/hooks/use-action";
import { config } from "@/lib/config";

type Props = {
  id: string;
};

export function SnippetDeleteForm({ id }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { execute, isPending } = useAction(deleteSnippet, {
    onSuccess: () => {
      toast.success("قطعه کد با موفقیت حذف شد");
      router.push(config.routes.public.snippets());
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleDelete = () => {
    execute(id);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-destructive hover:text-destructive"
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">حذف</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            آیا از حذف این قطعه کد اطمینان دارید؟
          </AlertDialogTitle>
          <AlertDialogDescription>
            این عملیات غیرقابل برگشت است. این قطعه کد برای همیشه حذف خواهد شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            انصراف
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "در حال حذف..." : "حذف"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
