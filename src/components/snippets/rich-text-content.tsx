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
        "rtl:prose-p:text-right rtl:prose-headings:text-right",
        "rtl:prose-ul:pr-4 rtl:prose-ol:pr-4",
        "[&_pre]:!dir-ltr [&_pre]:!text-left [&_pre]:rounded-lg [&_pre]:!my-3",
        "[&_code]:!dir-ltr [&_code]:!text-sm [&_code]:!font-fira",
        "prose-pre:!bg-transparent prose-pre:!p-0",
        className
      )}
      dangerouslySetInnerHTML={{
        __html: highlightCodeblocks(content),
      }}
    />
  );
}
