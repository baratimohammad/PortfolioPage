"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
      className="h-10 w-10 rounded-full border-border/70 bg-background p-0 text-foreground hover:border-primary/60 hover:text-primary dark:border-border/40 dark:bg-background/80"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden />
      ) : (
        <Moon className="h-4 w-4" aria-hidden />
      )}
    </Button>
  );
}
