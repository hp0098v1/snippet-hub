"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

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

type Props = {
  id: string;
};

export function SnippetDeleteForm({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const state = await deleteSnippet(id);
      setError(state.errors?.message || null);

      if (!state.errors) {
        setIsOpen(false);
      }
    });
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
          {error && (
            <AlertDialogDescription className="text-base text-destructive">
              {error}
            </AlertDialogDescription>
          )}
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
