import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function ArmyPage() {
  return (
    <SectionPage title="Army Service">
      <div className="space-y-4">
        {profileData.army.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
              <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{entry.description}</p>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
