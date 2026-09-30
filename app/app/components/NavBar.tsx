"use client";

import { useEffect, useState } from "react";
import { HERO_ID, SECTIONS, sectionHref, type SectionId } from "@/lib/sections";
import { FOCUS_RING } from "@/lib/styles";

const ACTIVE_LINE_VIEWPORT_FRACTION = 0.4;
const PAGE_BOTTOM_TOLERANCE_PX = 4;
const MOBILE_MENU_ID = "mobile-nav";

interface NavBarProps {
  onToggleTheme: () => void;
}

function useActiveSection(): SectionId | null {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  useEffect(() => {
    const tracked = SECTIONS.map((section) => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));
    const lastId = SECTIONS[SECTIONS.length - 1].id;
    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - PAGE_BOTTOM_TOLERANCE_PX;
      if (atBottom) {
        setActiveId(lastId);
        return;
      }
      const activeLine = window.innerHeight * ACTIVE_LINE_VIEWPORT_FRACTION;
      let current: SectionId | null = null;
      for (const { id, element } of tracked) {
        if (element && element.getBoundingClientRect().top <= activeLine) current = id;
      }
      setActiveId(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return activeId;
}

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className={`rounded-full border border-gray-300 dark:border-gray-700 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`}
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  );
}

export default function NavBar({ onToggleTheme }: NavBarProps) {
  const activeId = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function linkClass(id: SectionId): string {
    const state =
      id === activeId
        ? "text-accent font-medium"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white";
    return `rounded transition-colors ${state} ${FOCUS_RING}`;
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href={`/#${HERO_ID}`}
          className={`rounded font-semibold tracking-tight text-gray-900 dark:text-white ${FOCUS_RING}`}
        >
          EC
        </a>
        <div className="hidden items-center gap-5 text-sm lg:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={sectionHref(section.id)}
              aria-current={section.id === activeId ? "location" : undefined}
              className={linkClass(section.id)}
            >
              {section.label}
            </a>
          ))}
          <ThemeToggle onToggle={onToggleTheme} />
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle onToggle={onToggleTheme} />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
            className={`rounded p-1 text-gray-700 dark:text-gray-300 hover:text-accent ${FOCUS_RING}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        id={MOBILE_MENU_ID}
        hidden={!menuOpen}
        className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black lg:hidden"
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-6 py-3 text-base">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={sectionHref(section.id)}
                aria-current={section.id === activeId ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2 ${linkClass(section.id)}`}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
