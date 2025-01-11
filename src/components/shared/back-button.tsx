"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button, ButtonProps } from "@/components/ui/button";

type Props = {
  href?: string;
  label?: string;
} & ButtonProps;

export function BackButton({ href, label, ...props }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button onClick={handleClick} {...props}>
      <ArrowLeft className="ml-2 h-5 w-5" />
      {label ?? "بازگشت"}
    </Button>
  );
}
