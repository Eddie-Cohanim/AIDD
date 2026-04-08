import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function AboutPage() {
  return (
    <SectionPage title="About">
      <ul className="space-y-2 list-disc list-inside">
        {profileData.about.map((item, i) => (
          <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
        ))}
      </ul>
    </SectionPage>
  );
}
