"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { common, createLowlight } from "lowlight";

import { cn } from "@/lib/utils";
import { Language } from "@/db/types";

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
      type="button"
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", isActive && "bg-muted")}
      onClick={onClick}
      title={title}
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
          "rtl:prose-p:text-right rtl:prose-headings:text-right",
          "rtl:prose-ul:pr-4 rtl:prose-ol:pr-4",
          "[&_pre]:!dir-ltr [&_pre]:!text-left [&_pre]:rounded-lg [&_pre]:!my-3",
          "[&_code]:!dir-ltr [&_code]:!text-xs [&_code]:!font-fira",
          "prose-pre:!p-0 prose-code:!p-0"
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
        className="border-b border-input p-2 flex gap-1 flex-wrap items-center"
        dir="rtl"
      >
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          isActive={editor.isActive("bold")}
          title="درشت"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          isActive={editor.isActive("italic")}
          title="مورب"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          isActive={editor.isActive("underline")}
          title="زیر خط"
        />
        <div className="w-px h-6 bg-border mx-2" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          isActive={editor.isActive("bulletList")}
          title="لیست نامرتب"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          isActive={editor.isActive("orderedList")}
          title="لیست مرتب"
        />
        <div className="w-px h-6 bg-border mx-2" />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          icon={AlignRight}
          isActive={editor.isActive({ textAlign: "right" })}
          title="راست چین"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          icon={AlignCenter}
          isActive={editor.isActive({ textAlign: "center" })}
          title="وسط چین"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          icon={AlignLeft}
          isActive={editor.isActive({ textAlign: "left" })}
          title="چپ چین"
        />
        <div className="w-px h-6 bg-border mx-2" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          icon={CodeIcon}
          isActive={editor.isActive("codeBlock")}
          title="بلوک کد"
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
        editor={editor}
        dir="rtl"
        className="[&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
