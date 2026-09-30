import SectionPage from "../components/SectionPage";
import ExpandableItem from "../components/ExpandableItem";
import { profileData } from "@/lib/profile";

export default function ArmyPage() {
  return (
    <SectionPage title="Army Service">
      <div className="space-y-4">
        {profileData.army.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-2">
            <ExpandableItem
              heading={
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</span>
                  <span className="text-sm font-normal text-gray-400 dark:text-gray-500">{entry.period}</span>
                </span>
              }
            >
              <p>{entry.description}</p>
            </ExpandableItem>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
