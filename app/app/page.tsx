"use client";

import { useState, useEffect, useRef } from "react";
import { profileData } from "@/lib/profile";
import ChatWidget from "./components/ChatWidget";

function AboutContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {profileData.about.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function ExperienceContent() {
  return (
    <div className="space-y-4">
      {profileData.experience.map((entry, i) => (
        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
            <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
          </div>
          <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.company}</p>
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
    <div className="space-y-4">
      {profileData.education.map((entry, i) => (
        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.degree}</h3>
            <span className="text-sm text-gray-400 dark:text-gray-500">{entry.period}</span>
          </div>
          <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">{entry.institution}</p>
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
      {profileData.army.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function SkillsContent() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {profileData.skills.map((group) => (
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

function ProjectsContent() {
  return (
    <div className="space-y-4">
      {profileData.projects.map((entry, i) => (
        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
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

function LanguagesContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {profileData.languages.map((entry, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">{entry.language}</span>
          {" - "}{entry.level}
        </li>
      ))}
    </ul>
  );
}

function HobbiesContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      {profileData.hobbies.map((item, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-300">{item}</li>
      ))}
    </ul>
  );
}

function RecommendationsContent() {
  return (
    <ul className="space-y-4">
      {profileData.recommendations.map((rec, i) => (
        <li key={i} className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic text-gray-600 dark:text-gray-300">
          {rec}
        </li>
      ))}
    </ul>
  );
}

function ContactContent() {
  return (
    <ul className="space-y-2 list-disc list-inside">
      <li className="text-gray-600 dark:text-gray-300">
        Email:{" "}
        <a href={`mailto:${profileData.contact.email}`} className="underline hover:text-gray-900 dark:hover:text-white">
          {profileData.contact.email}
        </a>
      </li>
      <li className="text-gray-600 dark:text-gray-300">Phone: {profileData.contact.phone}</li>
      <li className="text-gray-600 dark:text-gray-300">LinkedIn: {profileData.contact.linkedin}</li>
      <li className="text-gray-600 dark:text-gray-300">GitHub: {profileData.contact.github}</li>
    </ul>
  );
}

const PARTICLE_COUNT = 140;
const PARTICLE_MIN_SIZE = 1;
const PARTICLE_SIZE_RANGE = 1.5;
const PARTICLE_MIN_FALL_SPEED = 0.5;
const PARTICLE_FALL_SPEED_RANGE = 1.0;
const PARTICLE_HORIZONTAL_SPREAD = 0.4;
const PARTICLE_SPAWN_TOP_OFFSET = 20;
const PARTICLE_BOUNDARY_MARGIN = 30;
const PARTICLE_BOTTOM_MARGIN = 10;
const PARTICLE_ATTRACT_RADIUS = 130;
const PARTICLE_ATTRACT_FORCE = 0.025;
const PARTICLE_HORIZONTAL_DAMPING = 0.06;
const PARTICLE_VERTICAL_DAMPING = 0.04;
const PARTICLE_ALPHA_DARK = 0.55;
const PARTICLE_ALPHA_LIGHT = 0.50;
const PARTICLE_COLOR_R = 148;
const PARTICLE_COLOR_G = 150;
const PARTICLE_COLOR_B = 255;

const GRADIENT_RADIUS = 100;
const GRADIENT_SPRING_STRENGTH = 0.055;
const GRADIENT_SPRING_DAMPING = 0.80;
const GRADIENT_ALPHA_DARK = 0.16;
const GRADIENT_ALPHA_LIGHT = 0.14;
const GRADIENT_COLOR_R = 99;
const GRADIENT_COLOR_G = 102;
const GRADIENT_COLOR_B = 241;

const TRAIL_LENGTH = 8;
const TRAIL_ALPHA_SCALE = 0.5;
const TRAIL_RADIUS_MIN_SCALE = 0.35;

const BLOB_OSCILLATION_SPEED = 0.018;
const BLOB_LOBE_OFFSET = 15;
const BLOB_LOBE_RADIUS_SCALE = 0.72;
const BLOB_LOBE_ALPHA_SCALE = 0.45;

const CANVAS_RESOLUTION_SCALE = 0.5;

const MOUSE_INITIAL_OFFSET = -1000;
const NAVIGATE_SCROLL_DELAY_MS = 50;

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
  { id: "projects", label: "Projects", Content: ProjectsContent },
  { id: "skills", label: "Skills", Content: SkillsContent },
  { id: "languages", label: "Languages", Content: LanguagesContent },
  { id: "hobbies", label: "Hobbies", Content: HobbiesContent },
  { id: "recommendations", label: "Recommendations", Content: RecommendationsContent },
  { id: "contact", label: "Contact", Content: ContactContent },
];

function NavBar({
  darkMode,
  onToggle,
  onNavigate,
}: {
  darkMode: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="font-semibold text-gray-900 dark:text-white tracking-tight">EC</span>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {s.label}
            </button>
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

function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900 px-6 text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Hello, I am
      </p>
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
        {profileData.name}
      </h1>
      <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{profileData.tagline}</p>
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => onNavigate("about")}
          className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-100"
        >
          Learn more
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="rounded-full border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Get in touch
        </button>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [darkMode, setDarkMode] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: MOUSE_INITIAL_OFFSET, y: MOUSE_INITIAL_OFFSET });
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * CANVAS_RESOLUTION_SCALE);
      canvas.height = Math.floor(rect.height * CANVAS_RESOLUTION_SCALE);
    }
    resize();
    window.addEventListener("resize", resize);

    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseRef.current = { x: centerX, y: centerY };
    posRef.current = { x: centerX, y: centerY };
    velRef.current = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseVy: number;
    }

    function makeParticle(w: number, h: number, fromTop: boolean): Particle {
      const baseVy = PARTICLE_MIN_FALL_SPEED + Math.random() * PARTICLE_FALL_SPEED_RANGE;
      return {
        x: Math.random() * w,
        y: fromTop ? -Math.random() * PARTICLE_SPAWN_TOP_OFFSET : Math.random() * h,
        vx: (Math.random() - 0.5) * PARTICLE_HORIZONTAL_SPREAD,
        vy: baseVy,
        size: PARTICLE_MIN_SIZE + Math.random() * PARTICLE_SIZE_RANGE,
        baseVy,
      };
    }

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      makeParticle(window.innerWidth, window.innerHeight, false)
    );

    let animId: number;
    function animate() {
      if (!canvas || !ctx) return;
      const c: HTMLCanvasElement = canvas;
      const cx: CanvasRenderingContext2D = ctx;
      const screenW = c.width / CANVAS_RESOLUTION_SCALE;
      const screenH = c.height / CANVAS_RESOLUTION_SCALE;
      cx.setTransform(CANVAS_RESOLUTION_SCALE, 0, 0, CANVAS_RESOLUTION_SCALE, 0, 0);
      cx.clearRect(0, 0, screenW, screenH);

      velRef.current.x += (mouseRef.current.x - posRef.current.x) * GRADIENT_SPRING_STRENGTH;
      velRef.current.y += (mouseRef.current.y - posRef.current.y) * GRADIENT_SPRING_STRENGTH;
      velRef.current.x *= GRADIENT_SPRING_DAMPING;
      velRef.current.y *= GRADIENT_SPRING_DAMPING;
      posRef.current.x += velRef.current.x;
      posRef.current.y += velRef.current.y;

      const trail = trailRef.current;
      trail.push({ x: posRef.current.x, y: posRef.current.y });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      timeRef.current += BLOB_OSCILLATION_SPEED;
      const t = timeRef.current;

      const gradAlpha = darkMode ? GRADIENT_ALPHA_DARK : GRADIENT_ALPHA_LIGHT;
      const gc = `${GRADIENT_COLOR_R}, ${GRADIENT_COLOR_G}, ${GRADIENT_COLOR_B}`;

      function drawBlob(x: number, y: number, radius: number, alpha: number) {
        const lobes = [
          { dx: Math.sin(t * 0.7) * BLOB_LOBE_OFFSET, dy: Math.cos(t * 0.5) * BLOB_LOBE_OFFSET, r: radius },
          { dx: Math.sin(t * 0.4 + 1.0) * BLOB_LOBE_OFFSET, dy: Math.cos(t * 0.9 + 2.0) * BLOB_LOBE_OFFSET, r: radius * BLOB_LOBE_RADIUS_SCALE },
        ];
        for (const lobe of lobes) {
          const lobeAlpha = lobe.r < radius ? alpha * BLOB_LOBE_ALPHA_SCALE : alpha;
          const g = cx.createRadialGradient(x + lobe.dx, y + lobe.dy, 0, x + lobe.dx, y + lobe.dy, lobe.r);
          g.addColorStop(0, `rgba(${gc}, ${lobeAlpha})`);
          g.addColorStop(1, "rgba(0,0,0,0)");
          cx.fillStyle = g;
          cx.fillRect(0, 0, screenW, screenH);
        }
      }

      const trailCount = trail.length;
      for (let i = 0; i < trailCount; i++) {
        const progress = trailCount > 1 ? i / (trailCount - 1) : 1;
        const trailAlpha = gradAlpha * progress * TRAIL_ALPHA_SCALE;
        const trailRadius = GRADIENT_RADIUS * (TRAIL_RADIUS_MIN_SCALE + (1 - TRAIL_RADIUS_MIN_SCALE) * progress);
        drawBlob(trail[i].x, trail[i].y, trailRadius, trailAlpha);
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < PARTICLE_ATTRACT_RADIUS) {
          const force = ((PARTICLE_ATTRACT_RADIUS - dist) / PARTICLE_ATTRACT_RADIUS) * PARTICLE_ATTRACT_FORCE;
          p.vx += dx * force;
          p.vy += dy * force;
        }
        p.vx += -p.vx * PARTICLE_HORIZONTAL_DAMPING;
        p.vy += (p.baseVy - p.vy) * PARTICLE_VERTICAL_DAMPING;

        p.x += p.vx;
        p.y += p.vy;

        if (
          p.y > screenH + PARTICLE_BOTTOM_MARGIN ||
          p.x < -PARTICLE_BOUNDARY_MARGIN ||
          p.x > screenW + PARTICLE_BOUNDARY_MARGIN
        ) {
          const fresh = makeParticle(screenW, screenH, true);
          Object.assign(p, fresh);
        }
      }

      const particleAlpha = darkMode ? PARTICLE_ALPHA_DARK : PARTICLE_ALPHA_LIGHT;
      cx.fillStyle = `rgba(${PARTICLE_COLOR_R}, ${PARTICLE_COLOR_G}, ${PARTICLE_COLOR_B}, ${particleAlpha})`;
      cx.beginPath();
      for (const p of particles) {
        cx.moveTo(p.x + p.size, p.y);
        cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      }
      cx.fill();

      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
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

  function navigateToSection(id: string) {
    setOpenSections((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, NAVIGATE_SCROLL_DELAY_MS);
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none w-full h-full" />
      <NavBar darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} onNavigate={navigateToSection} />
      <main>
      <Hero onNavigate={navigateToSection} />
      <div className="mx-auto max-w-3xl px-6 pb-24">
        {sections.map(({ id, label, Content }) => {
          const isOpen = openSections.has(id);
          return (
            <section key={id} id={id} className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleSection(id)}
                className="w-full flex items-center gap-4 py-6 text-left"
              >
                <span
                  className={`inline-block text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  &#9660;
                </span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white ml-auto">{label}</h2>
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
      </main>
      <ChatWidget />
    </div>
  );
}
