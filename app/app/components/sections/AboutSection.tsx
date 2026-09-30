import Section from "../Section";
import ChipList from "../ChipList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { GROUP_LABEL } from "@/lib/styles";

const LANGUAGE_CHIPS = profileData.languages.map((entry) => `${entry.language} - ${entry.level}`);

export default function AboutSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-4 text-lg leading-relaxed text-ink-muted">
        {profileData.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-10">
        <h3 className={`mb-3 ${GROUP_LABEL}`}>Languages</h3>
        <ChipList items={LANGUAGE_CHIPS} />
      </div>
    </Section>
  );
}
