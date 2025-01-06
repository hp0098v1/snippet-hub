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
    <div className="h-full flex flex-col items-center justify-center p-4 mt-8">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-red-600">
          اوه! مشکلی پیش آمده است
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          از این اتفاق متأسفیم. یک خطای غیرمنتظره رخ داده است
        </p>
        <div className="flex justify-center items-center gap-4">
          <Button onClick={() => reset()} variant="default">
            تلاش مجدد
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  );
}
