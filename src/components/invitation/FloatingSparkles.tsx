"use client";

import { motion } from "framer-motion";

// Soft golden sparkles that drift upward across the hero photo, echoing
// the bokeh lights already in the picture.
export function FloatingSparkles() {
  const sparkles = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: (i * 0.6) % 8,
    duration: 7 + (i % 5),
    size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gold-light"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            bottom: "-5%",
            boxShadow: "0 0 6px 2px rgba(230, 211, 163, 0.55)",
          }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
