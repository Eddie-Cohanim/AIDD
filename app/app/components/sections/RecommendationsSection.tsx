import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { buildRecommenderLinks } from "@/lib/contact-links";
import { BODY_TEXT, TEXT_LINK } from "@/lib/styles";

export default function RecommendationsSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.recommendations.map((rec) => {
          const links = buildRecommenderLinks(rec.contact);
          return (
            <Card key={rec.name}>
              <EntryHeader title={rec.name} subtitle={`${rec.position}, ${rec.company}`} />
              <p className={BODY_TEXT}>
                Recommendation available on request. Please contact {rec.name} directly.
              </p>
              {links.length > 0 ? (
                <ul className="mt-3 space-y-1 text-sm">
                  {links.map((link) => (
                    <li key={link.label} className="text-gray-600 dark:text-gray-300">
                      {link.label}:{" "}
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={TEXT_LINK}
                      >
                        {link.value}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Contact details coming soon.
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
