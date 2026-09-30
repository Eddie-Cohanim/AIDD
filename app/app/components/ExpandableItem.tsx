"use client";

import { useCallback, useId, useState } from "react";
import { FOCUS_RING } from "@/lib/styles";

interface ExpandableItemProps {
  heading: React.ReactNode;
  children: React.ReactNode;
}

export default function ExpandableItem({ heading, children }: ExpandableItemProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggle = useCallback(() => setOpen((isOpen) => !isOpen), []);

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-4 rounded py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors hover:text-accent ${FOCUS_RING}`}
      >
        <span>{heading}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div id={panelId} hidden={!open} className="pb-3 text-sm">
        {children}
      </div>
    </div>
  );
}
