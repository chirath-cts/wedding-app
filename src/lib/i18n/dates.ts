import { translations, type Locale } from "./translations";

// The wedding is in Sri Lanka, so every guest should see the same wall-clock
// date/time no matter what timezone their own device is set to. We resolve
// the Date into Colombo's local calendar fields via Intl instead of the
// Date object's own getDate()/getHours() (which use the *browser's* zone).
const VENUE_TIME_ZONE = "Asia/Colombo";

interface WallTime {
  year: number;
  month: number; // 0-indexed, to match Date's convention
  day: number;
  weekday: number; // 0 = Sunday
  hour: number;
  minute: number;
}

function toVenueWallTime(date: Date): WallTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: VENUE_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    year: Number(get("year")),
    month: Number(get("month")) - 1,
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? 0,
    hour: Number(get("hour")),
    minute: Number(get("minute")),
  };
}

// Formats dates from our own dictionary instead of the browser's Intl,
// because not every device ships Sinhala locale data — Intl silently
// falls back to English on those, while this always renders correctly.

export function formatWeddingDate(locale: Locale, date: Date): string {
  const cal = translations[locale].calendar;
  const wall = toVenueWallTime(date);
  return cal.dateTemplate
    .replace("{weekday}", cal.weekdays[wall.weekday])
    .replace("{month}", cal.months[wall.month])
    .replace("{day}", String(wall.day))
    .replace("{year}", String(wall.year));
}

export function formatWeddingTime(locale: Locale, date: Date): string {
  const cal = translations[locale].calendar;
  const wall = toVenueWallTime(date);
  const h = wall.hour % 12 === 0 ? 12 : wall.hour % 12;
  const mm = String(wall.minute).padStart(2, "0");
  const ampm = wall.hour < 12 ? cal.am : cal.pm;
  return cal.timeTemplate
    .replace("{h}", String(h))
    .replace("{mm}", mm)
    .replace("{ampm}", ampm);
}

// For pre-filling a <input type="datetime-local"> with the venue's local
// wall-clock time (that input type has no timezone concept of its own).
export function isoToVenueLocalInput(iso: string): string {
  const wall = toVenueWallTime(new Date(iso));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${wall.year}-${pad(wall.month + 1)}-${pad(wall.day)}T${pad(wall.hour)}:${pad(wall.minute)}`;
}

// The reverse: a raw "YYYY-MM-DDTHH:mm" value from that input is always in
// the venue's local time, so we pin the Sri Lanka offset explicitly rather
// than letting Date guess based on the server's or browser's own timezone.
export function venueLocalInputToIso(inputValue: string): string {
  return `${inputValue}:00+05:30`;
}
