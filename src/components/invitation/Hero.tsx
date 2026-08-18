"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { formatWeddingDate } from "@/lib/i18n/dates";
import { Countdown } from "./Countdown";
import { FloatingSparkles } from "./FloatingSparkles";
import { staggerContainer, fadeUp } from "@/lib/motion";
import type { Guest, SiteSettings } from "@/lib/types";

export function Hero({ guest, settings }: { guest: Guest | null; settings: SiteSettings }) {
  const { t, locale } = useLanguage();
  const weddingDate = new Date(settings.weddingDateISO);
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
          src={settings.heroImage}
          alt={`${settings.partner1Name} & ${settings.partner2Name}`}
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </motion.div>

      <FloatingSparkles />

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
          className="relative font-script text-6xl leading-tight sm:text-8xl"
        >
          <span className="name-shimmer">{settings.partner1Name}</span>
          <span className="relative mx-3 inline-block text-gold-light">
            <motion.span
              className="absolute inset-0 -z-10 rounded-full bg-gold-light/40 blur-xl"
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            &amp;
          </span>
          <span className="name-shimmer">{settings.partner2Name}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="max-w-md text-base text-white/90 sm:text-lg">
          {t("hero.inviteLine")}
        </motion.p>

        <motion.div variants={fadeUp} className="font-serif text-lg text-white sm:text-xl">
          {formatWeddingDate(locale, weddingDate)}
        </motion.div>
        <motion.div variants={fadeUp} className="text-sm text-white/80">
          {settings.venueName}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6">
          <Countdown weddingDateISO={settings.weddingDateISO} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-white/80">
        <span className="text-xs uppercase tracking-widest">{t("hero.scrollHint")}</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1.5" aria-hidden>
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-gold-light"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
