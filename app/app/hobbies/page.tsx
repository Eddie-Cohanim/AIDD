import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function HobbiesPage() {
  return (
    <SectionPage title="Hobbies">
      <ul className="space-y-2 list-disc list-inside">
        {profileData.hobbies.map((item, i) => (
          <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
        ))}
      </ul>
    </SectionPage>
  );
}
