"use client";

import { useEffect, useRef } from "react";
import { BACKDROP_Z_INDEX, CANVAS_Z_INDEX } from "@/lib/constants";

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
// Dark theme draws chalk-colored particles on blueprint; light theme draws navy ink on paper.
const PARTICLE_RGB_DARK = "207, 224, 242";
const PARTICLE_RGB_LIGHT = "31, 78, 121";
const PARTICLE_ALPHA_DARK = 0.45;
const PARTICLE_ALPHA_LIGHT = 0.35;
const PARTICLE_FILL_DARK = `rgba(${PARTICLE_RGB_DARK}, ${PARTICLE_ALPHA_DARK})`;
const PARTICLE_FILL_LIGHT = `rgba(${PARTICLE_RGB_LIGHT}, ${PARTICLE_ALPHA_LIGHT})`;

const GRADIENT_RADIUS = 100;
const GRADIENT_SPRING_STRENGTH = 0.055;
const GRADIENT_SPRING_DAMPING = 0.80;
const GRADIENT_ALPHA_DARK = 0.14;
const GRADIENT_ALPHA_LIGHT = 0.10;
const GRADIENT_RGB_DARK = "120, 170, 230";
const GRADIENT_RGB_LIGHT = "47, 111, 176";
const GRADIENT_TRANSPARENT = "rgba(0,0,0,0)";

const TRAIL_LENGTH = 8;
const TRAIL_ALPHA_SCALE = 0.5;
const TRAIL_RADIUS_MIN_SCALE = 0.35;

const BLOB_OSCILLATION_SPEED = 0.018;
const BLOB_LOBE_OFFSET = 15;
const BLOB_LOBE_RADIUS_SCALE = 0.72;
const BLOB_LOBE_ALPHA_SCALE = 0.45;
const BLOB_PRIMARY_LOBE_FREQ_X = 0.7;
const BLOB_PRIMARY_LOBE_FREQ_Y = 0.5;
const BLOB_SECONDARY_LOBE_FREQ_X = 0.4;
const BLOB_SECONDARY_LOBE_PHASE_X = 1.0;
const BLOB_SECONDARY_LOBE_FREQ_Y = 0.9;
const BLOB_SECONDARY_LOBE_PHASE_Y = 2.0;

const CANVAS_RESOLUTION_SCALE = 0.5;
const MOUSE_INITIAL_OFFSET = -1000;
const RANDOM_CENTER_OFFSET = 0.5;
const DIAMETER_PER_RADIUS = 2;
const CENTER_DIVISOR = 2;
const FULL_CIRCLE_RADIANS = 2 * Math.PI;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseVy: number;
}

interface BackgroundCanvasProps {
  darkMode: boolean;
}

function drawGradientLobe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
  rgb: string
) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`);
  gradient.addColorStop(1, GRADIENT_TRANSPARENT);
  ctx.fillStyle = gradient;
  const diameter = radius * DIAMETER_PER_RADIUS;
  ctx.fillRect(x - radius, y - radius, diameter, diameter);
}

function makeParticle(w: number, h: number, fromTop: boolean): Particle {
  const baseVy = PARTICLE_MIN_FALL_SPEED + Math.random() * PARTICLE_FALL_SPEED_RANGE;
  return {
    x: Math.random() * w,
    y: fromTop ? -Math.random() * PARTICLE_SPAWN_TOP_OFFSET : Math.random() * h,
    vx: (Math.random() - RANDOM_CENTER_OFFSET) * PARTICLE_HORIZONTAL_SPREAD,
    vy: baseVy,
    size: PARTICLE_MIN_SIZE + Math.random() * PARTICLE_SIZE_RANGE,
    baseVy,
  };
}

export default function BackgroundCanvas({ darkMode }: BackgroundCanvasProps) {
  const darkModeRef = useRef(darkMode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: MOUSE_INITIAL_OFFSET, y: MOUSE_INITIAL_OFFSET });
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number }>>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    darkModeRef.current = darkMode;
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
    const centerX = rect.width / CENTER_DIVISOR;
    const centerY = rect.height / CENTER_DIVISOR;
    mouseRef.current = { x: centerX, y: centerY };
    posRef.current = { x: centerX, y: centerY };
    velRef.current = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove);

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

      const mouse = mouseRef.current;
      const pos = posRef.current;
      const vel = velRef.current;
      vel.x += (mouse.x - pos.x) * GRADIENT_SPRING_STRENGTH;
      vel.y += (mouse.y - pos.y) * GRADIENT_SPRING_STRENGTH;
      vel.x *= GRADIENT_SPRING_DAMPING;
      vel.y *= GRADIENT_SPRING_DAMPING;
      pos.x += vel.x;
      pos.y += vel.y;

      const trail = trailRef.current;
      trail.push({ x: pos.x, y: pos.y });
      if (trail.length > TRAIL_LENGTH) trail.shift();

      timeRef.current += BLOB_OSCILLATION_SPEED;
      const t = timeRef.current;
      const primaryDx = Math.sin(t * BLOB_PRIMARY_LOBE_FREQ_X) * BLOB_LOBE_OFFSET;
      const primaryDy = Math.cos(t * BLOB_PRIMARY_LOBE_FREQ_Y) * BLOB_LOBE_OFFSET;
      const secondaryDx = Math.sin(t * BLOB_SECONDARY_LOBE_FREQ_X + BLOB_SECONDARY_LOBE_PHASE_X) * BLOB_LOBE_OFFSET;
      const secondaryDy = Math.cos(t * BLOB_SECONDARY_LOBE_FREQ_Y + BLOB_SECONDARY_LOBE_PHASE_Y) * BLOB_LOBE_OFFSET;

      const isDark = darkModeRef.current;
      const gradAlpha = isDark ? GRADIENT_ALPHA_DARK : GRADIENT_ALPHA_LIGHT;
      const gradRgb = isDark ? GRADIENT_RGB_DARK : GRADIENT_RGB_LIGHT;

      const trailCount = trail.length;
      for (let i = 0; i < trailCount; i++) {
        const progress = trailCount > 1 ? i / (trailCount - 1) : 1;
        const trailAlpha = gradAlpha * progress * TRAIL_ALPHA_SCALE;
        const trailRadius = GRADIENT_RADIUS * (TRAIL_RADIUS_MIN_SCALE + (1 - TRAIL_RADIUS_MIN_SCALE) * progress);
        const { x, y } = trail[i];
        drawGradientLobe(cx, x + primaryDx, y + primaryDy, trailRadius, trailAlpha, gradRgb);
        drawGradientLobe(
          cx,
          x + secondaryDx,
          y + secondaryDy,
          trailRadius * BLOB_LOBE_RADIUS_SCALE,
          trailAlpha * BLOB_LOBE_ALPHA_SCALE,
          gradRgb
        );
      }

      const mx = mouse.x;
      const my = mouse.y;

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
          Object.assign(p, makeParticle(screenW, screenH, true));
        }
      }

      cx.fillStyle = isDark ? PARTICLE_FILL_DARK : PARTICLE_FILL_LIGHT;
      cx.beginPath();
      for (const p of particles) {
        cx.moveTo(p.x + p.size, p.y);
        cx.arc(p.x, p.y, p.size, 0, FULL_CIRCLE_RADIANS);
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
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-paper"
        style={{ zIndex: BACKDROP_Z_INDEX }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: CANVAS_Z_INDEX }}
      />
    </>
  );
}
