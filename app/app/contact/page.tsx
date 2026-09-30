import SectionPage from "../components/SectionPage";
import { profileData } from "@/lib/profile";
import { isTodo } from "@/lib/todo";

export default function ContactPage() {
  const { contact } = profileData;

  return (
    <SectionPage title="Contact">
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">
            Email:{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline hover:text-gray-900 dark:hover:text-white"
            >
              {contact.email}
            </a>
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">Phone: {contact.phone}</p>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
          <p className="text-gray-600 dark:text-gray-300">
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 dark:hover:text-white"
            >
              Message me on WhatsApp
            </a>
          </p>
        </div>
        {!isTodo(contact.linkedin) && (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <p className="text-gray-600 dark:text-gray-300">
              LinkedIn:{" "}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900 dark:hover:text-white"
              >
                {contact.linkedin}
              </a>
            </p>
          </div>
        )}
        {!isTodo(contact.github) && (
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 p-5">
            <p className="text-gray-600 dark:text-gray-300">
              GitHub:{" "}
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900 dark:hover:text-white"
              >
                {contact.github}
              </a>
            </p>
          </div>
        )}
      </div>
    </SectionPage>
  );
}
