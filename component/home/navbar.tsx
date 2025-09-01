"use client";

import Image from "next/image"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/component/ui/theme-toggle";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  { label: "HOME", href: "/home" },
  { label: "ABOUT", href: "/about" },
  {
    label: "RESUME",
    href: "/resume",
  },
  {
    label: "PORTFOLIO",
    href: "/portfolio",
  },
  { label: "CERTIFICATIONS", href: "/certifications" },

  { label: "CONTACT"
    

  },
];

export default function Navbar() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#32170d] text-white border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-4">
          {/* brand */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold h-14"
          >
            <span className="hidden sm:inline">Muhamad Alfabel</span>
          </Link>

          {/* desktop menu */}
          <ul className="hidden md:flex items-stretch gap-1">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label} className="relative group">
                  <button
                    className={[
                      "relative h-14 px-3 text-sm transition inline-flex items-center gap-1",
                      "text-white",
                      "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:origin-center",
                      pathname?.startsWith(item.href ?? "")
                        ? "after:scale-x-100"
                        : "after:scale-x-0 group-hover:after:scale-x-100",
                    ].join(" ")}
                  >
                    {item.label}
                    <ChevronDown className="transition-transform group-hover:rotate-180" />
                  </button>

                  {/* dropdown */}
                  <div
                    className="absolute left-0 top-full mt-1 min-w-[240px] rounded-xl border border-white/10
                               bg-[#1A4682] shadow-lg ring-1 ring-black/5 opacity-0 translate-y-1
                               pointer-events-none transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                  >
                    <ul className="py-2">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={[
                              "block px-3 py-2 text-sm rounded-md",
                              "text-white",
                              pathname?.startsWith(c.href)
                                ? "bg-white/15"
                                : "hover:bg-white/10",
                            ].join(" ")}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href ?? "#"}
                    className={[
                      "relative inline-flex h-14 items-center px-3 text-sm transition",
                      "text-white",
                      "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:transition-transform after:origin-center",
                      pathname === item.href
                        ? "after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle className="mr-1" />
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpenMobile((v) => !v)}
            className="md:hidden rounded p-2 hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={openMobile}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </nav>

        {/* mobile menu */}
        {openMobile && (
          <div className="md:hidden pb-4">
            <ul className="space-y-1 text-sm">
              {NAV.map((item) =>
                item.children ? (
                  <li key={item.label} className="rounded-md">
                    <button
                      onClick={() =>
                        setOpenKeys((s) => ({
                          ...s,
                          [item.label]: !s[item.label],
                        }))
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-white/10 text-white"
                    >
                      <span className="text-white">{item.label}</span>
                      <ChevronDown
                        className={[
                          "transition-transform",
                          openKeys[item.label] ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>

                    <div
                      className={[
                        "grid overflow-hidden transition-[grid-template-rows] duration-200",
                        openKeys[item.label]
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]",
                      ].join(" ")}
                    >
                      <div className="min-h-0">
                        <ul className="px-1 pb-2 space-y-1">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setOpenMobile(false)}
                                className="block rounded px-3 py-2 text-white hover:bg-white/10"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      onClick={() => setOpenMobile(false)}
                      className="block rounded px-3 py-2 text-white hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="mt-3 flex justify-end">
              <ThemeToggle />
            </div>

            <div className="mt-3 flex gap-2">
              <Link
                href="#"
                className="flex-1 text-center rounded-md px-3 py-2 text-sm border border-white/15 bg-white/10 hover:bg-white/20 text-white"
              >
                Login
              </Link>
              <Link
                href="#"
                className="flex-1 text-center rounded-md px-3 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90"
              >
                Sign-up Now →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
