import SectionPage from "../components/SectionPage";
import ExpandableItem from "../components/ExpandableItem";
import { profileData, type RecommenderContact } from "@/lib/profile";
import { isTodo } from "@/lib/todo";

interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

function buildContactLinks(contact: RecommenderContact): ContactLink[] {
  const links: ContactLink[] = [];
  if (!isTodo(contact.email)) {
    links.push({ label: "Email", value: contact.email, href: `mailto:${contact.email}`, external: false });
  }
  if (!isTodo(contact.phone)) {
    links.push({ label: "Phone", value: contact.phone, href: `tel:${contact.phone}`, external: false });
  }
  if (!isTodo(contact.linkedin)) {
    links.push({ label: "LinkedIn", value: contact.linkedin, href: contact.linkedin, external: true });
  }
  return links;
}

export default function RecommendationsPage() {
  return (
    <SectionPage title="Recommendations">
      <div className="space-y-4">
        {profileData.recommendations.map((rec) => {
          const links = buildContactLinks(rec.contact);
          return (
            <div
              key={rec.name}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-5 py-2"
            >
              <ExpandableItem
                heading={
                  <span className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{rec.name}</span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {rec.position}, {rec.company}
                    </span>
                  </span>
                }
              >
                <p className="mb-3">
                  Recommendation available on request. Please contact {rec.name} directly.
                </p>
                {links.length > 0 ? (
                  <ul className="space-y-1">
                    {links.map((link) => (
                      <li key={link.label}>
                        {link.label}:{" "}
                        <a
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="underline hover:text-gray-900 dark:hover:text-white"
                        >
                          {link.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500">Contact details coming soon.</p>
                )}
              </ExpandableItem>
            </div>
          );
        })}
      </div>
    </SectionPage>
  );
}
