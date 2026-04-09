"use client";

import { useState, useEffect } from "react";

const OVERLAY_Z_INDEX = 1;
const CONTENT_Z_INDEX = 2;
const BACKGROUND_SECTION_COUNT = 4;

interface SectionPageProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionPage({ title, children }: SectionPageProps) {
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const zone = Math.min(
        Math.floor(fraction * BACKGROUND_SECTION_COUNT),
        BACKGROUND_SECTION_COUNT - 1
      );
      setOverlayOpacity(zone % 2 === 0 ? 0 : 1);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-28 pb-24">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-white dark:bg-black pointer-events-none transition-opacity duration-500"
        style={{ zIndex: OVERLAY_Z_INDEX, opacity: overlayOpacity }}
      />
      <div className="relative" style={{ zIndex: CONTENT_Z_INDEX }}>
        <h1 className="mb-8 text-6xl font-bold tracking-tight text-gray-900 dark:text-white text-center w-full">
          {title}
        </h1>
        <div className="mr-auto max-w-3xl px-2 text-xl">{children}</div>
      </div>
    </div>
  );
}
