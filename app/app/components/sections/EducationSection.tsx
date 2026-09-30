import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import DetailPointList from "../DetailPointList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";

export default function EducationSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.education.map((entry) => (
          <Card key={`${entry.institution}-${entry.degree}`}>
            <EntryHeader title={entry.degree} subtitle={entry.institution} meta={entry.period} />
            <DetailPointList points={entry.highlights} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
