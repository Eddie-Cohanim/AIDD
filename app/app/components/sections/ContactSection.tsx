import Section from "../Section";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { buildContactLinks } from "@/lib/contact-links";
import { BODY_TEXT, CARD_SURFACE, EYEBROW, FOCUS_RING } from "@/lib/styles";

const CONTACT_LINKS = buildContactLinks(profileData.contact);

export default function ContactSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <p className={`mb-8 text-lg ${BODY_TEXT}`}>
        Feel free to reach out through any of the channels below.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {CONTACT_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`group block p-5 transition-colors hover:border-accent ${CARD_SURFACE} ${FOCUS_RING}`}
            >
              <span className={`block ${EYEBROW}`}>{link.label}</span>
              <span className="mt-1 block break-all font-medium text-gray-900 dark:text-white group-hover:text-accent">
                {link.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
