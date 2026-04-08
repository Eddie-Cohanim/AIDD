"use client";

import { useState, useEffect } from "react";

const BACKGROUND_CYCLE_MS = 5000;
const OVERLAY_Z_INDEX = 1;
const CONTENT_Z_INDEX = 2;

interface SectionPageProps {
  title: string;
  children: React.ReactNode;
}

export default function SectionPage({ title, children }: SectionPageProps) {
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowPhoto((prev) => !prev);
    }, BACKGROUND_CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-24">
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-white dark:bg-black pointer-events-none transition-opacity duration-1000"
        style={{ zIndex: OVERLAY_Z_INDEX, opacity: showPhoto ? 1 : 0 }}
      />
      <div className="relative" style={{ zIndex: CONTENT_Z_INDEX }}>
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        {children}
      </div>
    </div>
  );
}
