"use client";

import * as React from "react";
import { motion } from "framer-motion";

type BlurredStaggerProps = {
  text: string;                 
  className?: string;           
  stagger?: number;             
  delay?: number;               
};

export default function BlurredStagger({
  text,
  className,
  stagger = 0.02,
  delay = 0,
}: BlurredStaggerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: stagger,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show:   { opacity: 1, filter: "blur(0px)" },
  };

  // dukung baris baru pakai "\n"
  const lines = text.split("\n");

  return (
    <div className={className}>
      {lines.map((ln, i) => (
        <motion.h1 key={i} variants={container} initial="hidden" animate="show">
          {ln.split("").map((ch, idx) => (
            <motion.span key={idx} variants={letter} transition={{ duration: 0.3 }}>
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.h1>
      ))}
    </div>
  );
}
