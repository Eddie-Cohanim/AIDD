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

export interface ProjectEntry {
  title: string;
  bullets: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface LanguageEntry {
  language: string;
  level: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  about: string[];
  experience: ExperienceEntry[];
  army: string[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
  hobbies: string[];
  recommendations: string[];
  contact: ContactInfo;
}

export const profileData: SiteData = {
  name: "Eddie Cohanim",
  tagline: "AI Engineer and Data Scientist",
  about: [
    "AI Engineer at Constrol with a B.Sc. in Mathematics and Computer Science from the Technion. Analytical, self-motivated professional with a sharp problem-solving mindset, excellent communication, and strong interpersonal skills. A fast learner who thrives in collaborative, high-performance environments, dedicated to delivering meaningful impact through innovative AI solutions.",
  ],
  experience: [
    {
      title: "AI Engineering & SW Development",
      company: "Constrol",
      period: "September 2025 - Present",
      bullets: [
        "Work within a six-person R&D team, closely integrated with annotators and civil engineers, developing pipelines and training models that transform architectural blueprints into 3D buildings.",
      ],
    },
  ],
  army: [
    "Infantry, IDF Reserves (November 2020 - Present): Prioritized goals and ensured critical outcomes were achieved while serving on the October 7th war.",
    "Staff Sergeant, IDF Nahal Brigade (March 2018 - November 2020): Led over 40 soldiers and managed platoon operations and logistics in high-risk combat environments.",
  ],
  education: [
    {
      degree: "B.Sc. in Mathematics and Computer Science",
      institution: "Technion - Israel Institute of Technology",
      period: "October 2022 - April 2026",
      honors: [
        "Dean's List, Spring 2024 and Winter 2025 - Awarded for academic excellence and maintaining a high GPA.",
        "Courses: AI, Deep Learning, Data Structures, OS, Computer Organization and Programming, Algorithms, and Computer Structure.",
      ],
    },
  ],
  projects: [
    {
      title: "Technion CS Hackathon - Finalist",
      bullets: [
        "Led a 4-person team to architect and implement a Chrome extension that leveraged advanced AI and large-language models to scan news websites in real time and highlight potential false statements.",
        "Shortlisted as a finalist among all participating teams for innovation, technical execution, and real-world impact.",
      ],
    },
    {
      title: "Alcohol Type Identification",
      bullets: [
        "Co-implemented a two-stage AI pipeline integrating YOLO for detection and a custom CNN, optimized through hyperparameter research, image augmentation, and custom pre/post-processing workflows.",
        "Managed development via GitHub (version control) and Jira (task management).",
      ],
    },
    {
      title: "Local Server",
      bullets: [
        "Programmed a working server in C capable of running and interacting with multiple threads simultaneously.",
      ],
    },
  ],
  languages: [
    { language: "English", level: "Native speaker" },
    { language: "Hebrew", level: "Native speaker" },
  ],
  skills: [
    {
      category: "Coding Languages",
      items: ["C", "C++", "Python", "Assembly", "Bash"],
    },
    {
      category: "Fields of Knowledge",
      items: [
        "AI",
        "Deep Learning",
        "Data Structures",
        "OS (multi-threading, multi-processing)",
        "Linux",
        "Version Control",
        "Algorithms",
        "OOP",
        "Python Libraries",
      ],
    },
  ],
  hobbies: [
    "Indoor volleyball - plays for Maccabi Haifa",
    "Beach volleyball",
    "Gym",
    "Skiing",
    "Chess",
    "Video games",
    "Trying new foods",
    "Learning new and interesting topics",
    "Exploring the outdoors",
  ],
  recommendations: ["TODO"],
  contact: {
    email: "eddieco19@gmail.com",
    phone: "+972-544742122",
    linkedin: "TODO",
    github: "TODO",
  },
};
