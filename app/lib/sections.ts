export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "hackathons"
  | "army"
  | "recommendations"
  | "contact";

export const HERO_ID = "top";

export interface SectionLink {
  id: SectionId;
  label: string;
}

export const SECTIONS: readonly SectionLink[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "hackathons", label: "Hackathons" },
  { id: "skills", label: "Skills" },
  { id: "army", label: "Army Service" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
];

export function sectionHref(id: SectionId): string {
  return `/#${id}`;
}
