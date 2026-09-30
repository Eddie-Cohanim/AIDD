import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { BODY_TEXT } from "@/lib/styles";

export default function ArmySection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.army.map((entry) => (
          <Card key={entry.title}>
            <EntryHeader title={entry.title} meta={entry.period} />
            <p className={BODY_TEXT}>{entry.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
