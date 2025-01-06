"use client";

import Image from "next/image";
import { useRef } from "react";
import { PencilIcon, ImageIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  defaultImage?: string;
  defaultFallback?: string;
  onChange: (file: File | null) => void;
  variant?: "avatar" | "rectangle";
  className?: string;
  size?: "sm" | "md" | "lg";
  maxSize?: number;
};

const sizeClasses = {
  sm: "h-20 w-20",
  md: "h-32 w-32",
  lg: "h-40 w-40",
};

export function ImageUpload({
  defaultImage,
  defaultFallback,
  onChange,
  variant = "rectangle",
  className,
  size = "md",
  maxSize,
}: ImageUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleFileSelect } = useFileUpload({
    defaultPreview: defaultImage,
    onSelect: onChange,
    maxSize,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    handleFileSelect(file || null);
  }

  if (variant === "avatar") {
    return (
      <div className="relative">
        <Avatar className={cn(sizeClasses[size], className)}>
          <AvatarImage src={previewUrl} />
          <AvatarFallback className="text-2xl">
            {defaultFallback || <ImageIcon className="h-6 w-6" />}
          </AvatarFallback>
        </Avatar>

        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0"
          onClick={() => inputFileRef.current?.click()}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg border-2 border-dashed",
          !previewUrl && "hover:border-primary/50",
          sizeClasses[size],
          className
        )}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            className="h-full w-full rounded-lg object-cover"
            fill
          />
        ) : (
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        )}

        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-2 right-2"
          onClick={() => inputFileRef.current?.click()}
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
