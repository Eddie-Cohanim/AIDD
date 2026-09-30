import { Fragment } from "react";
import Hero from "./components/Hero";
import SectionDivider from "./components/SectionDivider";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import EducationSection from "./components/sections/EducationSection";
import SkillsSection from "./components/sections/SkillsSection";
import HackathonsSection from "./components/sections/HackathonsSection";
import MilitarySection from "./components/sections/MilitarySection";
import RecommendationsSection from "./components/sections/RecommendationsSection";
import ContactSection from "./components/sections/ContactSection";
import { CONTENT_Z_INDEX } from "@/lib/constants";
import { SECTIONS, type SectionId, type SectionLink } from "@/lib/sections";

const SECTION_RENDERERS: Record<SectionId, (link: SectionLink) => React.ReactNode> = {
  about: (link) => <AboutSection {...link} />,
  experience: (link) => <ExperienceSection {...link} />,
  projects: (link) => <ProjectsSection {...link} />,
  education: (link) => <EducationSection {...link} />,
  skills: (link) => <SkillsSection {...link} />,
  hackathons: (link) => <HackathonsSection {...link} />,
  military: (link) => <MilitarySection {...link} />,
  recommendations: (link) => <RecommendationsSection {...link} />,
  contact: (link) => <ContactSection {...link} />,
};

export default function HomePage() {
  return (
    <main className="relative pb-16" style={{ zIndex: CONTENT_Z_INDEX }}>
      <Hero />
      {SECTIONS.map((section) => (
        <Fragment key={section.id}>
          <SectionDivider />
          {SECTION_RENDERERS[section.id](section)}
        </Fragment>
      ))}
    </main>
  );
}
