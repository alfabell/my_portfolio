"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "destructive";
type Size = "sm" | "default" | "lg";

const base =
  "inline-flex w-auto items-center justify-center select-none whitespace-nowrap rounded-md text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0";

const variantClass: Record<Variant, string> = {
  default:
    "bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white shadow-md hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700",
  success:
    "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-md hover:from-emerald-500 hover:to-emerald-700",
  destructive:
    "bg-gradient-to-b from-red-400 to-red-600 text-white shadow-md hover:from-red-500 hover:to-red-700",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  default: "px-4 py-2",
  lg: "px-6 py-3 text-base",
};

export interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const MetalButton = React.forwardRef<
  HTMLButtonElement,
  MetalButtonProps
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...props}
    />
  );
});
MetalButton.displayName = "MetalButton";
