"use client";

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import DetailPointExtra, { hasExtraContent } from "./DetailPointExtra";
import type { DetailPoint } from "@/lib/profile";
import { BODY_TEXT, FOCUS_RING } from "@/lib/styles";

const INLINE_TOGGLE = `rounded-lg font-medium text-accent underline-offset-4 hover:underline ${FOCUS_RING}`;

interface DetailPointItemProps {
  point: DetailPoint;
}

export default function DetailPointItem({ point }: DetailPointItemProps) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const summaryId = useId();
  const moreId = useId();
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const hasMore = hasExtraContent(point);

  function toggleOpen() {
    const next = !open;
    setOpen(next);
    if (!next) setShowMore(false);
  }

  function showLess() {
    flushSync(() => setShowMore(false));
    moreButtonRef.current?.focus();
  }

  return (
    <li>
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={summaryId}
          onClick={toggleOpen}
          className={`flex w-full items-center justify-between gap-4 rounded-lg py-3 text-left text-lg font-semibold text-ink transition-colors hover:text-accent ${FOCUS_RING}`}
        >
          <span>{point.heading}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h4>
      <div id={summaryId} hidden={!open} className="pb-4">
        <p className={BODY_TEXT}>
          {point.detail}
          {hasMore && !showMore && (
            <>
              {" "}
              <button
                ref={moreButtonRef}
                type="button"
                aria-expanded={false}
                aria-controls={moreId}
                onClick={() => setShowMore(true)}
                className={INLINE_TOGGLE}
              >
                more<span className="sr-only"> about {point.heading}</span>
              </button>
            </>
          )}
        </p>
        {hasMore && (
          <div id={moreId} hidden={!showMore}>
            <DetailPointExtra point={point} />
            <button
              type="button"
              aria-expanded={true}
              aria-controls={moreId}
              onClick={showLess}
              className={`mt-3 ${INLINE_TOGGLE}`}
            >
              less<span className="sr-only"> about {point.heading}</span>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
