import SectionPage from "../components/SectionPage";
import ExpandableItem from "../components/ExpandableItem";
import DetailPointContent from "../components/DetailPointContent";
import { profileData } from "@/lib/profile";

export default function ProjectsPage() {
  return (
    <SectionPage title="Projects">
      <div className="space-y-20">
        {profileData.projects.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
            <div>
              {entry.bullets.map((point) => (
                <ExpandableItem key={point.heading} heading={point.heading}>
                  <DetailPointContent point={point} />
                </ExpandableItem>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
