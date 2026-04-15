import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function ProjectsPage() {
  return (
    <SectionPage title="Projects">
      <div className="space-y-20">
        {profileData.projects.map((entry, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
            <ul className="space-y-1 list-disc list-inside">
              {entry.bullets.map((b, j) => (
                <li key={j} className="text-gray-600 dark:text-gray-300">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
