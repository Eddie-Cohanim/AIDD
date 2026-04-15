import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function AboutPage() {
  return (
    <SectionPage title="About">
      <div className="space-y-4">
        {profileData.about.map((item, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <p className="text-gray-600 dark:text-gray-300">{item}</p>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
