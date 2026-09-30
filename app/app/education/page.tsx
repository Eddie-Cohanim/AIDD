import SectionPage from "../components/SectionPage";
import ExpandableItem from "../components/ExpandableItem";
import DetailPointContent from "../components/DetailPointContent";
import { profileData } from "@/lib/profile";

export default function EducationPage() {
  return (
    <SectionPage title="Education">
      <div className="space-y-4">
        {profileData.education.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.degree}</h3>
              <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
            </div>
            <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.institution}</p>
            <div>
              {entry.highlights.map((point) => (
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
