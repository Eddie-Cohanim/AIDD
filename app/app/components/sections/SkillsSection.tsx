import Section from "../Section";
import ChipList from "../ChipList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { EYEBROW } from "@/lib/styles";

export default function SkillsSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-8">
        {profileData.skills.map((group) => (
          <div key={group.category}>
            <h3 className={`mb-3 ${EYEBROW}`}>{group.category}</h3>
            <ChipList items={group.items} />
          </div>
        ))}
      </div>
    </Section>
  );
}
