"use client";

import { useState, useEffect } from "react";

interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  bullets: string[];
}

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  honors: string[];
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface SiteData {
  name: string;
  tagline: string;
  about: string[];
  experience: ExperienceEntry[];
  army: string[];
  education: EducationEntry[];
  skills: SkillGroup[];
  hobbies: string[];
  recommendations: string[];
  contact: { email: string; phone: string; linkedin: string; github: string };
}

const data: SiteData = {
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

function AboutContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {data.about.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-8">
      {data.experience.map((entry, i) => (
        <div key={i} className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-8">
          <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-gray-900" />
          <div className="mb-1 flex items-baseline gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
            <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
          </div>
          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.company}</p>
          <ul className="space-y-1 list-disc list-inside">
            {entry.bullets.map((b, j) => (
              <li key={j} className="text-gray-600 dark:text-gray-300">{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationContent() {
  return (
    <div className="space-y-8">
      {data.education.map((entry, i) => (
        <div key={i} className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-8">
          <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-gray-900" />
          <div className="mb-1 flex items-baseline gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.degree}</h3>
            <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
          </div>
          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.institution}</p>
          {entry.honors.length > 0 && (
            <ul className="space-y-1 list-disc list-inside">
              {entry.honors.map((honor, j) => (
                <li key={j} className="text-gray-600 dark:text-gray-300">{honor}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ArmyContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {data.army.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {data.skills.map((group) => (
        <div key={group.category}>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {group.category}
          </h3>
          <ul className="space-y-1 list-disc list-inside">
            {group.items.map((item) => (
              <li key={item} className="text-gray-600 dark:text-gray-300">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function HobbiesContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {data.hobbies.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function RecommendationsContent() {
  return (
    <ul className="space-y-4">
      {data.recommendations.map((rec, i) => (
        <li key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-600 dark:text-gray-300">
          {rec}
        </li>
      ))}
    </ul>
  );
}

function ContactContent() {
  return (
    <div className="space-y-2">
      <ul className="space-y-2 list-disc list-inside">
        <li className="text-gray-600 dark:text-gray-300">
          Email:{" "}
          <a href={`mailto:${data.contact.email}`} className="underline hover:text-gray-900 dark:hover:text-white">
            {data.contact.email}
          </a>
        </li>
        <li className="text-gray-600 dark:text-gray-300">Phone: {data.contact.phone}</li>
        <li className="text-gray-600 dark:text-gray-300">LinkedIn: {data.contact.linkedin}</li>
        <li className="text-gray-600 dark:text-gray-300">GitHub: {data.contact.github}</li>
      </ul>
    </div>
  );
}

interface SectionDef {
  id: string;
  label: string;
  Content: React.FC;
}

const sections: SectionDef[] = [
  { id: "about", label: "About", Content: AboutContent },
  { id: "experience", label: "Experience", Content: ExperienceContent },
  { id: "education", label: "Education", Content: EducationContent },
  { id: "army", label: "Army Service", Content: ArmyContent },
  { id: "skills", label: "Skills", Content: SkillsContent },
  { id: "hobbies", label: "Hobbies", Content: HobbiesContent },
  { id: "recommendations", label: "Recommendations", Content: RecommendationsContent },
  { id: "contact", label: "Contact", Content: ContactContent },
];

function NavBar({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-semibold text-gray-900 dark:text-white tracking-tight">EC</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
              {s.label}
            </a>
          ))}
          <button
            onClick={onToggle}
            className="ml-2 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Hello, I am
      </p>
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
        {data.name}
      </h1>
      <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{data.tagline}</p>
      <div className="mt-10 flex gap-4">
        <a
          href="#about"
          className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-100"
        >
          Learn more
        </a>
        <a
          href="#contact"
          className="rounded-full border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <NavBar darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} />
      <Hero />
      <div className="mx-auto max-w-3xl px-6 pb-24">
        {sections.map(({ id, label, Content }) => {
          const isOpen = openSections.has(id);
          return (
            <section key={id} id={id} className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{label}</h2>
                <span
                  className={`inline-block text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  &#9660;
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-8">
                    <Content />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
