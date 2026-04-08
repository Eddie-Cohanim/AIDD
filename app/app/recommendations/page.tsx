import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function RecommendationsPage() {
  return (
    <SectionPage title="Recommendations">
      <ul className="space-y-4">
        {profileData.recommendations.map((rec, i) => (
          <li key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-600 dark:text-gray-300">
            {rec}
          </li>
        ))}
      </ul>
    </SectionPage>
  );
}
