"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "si" : "en")}
      className="fixed bottom-5 left-5 z-50 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-rose-dark shadow-lg backdrop-blur-sm transition hover:bg-white"
    >
      {locale === "en" ? "සිංහල" : "English"}
    </button>
  );
}
