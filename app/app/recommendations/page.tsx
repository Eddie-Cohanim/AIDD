import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function RecommendationsPage() {
  return (
    <SectionPage title="Recommendations">
      <div className="space-y-4">
        {profileData.recommendations.map((rec, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
            <p className="italic text-gray-600 dark:text-gray-300">{rec}</p>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
