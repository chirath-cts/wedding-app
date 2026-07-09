"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetIso: string): TimeLeft {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

export function Countdown() {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Syncing with the system clock (an external source), not deriving from
    // props/state — the documented exception to "don't setState in effects".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft(weddingConfig.weddingDateISO));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(weddingConfig.weddingDateISO));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units: Array<[number, string]> = timeLeft
    ? [
        [timeLeft.days, t("countdown.days")],
        [timeLeft.hours, t("countdown.hours")],
        [timeLeft.minutes, t("countdown.minutes")],
        [timeLeft.seconds, t("countdown.seconds")],
      ]
    : [
        [0, t("countdown.days")],
        [0, t("countdown.hours")],
        [0, t("countdown.minutes")],
        [0, t("countdown.seconds")],
      ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm uppercase tracking-widest text-gold-light/90">
        {t("countdown.title")}
      </p>
      <div className="flex gap-3 sm:gap-5">
        {units.map(([value, label]) => (
          <div
            key={label}
            className="flex w-16 flex-col items-center rounded-xl bg-white/10 py-3 backdrop-blur-sm sm:w-20"
          >
            <span className="font-serif text-2xl font-semibold text-white sm:text-3xl tabular-nums">
              {String(value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-wide text-white/80 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
