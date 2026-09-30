import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import { profileData } from "@/lib/profile";
import { sectionHref, type SectionLink } from "@/lib/sections";
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
              {links.length > 0 ? (
                <p className={BODY_TEXT}>Available as a reference. You can reach {rec.name} directly:</p>
              ) : (
                <p className={BODY_TEXT}>
                  Available as a reference on request.{" "}
                  <a href={sectionHref("contact")} className={TEXT_LINK}>
                    Get in touch
                  </a>{" "}
                  and I will put you in contact.
                </p>
              )}
              {links.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm">
                  {links.map((link) => (
                    <li key={link.label} className="text-ink-muted">
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
              )}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
