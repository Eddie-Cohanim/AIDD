import Section from "../Section";
import ChipList from "../ChipList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { EYEBROW } from "@/lib/styles";

const LANGUAGE_CHIPS = profileData.languages.map((entry) => `${entry.language} - ${entry.level}`);

export default function AboutSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {profileData.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className={`mb-3 ${EYEBROW}`}>Languages</h3>
          <ChipList items={LANGUAGE_CHIPS} />
        </div>
        <div>
          <h3 className={`mb-3 ${EYEBROW}`}>Outside work</h3>
          <ChipList items={profileData.hobbies} />
        </div>
      </div>
    </Section>
  );
}
