'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // <- pastikan sudah: pnpm add framer-motion
import { cn } from '@/lib/utils';

type Intensity = 'subtle' | 'medium' | 'strong';

interface AnimatedGradientBackgroundProps {
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

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

function BeamsBackground({
  className,
  intensity = 'strong',
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;

  const opacityMap: Record<Intensity, number> = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // hindari scale bertumpuk

      const totalBeams = Math.floor(MINIMUM_BEAMS * 1.5);
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(w, h),
      );
    };

    const resetBeam = (beam: Beam, index: number, total: number) => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const column = index % 3;
      const spacing = w / 3;

      beam.y = h + 100;
      beam.x =
        column * spacing +
        spacing / 2 +
        (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + (index * 70) / total;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const grad = ctx.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
      grad.addColorStop(0.1, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
      grad.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
      grad.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
      grad.addColorStop(0.9, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
      grad.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);

      ctx.fillStyle = grad;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);
      ctx.filter = 'blur(35px)';

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

    updateCanvas();
    animate();
    window.addEventListener('resize', updateCanvas);

    return () => {
      window.removeEventListener('resize', updateCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <div className={cn('relative min-h-[80vh] w-full overflow-hidden bg-neutral-950', className)}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'blur(15px)' }} />
      <motion.div
        className="absolute inset-0 bg-neutral-950/5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        style={{ backdropFilter: 'blur(50px)' }}
      />
      {/** children/overlay ditaruh di luar komponen ini di bawah */}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative">
      <BeamsBackground intensity="strong" className="min-h-[90vh]" />
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="pointer-events-auto mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            className="text-5xl font-semibold tracking-tighter text-white md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Hi, Welcome to My Website!
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-white/70 md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Built with Next.js & Tailwind — smooth beams background like 21st.dev ✨
          </motion.p>
        </div>
      </div>
    </section>
  );
}
