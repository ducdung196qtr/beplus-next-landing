"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: false, toggle: () => {} });

export function useTheme() { return useContext(ThemeCtx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  if (!mounted) return <div className="min-h-screen bg-[var(--bg)]" />;

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      {/* Dark mode toggle */}
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-lg flex items-center justify-center text-lg hover:scale-110 transition-transform duration-200"
        aria-label="Toggle theme"
      >
        {dark ? "☀️" : "🌙"}
      </button>
      {children}
    </ThemeCtx.Provider>
  );
}
