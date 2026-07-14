"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";
import { slideIn } from "@/lib/motion";
import { TiltCard } from "./TiltCard";
import { SectionHeading } from "./SectionHeading";

// A photo in a white "polaroid" frame with a gold offset frame behind it.
function FramedPhoto({
  src,
  alt,
  rotate,
  className = "",
}: {
  src: string;
  alt: string;
  rotate: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ perspective: 1000 }}>
      <div
        className={`absolute -inset-2.5 rounded-[2rem] border-2 border-gold/40 ${rotate}`}
        aria-hidden
      />
      <TiltCard
        className={`relative overflow-hidden rounded-[1.5rem] border-[10px] border-white bg-white shadow-2xl shadow-rose/20 ${rotate}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.9rem]">
          <Image src={src} alt={alt} fill className="object-cover" />
        </div>
      </TiltCard>
    </div>
  );
}

export function OurStory() {
  const { t } = useLanguage();
  // Widened from the config's exact tuple type so the two-photo branch
  // still type-checks when only one photo is configured.
  const images: readonly string[] = weddingConfig.storyImages;

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-blush/50 px-6 py-20 sm:py-28"
    >
      {/* Soft decorative glows */}
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-rose/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />
      {/* Gently floating petals */}
      <motion.span
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-24 text-3xl opacity-40"
        aria-hidden
      >
        🌸
      </motion.span>
      <motion.span
        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-24 right-[10%] text-2xl opacity-40"
        aria-hidden
      >
        🌿
      </motion.span>

      <div className="mx-auto max-w-5xl">
        <SectionHeading accent={t("story.accent")} title={t("story.title")} />

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2 md:gap-14">
          {/* Photo side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideIn("left")}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm"
          >
            {images.length >= 2 ? (
              <>
                <FramedPhoto
                  src={images[0]}
                  alt={`${t("story.title")} 1`}
                  rotate="rotate-[-4deg]"
                  className="w-4/5"
                />
                <FramedPhoto
                  src={images[1]}
                  alt={`${t("story.title")} 2`}
                  rotate="rotate-[5deg]"
                  className="z-10 -mt-20 ml-auto w-4/5"
                />
              </>
            ) : (
              <FramedPhoto
                src={images[0]}
                alt={t("story.title")}
                rotate="rotate-[-3deg]"
              />
            )}

            {/* Heart badge overlapping the photo corner */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.4 }}
              className="absolute -right-3 -top-5 z-20 flex h-14 w-14 rotate-6 items-center justify-center rounded-full bg-gradient-to-b from-rose-dark to-rose text-2xl shadow-lg shadow-rose/30"
              aria-hidden
            >
              ❤️
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideIn("right")}
            className="relative text-center md:text-left"
          >
            <span
              className="-mb-8 block font-serif text-7xl leading-none text-gold/30"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="relative text-base leading-loose text-charcoal/80 sm:text-lg">
              {weddingConfig.storyText}
            </p>

            {/* Script signature */}
            <div className="mt-8 flex flex-col items-center gap-1 md:items-start">
              <span className="font-script text-3xl text-rose-dark sm:text-4xl">
                {weddingConfig.partner1Name} &amp; {weddingConfig.partner2Name}
              </span>
              <span className="h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" aria-hidden />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
