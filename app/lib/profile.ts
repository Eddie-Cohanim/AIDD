export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  honors: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  about: string[];
  experience: ExperienceEntry[];
  army: string[];
  education: EducationEntry[];
  skills: SkillGroup[];
  hobbies: string[];
  recommendations: string[];
  contact: ContactInfo;
}

export const profileData: SiteData = {
  name: "Eddie Cohanim",
  tagline: "AI Engineer and Data Scientist",
  about: ["TODO"],
  experience: [
    {
      title: "Junior AI Engineer",
      company: "Constrol",
      period: "September 2025 - Present",
      bullets: ["TODO"],
    },
  ],
  army: ["TODO"],
  education: [
    {
      degree: "B.Sc. Mathematics with Computer Science",
      institution: "Technion - Israel Institute of Technology",
      period: "TBD",
      honors: ["Dean's List (x2)"],
    },
  ],
  skills: [{ category: "TODO", items: ["TODO"] }],
  hobbies: ["TODO"],
  recommendations: ["TODO"],
  contact: {
    email: "eddieco19@gmail.com",
    phone: "+972 54-474-2122",
    linkedin: "TODO",
    github: "TODO",
  },
};
