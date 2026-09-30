import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import DetailPointList from "../DetailPointList";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";

export default function ProjectsSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.projects.map((entry) => (
          <Card key={entry.title}>
            <EntryHeader title={entry.title} />
            <DetailPointList points={entry.bullets} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
