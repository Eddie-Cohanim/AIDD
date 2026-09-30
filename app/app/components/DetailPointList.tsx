import DetailPointContent from "./DetailPointContent";
import type { DetailPoint } from "@/lib/profile";

interface DetailPointListProps {
  points: DetailPoint[];
}

export default function DetailPointList({ points }: DetailPointListProps) {
  return (
    <ul className="space-y-5">
      {points.map((point) => (
        <li key={point.heading}>
          <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">{point.heading}</h4>
          <DetailPointContent point={point} />
        </li>
      ))}
    </ul>
  );
}
