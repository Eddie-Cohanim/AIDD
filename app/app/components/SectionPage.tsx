"use client";

import { useEffect } from "react";

const CONTENT_Z_INDEX = 2;
const BACKGROUND_SECTION_COUNT = 4;

interface SectionPageProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionPage({ title, children }: SectionPageProps) {
  useEffect(() => {
    function handleScroll() {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const zone = Math.min(
        Math.floor(fraction * BACKGROUND_SECTION_COUNT),
        BACKGROUND_SECTION_COUNT - 1
      );
      document.documentElement.style.setProperty(
        "--canvas-slab-opacity",
        zone % 2 === 0 ? "1" : "0"
      );
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-28 pb-24">
      <div className="relative" style={{ zIndex: CONTENT_Z_INDEX }}>
        <h1 className="mb-8 text-6xl font-bold tracking-tight text-gray-900 dark:text-white text-center w-full">
          {title}
        </h1>
        <div className="w-full px-6 text-xl">{children}</div>
      </div>
    </div>
  );
}
