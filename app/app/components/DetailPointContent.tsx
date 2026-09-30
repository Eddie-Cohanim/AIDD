import ExpandableItem from "./ExpandableItem";
import PhotoGallery from "./PhotoGallery";
import type { DetailPoint } from "@/lib/profile";
import { BODY_TEXT } from "@/lib/styles";

interface DetailPointContentProps {
  point: DetailPoint;
}

export default function DetailPointContent({ point }: DetailPointContentProps) {
  return (
    <>
      <p className={BODY_TEXT}>{point.detail}</p>
      {point.bullets && point.bullets.length > 0 && (
        <ul className={`mt-2 list-disc space-y-1 pl-5 ${BODY_TEXT}`}>
          {point.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {point.subpoints && point.subpoints.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-200 dark:border-gray-800 pl-4">
          {point.subpoints.map((subpoint) => (
            <ExpandableItem key={subpoint.heading} heading={subpoint.heading}>
              <DetailPointContent point={subpoint} />
            </ExpandableItem>
          ))}
        </div>
      )}
      {point.photos && <PhotoGallery photos={point.photos} />}
    </>
  );
}
