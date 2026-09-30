import SectionPage from "../components/SectionPage";
import ExpandableItem from "../components/ExpandableItem";
import PhotoGallery from "../components/PhotoGallery";
import { profileData } from "@/lib/profile";
import { isTodo } from "@/lib/todo";

export default function HackathonsPage() {
  return (
    <SectionPage title="Hackathons">
      <div className="space-y-4">
        {profileData.hackathons.map((entry) => (
          <div
            key={`${entry.event}-${entry.role}`}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-2"
          >
            <ExpandableItem
              heading={
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {entry.role} - {entry.event}
                  </span>
                  {!isTodo(entry.year) && (
                    <span className="text-sm font-normal text-gray-400 dark:text-gray-500">{entry.year}</span>
                  )}
                </span>
              }
            >
              <p>{entry.description}</p>
              <PhotoGallery photos={entry.photos} />
            </ExpandableItem>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
