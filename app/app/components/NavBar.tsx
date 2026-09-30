"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_ID, SECTIONS, sectionHref, type SectionId } from "@/lib/sections";
import { FOCUS_RING } from "@/lib/styles";

const ACTIVE_LINE_VIEWPORT_FRACTION = 0.4;
const PAGE_BOTTOM_TOLERANCE_PX = 4;
const MOBILE_MENU_ID = "mobile-nav";

interface NavBarProps {
  onToggleTheme: () => void;
}

interface IndicatorBox {
  left: number;
  width: number;
}

const HIDDEN_INDICATOR: IndicatorBox = { left: 0, width: 0 };

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

// Tracks the active link's position so a single pill can glide between links.
function useActiveIndicator(activeId: SectionId | null) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<IndicatorBox>(HIDDEN_INDICATOR);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const link = track?.querySelector<HTMLAnchorElement>("a[aria-current]");
      // Keep the last position when no link is active so the pill fades out in place.
      if (!track || !link) return;
      const linkRect = link.getBoundingClientRect();
      const next = {
        left: linkRect.left - track.getBoundingClientRect().left,
        width: linkRect.width,
      };
      setBox((prev) => (prev.left === next.left && prev.width === next.width ? prev : next));
    }

    measure();
    // Re-measure when fonts load, the window resizes, or the desktop links are revealed.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeId]);

  return { trackRef, box, visible: activeId !== null };
}

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      className={`rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-accent hover:text-accent ${FOCUS_RING}`}
    >
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </button>
  );
}

export default function NavBar({ onToggleTheme }: NavBarProps) {
  const activeId = useActiveSection();
  const { trackRef, box, visible } = useActiveIndicator(activeId);
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
        ? "text-pill-ink font-medium"
        : "text-ink-muted hover:text-ink";
    return `rounded-lg transition-colors ${state} ${FOCUS_RING}`;
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-nav backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href={`/#${HERO_ID}`}
          className={`rounded-lg font-bold font-stretch-expanded tracking-tight text-ink ${FOCUS_RING}`}
        >
          EC
        </a>
        <div className="hidden items-center gap-4 text-sm lg:flex">
          <div ref={trackRef} className="relative flex items-center">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 rounded-full border border-pill-edge bg-pill-wash transition-[transform,width,opacity] duration-300 ease-out motion-reduce:transition-none ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ width: box.width, transform: `translateX(${box.left}px)` }}
            />
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={sectionHref(section.id)}
                aria-current={section.id === activeId ? "location" : undefined}
                className={`relative px-2.5 py-1.5 ${linkClass(section.id)}`}
              >
                {section.label}
              </a>
            ))}
          </div>
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
            className={`rounded-lg p-1 text-ink-muted hover:text-accent ${FOCUS_RING}`}
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
        className="border-t border-line bg-nav-panel lg:hidden"
      >
        <ul className="mx-auto flex max-w-5xl flex-col px-6 py-3 text-base">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={sectionHref(section.id)}
                aria-current={section.id === activeId ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 ${linkClass(section.id)} ${
                  section.id === activeId ? "bg-pill-wash" : ""
                }`}
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
