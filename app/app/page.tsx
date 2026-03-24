interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  description: string;
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
  education: EducationEntry[];
  skills: SkillGroup[];
  contact: { email: string; linkedin: string; github: string };
}

const data: SiteData = {
  name: "Eddie Cohanim",
  tagline: "AI Engineer",
  about: [
    "I build full-stack web applications and care deeply about clean, maintainable code. I enjoy working at the intersection of good engineering and thoughtful product design.",
    "When I am not coding, you can find me exploring new technologies, contributing to side projects, or thinking about how AI is changing the way software gets built.",
  ],
  experience: [
    {
      title: "Software Engineer",
      company: "Company Name",
      period: "2023 - Present",
      description:
        "Built and maintained full-stack features across a React and Node.js codebase. Led a migration from REST to a typed GraphQL API, improving data efficiency by 40%.",
    },
    {
      title: "Junior Developer",
      company: "Previous Company",
      period: "2021 - 2022",
      description:
        "Developed a reusable component library used across three products. Automated CI/CD pipelines with GitHub Actions and increased test coverage from 45% to 80%.",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "University Name",
      period: "2017 - 2021",
      description:
        "Focused on algorithms, systems programming, and software engineering. Graduated with honors.",
    },
  ],
  skills: [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
    { category: "Frameworks", items: ["Next.js", "React", "Node.js", "Tailwind CSS"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "AWS", "PostgreSQL"] },
  ],
  contact: {
    email: "eddie@example.com",
    linkedin: "linkedin.com/in/eddiecohanim",
    github: "github.com/ecoha",
  },
};

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-semibold text-gray-900 tracking-tight">EC</span>
        <div className="flex gap-6 text-sm text-gray-600">
          <a href="#about" className="hover:text-gray-900 transition-colors">About</a>
          <a href="#experience" className="hover:text-gray-900 transition-colors">Experience</a>
          <a href="#skills" className="hover:text-gray-900 transition-colors">Skills</a>
          <a href="#education" className="hover:text-gray-900 transition-colors">Education</a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400">
        Hello, I am
      </p>
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
        {data.name}
      </h1>
      <p className="mt-4 text-xl text-gray-500">{data.tagline}</p>
      <div className="mt-10 flex gap-4">
        <a
          href="#about"
          className="rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Learn more
        </a>
        <a
          href="#contact"
          className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">About Me</h2>
        <div className="space-y-4">
          {data.about.map((paragraph, i) => (
            <p key={i} className="text-lg leading-relaxed text-gray-600">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="relative border-l-2 border-gray-200 pl-8">
      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gray-900 bg-white" />
      <div className="mb-1 flex items-baseline gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
        <span className="text-sm text-gray-400">{entry.period}</span>
      </div>
      <p className="mb-2 text-sm font-medium text-gray-500">{entry.company}</p>
      <p className="text-gray-600 leading-relaxed">{entry.description}</p>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-gray-900">Experience</h2>
        <div className="space-y-10">
          {data.experience.map((entry, i) => (
            <ExperienceCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-gray-900">Skills</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {data.skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-3xl font-bold text-gray-900">Education</h2>
        <div className="space-y-10">
          {data.education.map((entry, i) => (
            <div key={i} className="relative border-l-2 border-gray-200 pl-8">
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-gray-900 bg-white" />
              <div className="mb-1 flex items-baseline gap-3">
                <h3 className="text-lg font-semibold text-gray-900">{entry.degree}</h3>
                <span className="text-sm text-gray-400">{entry.period}</span>
              </div>
              <p className="mb-2 text-sm font-medium text-gray-500">{entry.institution}</p>
              <p className="text-gray-600 leading-relaxed">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-gray-900 px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-4 text-3xl font-bold text-white">Get In Touch</h2>
        <p className="mb-10 text-gray-400">
          I am open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
        </p>
        <a
          href={`mailto:${data.contact.email}`}
          className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
        >
          {data.contact.email}
        </a>
        <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
          <span>{data.contact.linkedin}</span>
          <span>{data.contact.github}</span>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
