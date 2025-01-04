"use client";

import Editor from "@uiw/react-codemirror";
import {  vscodeDark} from "@uiw/codemirror-theme-vscode";
import { langNames, langs } from "@uiw/codemirror-extensions-langs";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  className?: string;
};

export function CodeEditor({ value, onChange, language, className }: Props) {
  const lang = langNames.find((l) => l === language);

  return (
    <Editor
      dir="ltr"
      className={cn("h-72 font-mono resize-none", className)}
      height="100%"
      theme={vscodeDark}
      extensions={[lang ? langs[lang]() : langs.typescript()]}
      basicSetup={{ lineNumbers: true, foldGutter: true }}
      value={value}
      onChange={onChange}
    />
  );
}
