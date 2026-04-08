import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function ContactPage() {
  return (
    <SectionPage title="Contact">
      <ul className="space-y-2 list-disc list-inside">
        <li className="text-gray-600 dark:text-gray-300">
          Email:{" "}
          <a
            href={`mailto:${profileData.contact.email}`}
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            {profileData.contact.email}
          </a>
        </li>
        <li className="text-gray-600 dark:text-gray-300">Phone: {profileData.contact.phone}</li>
        <li className="text-gray-600 dark:text-gray-300">LinkedIn: {profileData.contact.linkedin}</li>
        <li className="text-gray-600 dark:text-gray-300">GitHub: {profileData.contact.github}</li>
      </ul>
    </SectionPage>
  );
}
