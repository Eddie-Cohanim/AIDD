import SectionPage from "../components/SectionPage";
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
            {entry.honors.length > 0 && (
              <ul className="space-y-1 list-disc list-inside">
                {entry.honors.map((honor, j) => (
                  <li key={j} className="text-gray-600 dark:text-gray-300">{honor}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
