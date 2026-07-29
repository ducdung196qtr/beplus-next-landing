"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} });
export function useTheme() { return useContext(ThemeCtx); }

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === null ? true : stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    if (stored === null) localStorage.setItem("theme", "dark");
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  if (!mounted) return <div className="min-h-screen" style={{ background: "#0F1117" }} />;

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border shadow-lg flex items-center justify-center text-lg hover:scale-110"
        style={{ background: "var(--card)", borderColor: "var(--border)", transition: "transform .2s" }}
        aria-label="Toggle theme"
      >
        {dark ? "☀️" : "🌙"}
      </button>
      {children}
    </ThemeCtx.Provider>
  );
}
