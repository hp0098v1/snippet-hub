"use client";

import { cn, highlightCodeblocks } from "@/lib/utils";
import "highlight.js/styles/atom-one-dark.css";

type Props = {
  content: string;
  className?: string;
};

export function RichTextContent({ content, className }: Props) {
  return (
    <div
      className={cn(
        "prose max-w-full dark:prose-invert",
        "rtl:prose-headings:text-right rtl:prose-p:text-right",
        "rtl:prose-ol:pr-4 rtl:prose-ul:pr-4",
        "[&_pre]:!dir-ltr [&_pre]:!my-3 [&_pre]:rounded-lg [&_pre]:!text-left",
        "[&_code]:!dir-ltr [&_code]:!font-fira [&_code]:!text-sm",
        "prose-pre:!bg-transparent prose-pre:!p-0",
        className
      )}
      dangerouslySetInnerHTML={{
        __html: highlightCodeblocks(content),
      }}
    />
  );
}
