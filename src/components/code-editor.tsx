"use client";

import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value?: string;
  language?: string;
  theme?: "vs-dark" | "light";
  height?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  onChange?: (value: string) => void;
}

export function CodeEditor({
  value = "",
  language = "javascript",
  theme = "vs-dark",
  height = "400px",
  options = {},
  onChange,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { theme: systemTheme } = useTheme();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editor.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: systemTheme === "dark" ? "vs-dark" : "vs",
        ...options,
      });

      editor.current.onDidChangeModelContent(() => {
        if (onChange) {
          onChange(editor.current?.getValue() || "");
        }
      });

      return () => {
        editor.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      editor.current.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    monaco.editor.setTheme(systemTheme === "dark" ? "vs-dark" : "vs");
  }, [systemTheme]);

  return (
    <div
      ref={editorRef}
      style={{
        height,
        minHeight: "200px",
        maxHeight: "800px",
      }}
    />
  );
}
