import { translations, type Locale } from "./translations";

// Formats dates from our own dictionary instead of the browser's Intl,
// because not every device ships Sinhala locale data — Intl silently
// falls back to English on those, while this always renders correctly.

export function formatWeddingDate(locale: Locale, date: Date): string {
  const cal = translations[locale].calendar;
  return cal.dateTemplate
    .replace("{weekday}", cal.weekdays[date.getDay()])
    .replace("{month}", cal.months[date.getMonth()])
    .replace("{day}", String(date.getDate()))
    .replace("{year}", String(date.getFullYear()));
}

export function formatWeddingTime(locale: Locale, date: Date): string {
  const cal = translations[locale].calendar;
  const hours24 = date.getHours();
  const h = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours24 < 12 ? cal.am : cal.pm;
  return cal.timeTemplate
    .replace("{h}", String(h))
    .replace("{mm}", mm)
    .replace("{ampm}", ampm);
}
