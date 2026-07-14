"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";
import { fadeUp, slideIn } from "@/lib/motion";
import { TiltCard } from "./TiltCard";
import { SectionHeading } from "./SectionHeading";

export function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="bg-ivory px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <SectionHeading accent={t("story.accent")} title={t("story.title")} />
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg"
        >
          {weddingConfig.storyText}
        </motion.p>
        <div
          className={`grid w-full gap-4 sm:gap-6 ${
            weddingConfig.storyImages.length === 1
              ? "mx-auto max-w-sm grid-cols-1"
              : "grid-cols-2"
          }`}
          style={{ perspective: 1000 }}
        >
          {weddingConfig.storyImages.map((src, i) => (
            <motion.div
              key={src}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideIn(i === 0 ? "left" : "right")}
            >
              <TiltCard className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-blush shadow-md">
                <Image
                  src={src}
                  alt={`${t("story.title")} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
