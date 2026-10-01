"use client";

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import PhotoGallery from "./PhotoGallery";
import type { DetailPoint } from "@/lib/profile";
import { BODY_TEXT, FOCUS_RING } from "@/lib/styles";

const INLINE_TOGGLE = `rounded-lg font-medium text-accent underline-offset-4 hover:underline ${FOCUS_RING}`;

interface DetailPointExtraProps {
  point: DetailPoint;
}

interface ExpandableDetailProps {
  point: DetailPoint;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  className: string;
}

export function hasExtraContent(point: DetailPoint): boolean {
  return Boolean(point.bullets?.length || point.subpoints?.length || point.photos?.length);
}

// A point's detail text with an inline "more" toggle that reveals its nested content.
export function ExpandableDetail({ point, expanded, onExpandedChange, className }: ExpandableDetailProps) {
  const moreId = useId();
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const hasMore = hasExtraContent(point);

  function collapse() {
    // Render the "more" button synchronously so focus can return to it.
    flushSync(() => onExpandedChange(false));
    moreButtonRef.current?.focus();
  }

  return (
    <>
      <p className={className}>
        {point.detail}
        {hasMore && !expanded && (
          <>
            {" "}
            <button
              ref={moreButtonRef}
              type="button"
              aria-expanded={false}
              aria-controls={moreId}
              onClick={() => onExpandedChange(true)}
              className={INLINE_TOGGLE}
            >
              more<span className="sr-only"> about {point.heading}</span>
            </button>
          </>
        )}
      </p>
      {hasMore && (
        <div id={moreId} hidden={!expanded}>
          <DetailPointExtra point={point} />
          <button
            type="button"
            aria-expanded={true}
            aria-controls={moreId}
            onClick={collapse}
            className={`mt-3 ${INLINE_TOGGLE}`}
          >
            less<span className="sr-only"> about {point.heading}</span>
          </button>
        </div>
      )}
    </>
  );
}

function Subpoint({ point }: DetailPointExtraProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl bg-sunken p-4">
      <h5 className="font-semibold text-ink">{point.heading}</h5>
      <ExpandableDetail
        point={point}
        expanded={expanded}
        onExpandedChange={setExpanded}
        className={`mt-1 ${BODY_TEXT}`}
      />
    </div>
  );
}

export default function DetailPointExtra({ point }: DetailPointExtraProps) {
  return (
    <>
      {point.bullets && point.bullets.length > 0 && (
        <ul className={`mt-2 list-disc space-y-1 pl-5 ${BODY_TEXT}`}>
          {point.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {point.subpoints && point.subpoints.length > 0 && (
        <div className="mt-3 space-y-3">
          {point.subpoints.map((subpoint) => (
            <Subpoint key={subpoint.heading} point={subpoint} />
          ))}
        </div>
      )}
      {point.photos && <PhotoGallery photos={point.photos} />}
    </>
  );
}
