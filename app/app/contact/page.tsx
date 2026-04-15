import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";

export default function ContactPage() {
  return (
    <SectionPage title="Contact">
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">
            Email:{" "}
            <a
              href={`mailto:${profileData.contact.email}`}
              className="underline hover:text-gray-900 dark:hover:text-white"
            >
              {profileData.contact.email}
            </a>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">Phone: {profileData.contact.phone}</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${profileData.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 dark:hover:text-white"
            >
              Message me on WhatsApp
            </a>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">LinkedIn: {profileData.contact.linkedin}</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">GitHub: {profileData.contact.github}</p>
        </div>
      </div>
    </SectionPage>
  );
}
