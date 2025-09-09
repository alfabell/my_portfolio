"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex w-16 h-8 p-1 items-center rounded-full border transition-all duration-300",
        "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* track */}
      <div className="relative w-full h-6">
        {/* knob kiri/kanan */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-6 h-6 items-center justify-center rounded-full transition-transform duration-300 bg-gray-100 dark:bg-gray-600",
            isDark ? "translate-x-0" : "translate-x-8"
          )}
        >
          {isDark ? (
            <Moon
              className="w-4 h-4 text-gray-900 dark:text-white"
              strokeWidth={1.5}
            />
          ) : (
            <Sun
              className="w-4 h-4 text-gray-900 dark:text-white"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </button>
  );
}
