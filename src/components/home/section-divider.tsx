import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function SectionDivider({ className }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-20 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent",
        className
      )}
    />
  );
}
