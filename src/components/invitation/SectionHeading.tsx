"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

// Decorative heading used by every section: a small script accent line,
// the serif title, and a flourish divider underneath.
export function SectionHeading({
  accent,
  title,
}: {
  accent?: string;
  title: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className="flex flex-col items-center gap-2 text-center"
    >
      {accent && (
        <span className="font-script text-2xl text-gold sm:text-3xl">{accent}</span>
      )}
      <h2 className="font-serif text-3xl text-rose-dark sm:text-4xl">{title}</h2>
      <div className="mt-2 flex items-center gap-3 text-gold" aria-hidden>
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-16" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-16" />
      </div>
    </motion.div>
  );
}
