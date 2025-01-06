import { useState } from "react";
import { toast } from "sonner";

interface FileUploadOptions {
  maxSize?: number;
  accept?: string;
  onSelect?: (file: File | null) => void;
  defaultPreview?: string;
}

export function useFileUpload({
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = "image/*",
  onSelect,
  defaultPreview,
}: FileUploadOptions = {}) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    defaultPreview
  );

  function handleFileSelect(file: File | null) {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith(accept.split("/")[0])) {
      toast.error("فرمت فایل نامعتبر است");
      return;
    }

    // Check file size
    if (file.size > maxSize) {
      toast.error(
        `حداکثر حجم فایل ${Math.floor(maxSize / 1024 / 1024)} مگابایت است`
      );
      return;
    }

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onSelect?.(file);

    return () => URL.revokeObjectURL(objectUrl);
  }

  return {
    previewUrl,
    handleFileSelect,
  };
}
