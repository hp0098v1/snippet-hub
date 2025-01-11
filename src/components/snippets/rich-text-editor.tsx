"use client";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignRight,
  AlignLeft,
  AlignCenter,
  Underline as UnderlineIcon,
  Code as CodeIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Language } from "@/types";

import "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

// Create lowlight instance with languages
const lowlight = createLowlight(common);

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Language[];
};

const ToolbarButton = ({
  onClick,
  icon: Icon,
  isActive = false,
  title,
}: {
  onClick: () => void;
  icon: LucideIcon;
  isActive?: boolean;
  title?: string;
}) => {
  return (
    <Button
      className={cn("h-8 w-8", isActive && "bg-muted")}
      size="icon"
      title={title}
      type="button"
      variant="ghost"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export function RichTextEditor({ value, onChange, languages }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "typescript",
        HTMLAttributes: {
          class: "not-prose hljs p-4 rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "h-[350px] overflow-y-auto p-4 outline-none",
          "prose prose-sm max-w-none dark:prose-invert",
          "rtl:prose-headings:text-right rtl:prose-p:text-right",
          "rtl:prose-ol:pr-4 rtl:prose-ul:pr-4",
          "[&_pre]:!dir-ltr [&_pre]:!my-3 [&_pre]:rounded-lg [&_pre]:!text-left",
          "[&_code]:!dir-ltr [&_code]:!font-fira [&_code]:!text-xs",
          "prose-code:!p-0 prose-pre:!p-0"
        ),
        dir: "rtl",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="relative w-full rounded-lg border border-input">
      <div
        className="flex flex-wrap items-center gap-1 border-b border-input p-2"
        dir="rtl"
      >
        <ToolbarButton
          icon={Bold}
          isActive={editor.isActive("bold")}
          title="درشت"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={Italic}
          isActive={editor.isActive("italic")}
          title="مورب"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={UnderlineIcon}
          isActive={editor.isActive("underline")}
          title="زیر خط"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <div className="mx-2 h-6 w-px bg-border" />
        <ToolbarButton
          icon={List}
          isActive={editor.isActive("bulletList")}
          title="لیست نامرتب"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={ListOrdered}
          isActive={editor.isActive("orderedList")}
          title="لیست مرتب"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <div className="mx-2 h-6 w-px bg-border" />
        <ToolbarButton
          icon={AlignRight}
          isActive={editor.isActive({ textAlign: "right" })}
          title="راست چین"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
        <ToolbarButton
          icon={AlignCenter}
          isActive={editor.isActive({ textAlign: "center" })}
          title="وسط چین"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <ToolbarButton
          icon={AlignLeft}
          isActive={editor.isActive({ textAlign: "left" })}
          title="چپ چین"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <div className="mx-2 h-6 w-px bg-border" />
        <ToolbarButton
          icon={CodeIcon}
          isActive={editor.isActive("codeBlock")}
          title="بلوک کد"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
        {editor.isActive("codeBlock") && (
          <Select
            value={editor.getAttributes("codeBlock").language || "typescript"}
            onValueChange={(value) => {
              editor.chain().focus().setCodeBlock({ language: value }).run();
            }}
          >
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.slug}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <EditorContent
        className="[&_.ProseMirror]:outline-none"
        dir="rtl"
        editor={editor}
      />
    </div>
  );
}
