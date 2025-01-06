"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-8 flex h-full flex-col items-center justify-center p-4">
      <div className="max-w-md space-y-6 text-center">
        <h1 className="text-4xl font-bold text-red-600">
          اوه! مشکلی پیش آمده است
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          از این اتفاق متأسفیم. یک خطای غیرمنتظره رخ داده است
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="default" onClick={() => reset()}>
            تلاش مجدد
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
          >
            صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  );
}
