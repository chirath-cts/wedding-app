"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";
import { Countdown } from "./Countdown";
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

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-rose-dark px-6 py-24 text-center"
    >
      <div className="absolute inset-0">
        <Image
          src={weddingConfig.heroImage}
          alt={`${weddingConfig.partner1Name} & ${weddingConfig.partner2Name}`}
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-[0.3em] text-gold-light">
          {guest
            ? t("hero.greetingNamed", { name: guest.name })
            : t("hero.greetingGeneric")}
        </p>

        <h1 className="font-script text-6xl leading-tight text-white sm:text-8xl">
          {weddingConfig.partner1Name}
          <span className="mx-3 text-gold-light">&amp;</span>
          {weddingConfig.partner2Name}
        </h1>

        <p className="max-w-md text-base text-white/90 sm:text-lg">
          {t("hero.inviteLine")}
        </p>

        <div className="font-serif text-lg text-white sm:text-xl">
          {dateFormatter.format(weddingDate)}
        </div>
        <div className="text-sm text-white/80">{weddingConfig.venueName}</div>

        <div className="mt-6">
          <Countdown />
        </div>
      </div>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-1 text-white/80">
        <span className="text-xs uppercase tracking-widest">{t("hero.scrollHint")}</span>
        <span className="animate-bounce text-lg" aria-hidden>
          ↓
        </span>
      </div>
    </section>
  );
}
