import Section from "../Section";
import Card from "../Card";
import EntryHeader from "../EntryHeader";
import PhotoGallery from "../PhotoGallery";
import { profileData } from "@/lib/profile";
import type { SectionLink } from "@/lib/sections";
import { isTodo } from "@/lib/todo";
import { BODY_TEXT, TEXT_LINK } from "@/lib/styles";

export default function HackathonsSection({ id, label }: SectionLink) {
  return (
    <Section id={id} title={label}>
      <div className="space-y-6">
        {profileData.hackathons.map((entry) => (
          <Card key={`${entry.event}-${entry.role}`}>
            <EntryHeader
              title={entry.event}
              subtitle={entry.role}
              meta={isTodo(entry.year) ? undefined : entry.year}
            />
            <p className={BODY_TEXT}>{entry.description}</p>
            {!isTodo(entry.postUrl) && (
              <p className="mt-3 text-sm">
                <a href={entry.postUrl} target="_blank" rel="noopener noreferrer" className={TEXT_LINK}>
                  View LinkedIn post
                </a>
              </p>
            )}
            <PhotoGallery photos={entry.photos} />
          </Card>
        ))}
      </div>
    </Section>
  );
}
