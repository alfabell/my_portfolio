'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { InteractiveHoverButton } from '@/component/ui/interactive-hover-button';

type Intensity = 'subtle' | 'medium' | 'strong';

interface BeamsProps {
  className?: string;
  intensity?: Intensity;
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const CAP_DPR = 1.75;
const TARGET_FPS = 48;
const BASE_BEAMS = 12;

function createBeam(w: number, h: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * w * 1.5 - w * 0.25,
    y: Math.random() * h * 1.5 - h * 0.25,
    width: 30 + Math.random() * 60,
    length: h * 2.2,
    angle,
    speed: 0.5 + Math.random() * 1.0,
    opacity: 0.1 + Math.random() * 0.14,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.015 + Math.random() * 0.02,
  };
}

function BeamsBackground({ className, intensity = 'strong' }: BeamsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  const opacityMap: Record<Intensity, number> = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  };

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, CAP_DPR);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scale = (w * h) / (1280 * 720);
      const total = Math.max(10, Math.min(28, Math.round(BASE_BEAMS * scale)));
      beamsRef.current = Array.from({ length: total }, () => createBeam(w, h));
    };

    const resetBeam = (b: Beam, i: number, total: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, CAP_DPR);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const col = i % 3;
      const spacing = w / 3;
      b.y = h + 100;
      b.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      b.width = 80 + Math.random() * 90;
      b.speed = 0.45 + Math.random() * 0.4;
      b.hue = 190 + (i * 70) / total;
      b.opacity = 0.16 + Math.random() * 0.08;
      return b;
    };

    const drawBeam = (b: Beam) => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.angle * Math.PI) / 180);

      const alpha = b.opacity * (0.85 + Math.sin(b.pulse) * 0.15) * opacityMap[intensity];
      const g = ctx.createLinearGradient(0, 0, 0, b.length);
      g.addColorStop(0, `hsla(${b.hue},85%,65%,0)`);
      g.addColorStop(0.12, `hsla(${b.hue},85%,65%,${alpha * 0.5})`);
      g.addColorStop(0.45, `hsla(${b.hue},85%,65%,${alpha})`);
      g.addColorStop(0.88, `hsla(${b.hue},85%,65%,${alpha * 0.4})`);
      g.addColorStop(1, `hsla(${b.hue},85%,65%,0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-b.width / 2, 0, b.width, b.length);
      ctx.restore();
    };

    const animate = (ts: number) => {
      if (ts - lastRef.current < 1000 / TARGET_FPS) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastRef.current = ts;

      const dpr = Math.min(window.devicePixelRatio || 1, CAP_DPR);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);
      ctx.filter = 'blur(18px)';

      const total = beamsRef.current.length;
      for (let i = 0; i < total; i++) {
        const b = beamsRef.current[i];
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;
        if (b.y + b.length < -100) resetBeam(b, i, total);
        drawBeam(b);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      setup();
      rafRef.current = requestAnimationFrame(animate);
    };

    setup();

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      const dpr = Math.min(window.devicePixelRatio || 1, CAP_DPR);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      beamsRef.current.forEach(drawBeam);
    }

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [intensity]);

  return (
    <div className={cn('relative min-h-[90vh] w-full overflow-hidden bg-neutral-950', className)}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'blur(8px)' }} />
      <div className="absolute inset-0" style={{ backdropFilter: 'blur(10px)' }} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      <BeamsBackground intensity="strong" className="min-h-[90vh]" />
      <div className="absolute inset-0 z-10 grid place-items-center">
        <div className="px-6 text-center">
          <motion.h1
            className="whitespace-nowrap text-[clamp(28px,8vw,80px)] font-semibold tracking-tight text-white"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Hi, I am Muhamad Alfabel
          </motion.h1>

          <motion.p
            className="mt-6 text-white/70 text-[clamp(14px,2.2vw,24px)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Informatics Engineering Student at Jakarta State Polytechnic
          </motion.p>

          {/* ⬇️ tombol dipindah ke hero, center di bawah subjudul */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InteractiveHoverButton
              href="/subjects"       // ganti ke anchor/route yang kamu mau
              size="lg"
              variant="light"
              className="mx-auto"
            >
              <span className="font-semibold">Learn More</span>
            </InteractiveHoverButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
