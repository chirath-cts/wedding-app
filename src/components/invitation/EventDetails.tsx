"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export function EventDetails() {
  const { t } = useLanguage();
  const weddingDate = new Date(weddingConfig.weddingDateISO);
  const mapQuery = encodeURIComponent(
    `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`
  );
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const mapDirectionsUrl = `https://maps.google.com/?q=${mapQuery}`;

  return (
    <section id="details" className="bg-blush px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <h2 className="font-serif text-3xl text-rose-dark sm:text-4xl">
          {t("details.title")}
        </h2>

        <div className="grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-widest text-rose">{t("details.date")}</p>
            <p className="mt-1 font-serif text-charcoal">{dateFormatter.format(weddingDate)}</p>
          </div>
          <div className="rounded-xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-widest text-rose">{t("details.time")}</p>
            <p className="mt-1 font-serif text-charcoal">{timeFormatter.format(weddingDate)}</p>
          </div>
          <div className="rounded-xl bg-white/70 p-4">
            <p className="text-xs uppercase tracking-widest text-rose">{t("details.venue")}</p>
            <p className="mt-1 font-serif text-charcoal">{weddingConfig.venueName}</p>
          </div>
        </div>

        <p className="text-sm text-charcoal/70">{weddingConfig.venueAddress}</p>

        <div className="aspect-video w-full max-w-2xl overflow-hidden rounded-2xl shadow-md">
          <iframe
            src={mapEmbedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={weddingConfig.venueName}
          />
        </div>

        <a
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-rose-dark px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-rose"
        >
          {t("details.getDirections")}
        </a>
      </div>
    </section>
  );
}
