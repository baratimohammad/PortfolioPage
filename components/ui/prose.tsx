import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ProseProps = HTMLAttributes<HTMLDivElement>;

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "prose",
        className,
      )}
      {...props}
    />
  );
}
