"use client";

import { useCallback, useState } from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import NavBar from "./NavBar";
import ChatWidget from "./ChatWidget";

const DARK_MODE_STORAGE_KEY = "darkMode";
const DARK_CLASS = "dark";

function readInitialDarkMode(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains(DARK_CLASS);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(readInitialDarkMode);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains(DARK_CLASS);
    document.documentElement.classList.toggle(DARK_CLASS, next);
    setDarkMode(next);
    try {
      localStorage.setItem(DARK_MODE_STORAGE_KEY, String(next));
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }, []);

  return (
    <div className="min-h-screen">
      <BackgroundCanvas darkMode={darkMode} />
      <NavBar onToggleTheme={toggleTheme} />
      {children}
      <ChatWidget />
    </div>
  );
}
