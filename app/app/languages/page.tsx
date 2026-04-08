import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function LanguagesPage() {
  return (
    <SectionPage title="Languages">
      <ul className="space-y-2 list-disc list-inside">
        {profileData.languages.map((entry, i) => (
          <li key={i} className="text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{entry.language}</span>
            {" - "}{entry.level}
          </li>
        ))}
      </ul>
    </SectionPage>
  );
}
