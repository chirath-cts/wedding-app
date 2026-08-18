"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MusicPlayer({ musicSrc }: { musicSrc: string }) {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    const events: Array<keyof DocumentEventMap> = ["pointerdown", "keydown"];

    const tryStartOnInteraction = () => {
      audio.play().then(() => {
        if (!cancelled) setIsPlaying(true);
      }).catch(() => {});
    };

    // Browsers block audio-with-sound until the visitor has interacted with
    // the page, so a true autoplay attempt here will usually be rejected.
    // If it is, fall back to starting on the very first tap/click/keypress
    // anywhere on the page — as close to "on by default" as the platform
    // allows, without needing the guest to find the music button.
    audio.play().then(
      () => {
        if (!cancelled) setIsPlaying(true);
      },
      () => {
        events.forEach((event) => document.addEventListener(event, tryStartOnInteraction, { once: true }));
      }
    );

    return () => {
      cancelled = true;
      events.forEach((event) => document.removeEventListener(event, tryStartOnInteraction));
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-rose-dark/90 px-4 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-rose-dark"
        aria-pressed={isPlaying}
      >
        <span aria-hidden>{isPlaying ? "⏸️" : "🎵"}</span>
        <span className="hidden sm:inline">
          {isPlaying ? t("music.pause") : t("music.play")}
        </span>
      </button>
    </>
  );
}
