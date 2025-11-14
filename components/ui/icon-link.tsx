import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  icon: IconComponent;
  label: string;
};

export function IconLink({
  href,
  icon: Icon,
  label,
  className,
  ...props
}: IconLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200",
        "hover:border-primary/60 hover:text-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        "dark:border-border/40 dark:hover:border-primary dark:hover:text-primary",
        className,
      )}
      {...props}
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
