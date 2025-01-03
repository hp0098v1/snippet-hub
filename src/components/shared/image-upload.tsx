"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon } from "lucide-react";
import { toast } from "sonner";
import { put } from "@vercel/blob";

type Props = {
  defaultImage?: string;
  defaultFallback: string;
  onChange: (url: string) => void;
};

export function ImageUpload({
  defaultImage,
  defaultFallback,
  onChange,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultImage);
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("فقط فایل‌های تصویری مجاز هستند");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حداکثر حجم فایل ۵ مگابایت است");
      return;
    }

    try {
      setIsUploading(true);
      const response = await put(file.name, file, {
        access: "public",
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
      });

      setImageUrl(response.url);
      onChange(response.url);
      toast.success("تصویر با موفقیت آپلود شد");
    } catch (error) {
      toast.error("خطا در آپلود تصویر");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="relative">
      <Avatar className="h-32 w-32">
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="text-2xl">{defaultFallback}</AvatarFallback>
      </Avatar>

      <input
        ref={inputFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <Button
        size="icon"
        variant="secondary"
        className="absolute bottom-0 right-0"
        onClick={() => inputFileRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PencilIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
