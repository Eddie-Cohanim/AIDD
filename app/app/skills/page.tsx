import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function SkillsPage() {
  return (
    <SectionPage title="Skills">
      <div className="space-y-4">
        {profileData.skills.map((group) => (
          <div key={group.category} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {group.category}
            </h3>
            <ul className="space-y-1 list-disc list-inside">
              {group.items.map((item) => (
                <li key={item} className="text-gray-600 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
