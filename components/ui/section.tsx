import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HTMLElementTagName = keyof HTMLElementTagNameMap;

export type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: HTMLElementTagName;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", className, ...props }, ref) => {
    const Element = Component as unknown as ElementType;
    return (
      <Element
        ref={ref as never}
        className={cn(
          "space-y-8 border border-border/60",
          "rounded-3xl bg-background/80 p-8 shadow-subtle backdrop-blur",
          "transition-colors duration-200",
          "sm:space-y-10 sm:p-10",
          className,
        )}
        {...props}
      />
    );
  },
);

Section.displayName = "Section";
