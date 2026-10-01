import Image from "next/image";
import type { Photo } from "@/lib/profile";
import { FOCUS_RING } from "@/lib/styles";

// Photos are capped by height, so the widest (landscape) one renders at most about 480px wide.
const PHOTO_SIZES = "(min-width: 640px) 480px, 100vw";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-start gap-4">
      {photos.map((photo) => (
        <a
          key={photo.src}
          href={photo.src}
          target="_blank"
          rel="noopener noreferrer"
          className={`block max-w-full rounded-2xl ${FOCUS_RING}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={PHOTO_SIZES}
            className="h-auto max-h-72 w-auto max-w-full rounded-2xl border border-line transition-opacity hover:opacity-90"
          />
          <span className="sr-only"> (opens full size in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
