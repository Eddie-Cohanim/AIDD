import Image from "next/image";
import type { Photo } from "@/lib/profile";

const PHOTO_INTRINSIC_WIDTH = 800;
const PHOTO_INTRINSIC_HEIGHT = 600;
const PHOTO_SIZES = "(min-width: 640px) 50vw, 100vw";

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) return null;

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
          className="aspect-[4/3] w-full rounded-2xl border border-gray-200 dark:border-gray-800 object-cover"
        />
      ))}
    </div>
  );
}
