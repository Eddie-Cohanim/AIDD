import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import DetailPointList from "../DetailPointList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";

export default function ExperienceSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.experience.map((entry) => (
          <Card key={`${entry.company}-${entry.title}`}>
            <EntryHeader title={entry.title} subtitle={entry.company} meta={entry.period} />
            <DetailPointList points={entry.bullets} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
