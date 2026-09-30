import Image from "next/image";
import type { Photo } from "@/lib/profile";

const PLACEHOLDER_PHOTO_SLOT_COUNT = 2;
const PHOTO_INTRINSIC_WIDTH = 800;
const PHOTO_INTRINSIC_HEIGHT = 600;
const PHOTO_SIZES = "(min-width: 640px) 50vw, 100vw";
const PLACEHOLDER_SLOT_KEYS: number[] = Array.from(
  { length: PLACEHOLDER_PHOTO_SLOT_COUNT },
  (_, index) => index
);

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PLACEHOLDER_SLOT_KEYS.map((slot) => (
          <div
            key={slot}
            className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white/40 dark:bg-gray-900/40 text-sm text-gray-400 dark:text-gray-500"
          >
            Photo coming soon
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {photos.map((photo) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={PHOTO_INTRINSIC_WIDTH}
          height={PHOTO_INTRINSIC_HEIGHT}
          sizes={PHOTO_SIZES}
          className="aspect-[4/3] w-full rounded-lg border border-gray-200 dark:border-gray-700 object-cover"
        />
      ))}
    </div>
  );
}
