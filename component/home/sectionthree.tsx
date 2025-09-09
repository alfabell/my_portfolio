"use client";

import { BriefcaseBusiness, GraduationCap } from "lucide-react";

type Item = {
  title: string;
  period: string;
  org: string;
  desc?: string;
};

const EXPERIENCE: Item[] = [
  {
    title:
      "Teaching Assistant of Artificial Intelligence and Basic Data Science",
    period: "Aug 2024 – Present",
    org: "Faculty of Computer Science, Jakarta State Polytechnic",
    desc: "Assisting students with lab questions.",
  },
  {
    title: "Web Developer Intern",
    period: "Aug 2025 – Nov 2025",
    org: "Openlitera",
    desc: "Developed and implemented automation tools & data processing solutions.",
  },
];

const EDUCATION: Item[] = [
  {
    title: "Informatics and Computer Engineering",
    period: "2022 – Present",
    org: "Jakarta State Polytechnic",
    desc: "Department of Informatics Engineering, studying Computer Science.",
  },
  {
    title: "High School of Natural Science",
    period: "2019 – 2022",
    org: "SMAN 3 Depok",
    desc: "Passionate about learning science and competing for new experiences.",
  },
];

// Timeline list tanpa bullet
function TimelineList({ items }: { items: Item[] }) {
  return (
    <ul className="pl-0 space-y-6 sm:space-y-8">
      {items.map((it, idx) => (
        <li key={idx} className="relative">
          <h4 className="text-base sm:text-lg font-semibold text-emerald-500 leading-tight">
            {it.title}
          </h4>
          <p className="mt-1 text-xs sm:text-sm opacity-60">{it.period}</p>
          <p className="mt-2 text-sm sm:text-base font-medium">{it.org}</p>
          {it.desc && (
            <p className="mt-2 text-sm leading-relaxed opacity-70">{it.desc}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function SectionThreeResume() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-black/5 dark:bg-white/5">
      <div className="mx-auto max-w-7xl">
        {/* Judul Utama Resume */}
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12">
          Resume
        </h2>

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <BriefcaseBusiness className="h-5 w-5 opacity-60 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-semibold">Experience</h3>
            </div>
            <TimelineList items={EXPERIENCE} />
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <GraduationCap className="h-5 w-5 opacity-60 flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-semibold">Education</h3>
            </div>
            <TimelineList items={EDUCATION} />
          </div>
        </div>
      </div>
    </section>
  );
}
