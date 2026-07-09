"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";
import { Countdown } from "./Countdown";
import { staggerContainer, fadeUp } from "@/lib/motion";
import type { Guest } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function Hero({ guest }: { guest: Guest | null }) {
  const { t } = useLanguage();
  const weddingDate = new Date(weddingConfig.weddingDateISO);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Background photo drifts and zooms slightly slower than the scroll,
  // and the whole hero fades out — the classic parallax "depth" effect.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-rose-dark px-6 py-24 text-center"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src={weddingConfig.heroImage}
          alt={`${weddingConfig.partner1Name} & ${weddingConfig.partner2Name}`}
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ opacity: contentOpacity, y: contentY }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm uppercase tracking-[0.3em] text-gold-light"
        >
          {guest
            ? t("hero.greetingNamed", { name: guest.name })
            : t("hero.greetingGeneric")}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-script text-6xl leading-tight text-white sm:text-8xl"
        >
          {weddingConfig.partner1Name}
          <span className="mx-3 text-gold-light">&amp;</span>
          {weddingConfig.partner2Name}
        </motion.h1>

        <motion.p variants={fadeUp} className="max-w-md text-base text-white/90 sm:text-lg">
          {t("hero.inviteLine")}
        </motion.p>

        <motion.div variants={fadeUp} className="font-serif text-lg text-white sm:text-xl">
          {dateFormatter.format(weddingDate)}
        </motion.div>
        <motion.div variants={fadeUp} className="text-sm text-white/80">
          {weddingConfig.venueName}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6">
          <Countdown />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-white/80">
        <span className="text-xs uppercase tracking-widest">{t("hero.scrollHint")}</span>
        <span className="animate-bounce text-lg" aria-hidden>
          ↓
        </span>
      </div>
    </section>
  );
}
