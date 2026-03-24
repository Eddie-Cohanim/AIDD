interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

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
}

interface ResumeData {
  name: string;
  tagline: string;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceEntry[];
  skills: Record<string, string[]>;
  education: EducationEntry[];
}

const resume: ResumeData = {
  name: "Eddie Cohanim",
  tagline: "Software Engineer",
  contact: {
    email: "eddie@example.com",
    phone: "(555) 000-0000",
    location: "New York, NY",
    linkedin: "linkedin.com/in/eddiecohanim",
    github: "github.com/ecoha",
  },
  summary:
    "Software engineer with experience building full-stack web applications. " +
    "Passionate about clean architecture, developer tooling, and AI-assisted development workflows.",
  experience: [
    {
      title: "Software Engineer",
      company: "Company Name",
      period: "Jan 2023 - Present",
      bullets: [
        "Built and maintained full-stack features using React, Node.js, and PostgreSQL.",
        "Led migration of legacy REST endpoints to a typed GraphQL API, reducing client-side data over-fetching by 40%.",
        "Collaborated with product and design to ship features on a two-week sprint cadence.",
      ],
    },
    {
      title: "Junior Developer",
      company: "Previous Company",
      period: "Jun 2021 - Dec 2022",
      bullets: [
        "Developed reusable UI component library adopted across three internal products.",
        "Automated deployment pipelines using GitHub Actions, cutting release time in half.",
        "Wrote unit and integration tests, raising overall code coverage from 45% to 80%.",
      ],
    },
  ],
  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    "Frameworks & Libraries": ["Next.js", "React", "Node.js", "Tailwind CSS"],
    "Tools & Platforms": ["Git", "Docker", "Vercel", "AWS", "PostgreSQL"],
  },
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University Name",
      period: "2017 - 2021",
    },
  ],
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-gray-300 pb-1 text-xs font-bold uppercase tracking-widest text-gray-500">
      {children}
    </h2>
  );
}

function ExperienceBlock({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-semibold text-gray-900">{entry.title}</span>
          <span className="mx-2 text-gray-400">&mdash;</span>
          <span className="text-gray-700">{entry.company}</span>
        </div>
        <span className="text-sm text-gray-500">{entry.period}</span>
      </div>
      <ul className="mt-2 space-y-1 pl-4">
        {entry.bullets.map((bullet, i) => (
          <li key={i} className="relative text-sm text-gray-700 before:absolute before:-left-4 before:content-['-']">
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl bg-white p-10 shadow-md">

        {/* Header */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            {resume.name}
          </h1>
          <p className="mt-1 text-lg text-gray-500">{resume.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            <span>{resume.contact.email}</span>
            <span>{resume.contact.phone}</span>
            <span>{resume.contact.location}</span>
            <span>{resume.contact.linkedin}</span>
            <span>{resume.contact.github}</span>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-7">
          <SectionHeading>Summary</SectionHeading>
          <p className="text-sm leading-relaxed text-gray-700">{resume.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-7">
          <SectionHeading>Experience</SectionHeading>
          {resume.experience.map((entry, i) => (
            <ExperienceBlock key={i} entry={entry} />
          ))}
        </section>

        {/* Skills */}
        <section className="mb-7">
          <SectionHeading>Skills</SectionHeading>
          <div className="space-y-1">
            {Object.entries(resume.skills).map(([category, items]) => (
              <div key={category} className="flex gap-2 text-sm">
                <span className="w-44 shrink-0 font-medium text-gray-800">{category}:</span>
                <span className="text-gray-700">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionHeading>Education</SectionHeading>
          {resume.education.map((entry, i) => (
            <div key={i} className="flex items-baseline justify-between">
              <div>
                <span className="font-semibold text-gray-900">{entry.degree}</span>
                <span className="mx-2 text-gray-400">&mdash;</span>
                <span className="text-gray-700">{entry.institution}</span>
              </div>
              <span className="text-sm text-gray-500">{entry.period}</span>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
