"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

type ThemeAction =
  | { type: "set"; value: Theme }
  | { type: "toggle" };

function themeReducer(_: Theme, action: ThemeAction): Theme {
  if (action.type === "set") {
    return action.value;
  }
  return _ === "dark" ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, dispatch] = useReducer(themeReducer, "light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? (storedTheme as Theme)
        : prefersDark.matches
          ? "dark"
          : "light";

    dispatch({ type: "set", value: initialTheme });
    applyTheme(initialTheme);
    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved !== "light" && saved !== "dark") {
        const nextTheme = event.matches ? "dark" : "light";
        dispatch({ type: "set", value: nextTheme });
        applyTheme(nextTheme);
      }
    };

    prefersDark.addEventListener("change", handlePreferenceChange);
    return () => prefersDark.removeEventListener("change", handlePreferenceChange);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((value: Theme) => {
    dispatch({ type: "set", value });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: "toggle" });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
