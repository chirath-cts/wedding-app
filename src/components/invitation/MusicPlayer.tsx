"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { weddingConfig } from "@/lib/config";

export function MusicPlayer() {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <audio ref={audioRef} src={weddingConfig.musicSrc} loop preload="none" />
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
