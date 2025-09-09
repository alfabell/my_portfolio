"use client";

import Link from "next/link";
import { ReactNode, useRef } from "react";

type Variant = "dark" | "light";
type Size = "sm" | "md" | "lg";

export function InteractiveHoverButton({
  href = "#",
  children,
  variant = "dark",
  size = "md",
  className,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const cx = (...v: (string | undefined | false)[]) =>
    v.filter(Boolean).join(" ");

  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-12 px-7 text-base",
  };

  // Tombol light/dark dengan Tailwind standar
  const fills: Record<Variant, string> = {
    dark: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700",
    light:
      "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100",
  };

  const glowRef = useRef<HTMLSpanElement>(null);

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current?.style.setProperty("--x", `${x}px`);
    glowRef.current?.style.setProperty("--y", `${y}px`);
  }

  // Glow kontras otomatis berdasarkan variant
  const isLight = variant === "light";
  const glowClass = isLight
    ? // LIGHT: gelapkan di atas tombol putih (sedikit tint biru brand untuk karakter)
      "mix-blend-multiply bg-[radial-gradient(circle_at_center,rgba(33,91,168,.22),transparent_70%)]"
    : // DARK: cerahkan di atas tombol gelap
      "mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(255,255,255,.45),transparent_70%)]";

  return (
    <Link
      href={href}
      onMouseMove={handleMove}
      className={cx(
        "group inline-flex rounded-full p-[2px] transition",
        "bg-[linear-gradient(90deg,#374151_0%,#6b7280_50%,#9ca3af_100%)]",
        "hover:brightness-110 active:brightness-95",
        className
      )}
    >
      <span
        className={cx(
          "relative inline-flex items-center justify-center gap-2 rounded-full",
          "ring-1 ring-black/10 overflow-hidden",
          sizes[size],
          fills[variant]
        )}
      >
        {/* hover glow mengikuti posisi cursor */}
        <span
          ref={glowRef}
          aria-hidden
          className={cx(
            "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full z-0",
            "w-64 h-64 opacity-0 group-hover:opacity-100",
            "transition-[opacity,transform] duration-200 group-hover:scale-110 transform",
            glowClass
          )}
          style={{ left: "var(--x)", top: "var(--y)" } as React.CSSProperties}
        />
        <span className="relative z-10">{children}</span>
        {/* panah */}
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden
          className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="currentColor"
        >
          <path d="M13 5l7 7-7 7v-4H4v-6h9V5z" />
        </svg>
      </span>
    </Link>
  );
}

export default InteractiveHoverButton;
