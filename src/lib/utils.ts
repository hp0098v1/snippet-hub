import { clsx, type ClassValue } from "clsx";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/common";
import { twMerge } from "tailwind-merge";

import "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const highlightCodeblocks = (content: string) => {
  if (typeof window === "undefined") {
    return content; // Return unprocessed content on the server side
  }

  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll("pre code").forEach((el) => {
    // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
    el.setAttribute("dir", "ltr");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hljs.highlightElement(el as any);
  });
  return DOMPurify.sanitize(doc.body.innerHTML);
};
