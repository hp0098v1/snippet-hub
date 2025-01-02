"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface ImageUploadProps {
  defaultImage?: string;
  defaultFallback?: string;
  className?: string;
  onChange?: (file: File) => void;
}

export function ImageUpload({
  defaultImage,
  defaultFallback,
  className = "h-24 w-24",
  onChange,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onChange?.(file);

      // Cleanup the URL when component unmounts
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div className="relative inline-block">
      <Avatar className={className}>
        <AvatarImage src={preview} />
        <AvatarFallback>{defaultFallback}</AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        size="icon"
        variant="outline"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
        onClick={handleImageClick}
      >
        <ImageIcon className="h-4 w-4" />
        <span className="sr-only">تغییر تصویر</span>
      </Button>
    </div>
  );
}
