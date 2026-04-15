"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChatWidget from "./ChatWidget";

const PARTICLE_COUNT = 140;
const PARTICLE_MIN_SIZE = 1;
const PARTICLE_SIZE_RANGE = 1.5;
const PARTICLE_MIN_FALL_SPEED = 0.5;
const PARTICLE_FALL_SPEED_RANGE = 1.0;
const PARTICLE_HORIZONTAL_SPREAD = 0.4;
const PARTICLE_SPAWN_TOP_OFFSET = 20;
const PARTICLE_BOUNDARY_MARGIN = 30;
const PARTICLE_BOTTOM_MARGIN = 10;
const PARTICLE_ATTRACT_RADIUS = 160;
const PARTICLE_ORBIT_RADIUS = 60;
const PARTICLE_ORBIT_SPRING = 0.012;
const PARTICLE_ORBIT_TANGENTIAL = 0.020;
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
const DARK_MODE_STORAGE_KEY = "darkMode";

interface NavSection {
  id: string;
  label: string;
  href: string;
}

const navSections: NavSection[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "experience", label: "Experience", href: "/experience" },
  { id: "education", label: "Education", href: "/education" },
  { id: "army", label: "Army Service", href: "/army" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "skills", label: "Skills", href: "/skills" },
  { id: "hobbies", label: "Hobbies", href: "/hobbies" },
  { id: "recommendations", label: "Recommendations", href: "/recommendations" },
  { id: "contact", label: "Contact", href: "/contact" },
];

function NavBar({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-gray-900 dark:text-white tracking-tight">
          EC
        </Link>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          {navSections.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className={`transition-colors hover:text-gray-900 dark:hover:text-white ${
                pathname === s.href ? "font-semibold text-gray-900 dark:text-white" : ""
              }`}
            >
              {s.label}
            </Link>
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

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    return stored !== null ? stored === "true" : true;
  });

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
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(darkMode));
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

        if (dist < PARTICLE_ATTRACT_RADIUS && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const radialError = dist - PARTICLE_ORBIT_RADIUS;
          p.vx += nx * radialError * PARTICLE_ORBIT_SPRING;
          p.vy += ny * radialError * PARTICLE_ORBIT_SPRING;
          p.vx += -ny * PARTICLE_ORBIT_TANGENTIAL;
          p.vy += nx * PARTICLE_ORBIT_TANGENTIAL;
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

  return (
    <div className="min-h-screen">
      <div aria-hidden="true" className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ zIndex: -1, backgroundImage: "url('/bg-wallpaper.jpg')" }} />
      <div aria-hidden="true" className="fixed inset-0 bg-white dark:bg-black" style={{ zIndex: 0, transition: "opacity 0.5s", opacity: "var(--canvas-slab-opacity, 1)" }} />
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 pointer-events-none w-full h-full" style={{ zIndex: 1, transition: "opacity 0.5s", opacity: "var(--canvas-slab-opacity, 1)" }} />
      <NavBar darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} />
      {children}
      <ChatWidget />
    </div>
  );
}
