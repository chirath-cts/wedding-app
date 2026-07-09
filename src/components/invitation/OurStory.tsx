"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";

export function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="bg-ivory px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <h2 className="font-serif text-3xl text-rose-dark sm:text-4xl">
          {t("story.title")}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
          {weddingConfig.storyText}
        </p>
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6">
          {weddingConfig.storyImages.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-blush shadow-md"
            >
              <Image
                src={src}
                alt={`${t("story.title")} ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
