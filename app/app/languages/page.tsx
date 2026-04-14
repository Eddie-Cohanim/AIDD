import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function LanguagesPage() {
  return (
    <SectionPage title="Languages">
      <div className="space-y-4">
        {profileData.languages.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
            <span className="font-medium text-gray-900 dark:text-white">{entry.language}</span>
            <span className="text-gray-600 dark:text-gray-300">{" - "}{entry.level}</span>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
