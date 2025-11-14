import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors",
        "hover:border-primary/50 hover:text-primary",
        "dark:border-border/40 dark:hover:border-primary dark:hover:text-primary",
        className,
      )}
      {...props}
    />
  );
}
