import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function ArmyPage() {
  return (
    <SectionPage title="Army Service">
      <ul className="space-y-2 list-disc list-inside">
        {profileData.army.map((item, i) => (
          <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
        ))}
      </ul>
    </SectionPage>
  );
}
