"use client";

import { LanguageProvider, useLanguage } from "@/lib/i18n/LanguageProvider";
import { MusicPlayer } from "./MusicPlayer";
import { LanguageToggle } from "./LanguageToggle";
import { Hero } from "./Hero";
import { OurStory } from "./OurStory";
import { EventDetails } from "./EventDetails";
import { RsvpSection } from "./RsvpSection";
import type { Guest, SiteSettings } from "@/lib/types";

function TopNav() {
  const { t } = useLanguage();
  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex justify-center gap-6 bg-white/70 py-2.5 text-xs font-medium uppercase tracking-widest text-rose-dark backdrop-blur-sm sm:text-sm">
      <a href="#story" className="transition hover:text-rose">
        {t("nav.story")}
      </a>
      <a href="#details" className="transition hover:text-rose">
        {t("nav.details")}
      </a>
      <a href="#rsvp" className="transition hover:text-rose">
        {t("nav.rsvp")}
      </a>
    </nav>
  );
}

export function InvitationExperience({
  guest,
  settings,
}: {
  guest: Guest | null;
  settings: SiteSettings;
}) {
  return (
    <LanguageProvider>
      <TopNav />
      <MusicPlayer musicSrc={settings.musicSrc} />
      <LanguageToggle />
      <Hero guest={guest} settings={settings} />
      <OurStory settings={settings} />
      <EventDetails settings={settings} />
      <RsvpSection guest={guest} />
    </LanguageProvider>
  );
}
