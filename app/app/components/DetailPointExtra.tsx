import PhotoGallery from "./PhotoGallery";
import type { DetailPoint } from "@/lib/profile";
import { BODY_TEXT } from "@/lib/styles";

interface DetailPointExtraProps {
  point: DetailPoint;
}

export function hasExtraContent(point: DetailPoint): boolean {
  return Boolean(point.bullets?.length || point.subpoints?.length || point.photos?.length);
}

function Subpoint({ point }: DetailPointExtraProps) {
  return (
    <div className="rounded-2xl bg-gray-50/80 dark:bg-white/5 p-4">
      <h5 className="font-semibold text-gray-900 dark:text-white">{point.heading}</h5>
      <p className={`mt-1 ${BODY_TEXT}`}>{point.detail}</p>
      <DetailPointExtra point={point} />
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
