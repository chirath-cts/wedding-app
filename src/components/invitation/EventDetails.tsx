"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { formatWeddingDate, formatWeddingTime } from "@/lib/i18n/dates";
import { weddingConfig } from "@/lib/config";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

// Gold line icons for the three info cards.
function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Builds a Google Calendar "add event" link from the wedding config.
function buildCalendarUrl(): string {
  const start = new Date(weddingConfig.weddingDateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // assume ~4h celebration
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${weddingConfig.partner1Name} & ${weddingConfig.partner2Name} — Wedding`,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function EventDetails() {
  const { t, locale } = useLanguage();
  const weddingDate = new Date(weddingConfig.weddingDateISO);
  const mapQuery = encodeURIComponent(
    `${weddingConfig.venueName}, ${weddingConfig.venueAddress}`
  );
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;
  const mapDirectionsUrl = `https://maps.google.com/?q=${mapQuery}`;

  const cards = [
    { icon: <CalendarIcon />, label: t("details.date"), value: formatWeddingDate(locale, weddingDate) },
    { icon: <ClockIcon />, label: t("details.time"), value: formatWeddingTime(locale, weddingDate) },
    { icon: <PinIcon />, label: t("details.venue"), value: weddingConfig.venueName },
  ];

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-gradient-to-b from-blush/50 via-blush to-blush px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Soft decorative glows */}
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-rose/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      {/* Gently floating accents */}
      <motion.span
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[8%] top-24 text-3xl opacity-40"
        aria-hidden
      >
        💍
      </motion.span>
      <motion.span
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="pointer-events-none absolute bottom-28 left-[7%] text-2xl opacity-40"
        aria-hidden
      >
        ✨
      </motion.span>

      <div className="mx-auto max-w-4xl">
        <SectionHeading accent={t("details.accent")} title={t("details.title")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-14 flex flex-col items-center gap-10"
        >
          {/* Info cards */}
          <motion.div
            variants={staggerContainer}
            className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {cards.map((card) => (
              <motion.div
                key={card.label}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-3 rounded-3xl border border-gold/25 bg-white/85 px-4 py-6 text-center shadow-lg shadow-rose/5 backdrop-blur-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold-light/60 to-gold/30 text-rose-dark">
                  {card.icon}
                </span>
                <span className="text-xs uppercase tracking-widest text-rose">
                  {card.label}
                </span>
                <span className="font-serif text-charcoal leading-snug">{card.value}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm text-charcoal/70">
            {weddingConfig.venueAddress}
          </motion.p>

          {/* Map in a gold invitation-card frame */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-2xl rounded-3xl border border-gold/30 bg-white/90 p-1.5 shadow-xl shadow-rose/10"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-gold/40">
              <div className="aspect-video w-full">
                <iframe
                  src={mapEmbedSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={weddingConfig.venueName}
                />
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-gradient-to-r from-rose-dark via-rose to-rose-dark bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-rose/30 transition-all hover:bg-right"
            >
              {t("details.getDirections")}
            </motion.a>
            <motion.a
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="rounded-full border-2 border-rose/50 bg-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-widest text-rose-dark backdrop-blur-sm transition hover:border-rose hover:bg-white"
            >
              {t("details.addToCalendar")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
