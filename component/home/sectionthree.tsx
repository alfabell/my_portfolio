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
    desc:
      "Developed and implemented automation tools & data processing solutions.",
  },
];

const EDUCATION: Item[] = [
  {
    title: "Informatics and Computer Engineering",
    period: "2022 – Present",
    org: "Jakarta State Polytechnic",
    desc:
      "Department of Informatics Engineering, studying Computer Science.",
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
    <ul className="pl-0">
      {items.map((it, idx) => (
        <li key={idx} className="pb-8 last:pb-0">
          <h4 className="text-lg font-semibold text-[#34d399]">
            {it.title}
          </h4>
          <p className="mt-1 text-sm text-zinc-400">{it.period}</p>
          <p className="mt-2 font-medium text-zinc-100 dark:text-white">
            {it.org}
          </p>
          {it.desc && (
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {it.desc}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function SectionThreeResume() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Judul Utama Resume */}
        <h2 className="text-center text-4xl font-bold text-white mb-12">
          Resume
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseBusiness className="h-5 w-5 text-zinc-400" />
              <h3 className="text-2xl font-semibold text-zinc-100">
                Experience
              </h3>
            </div>
            <TimelineList items={EXPERIENCE} />
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-5 w-5 text-zinc-400" />
              <h3 className="text-2xl font-semibold text-zinc-100">
                Education
              </h3>
            </div>
            <TimelineList items={EDUCATION} />
          </div>
        </div>
      </div>
    </section>
  );
}
