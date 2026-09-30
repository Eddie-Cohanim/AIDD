import DetailPointItem from "./DetailPointItem";
import type { DetailPoint } from "@/lib/profile";

interface DetailPointListProps {
  points: DetailPoint[];
}

export default function DetailPointList({ points }: DetailPointListProps) {
  return (
    <ul className="divide-y divide-line pl-4 sm:pl-6">
      {points.map((point) => (
        <DetailPointItem key={point.heading} point={point} />
      ))}
    </ul>
  );
}
