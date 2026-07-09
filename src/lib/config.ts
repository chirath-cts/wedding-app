// ============================================================================
// WEDDING CONFIG — edit the values below with your real details.
// This is the ONE file you need to change to personalize the site.
// After editing, save the file and push/redeploy to see changes live.
// ============================================================================

export const weddingConfig = {
  // The two names shown on the hero section, e.g. "Alex" and "Jordan".
  partner1Name: "Alex",
  partner2Name: "Jordan",

  // The wedding date & time, in ISO format: YYYY-MM-DDTHH:MM:SS+offset
  // The "+05:30" part is the Sri Lanka timezone offset — keep it unless
  // your wedding is somewhere else. This drives the live countdown timer.
  weddingDateISO: "2026-12-12T16:00:00+05:30",

  // Shown in the "Event Details" section. The map and "Get Directions"
  // button build themselves automatically from this address — no extra
  // map link to set up.
  venueName: "Cinnamon Grand Colombo",
  venueAddress: "77 Galle Rd, Colombo 00300, Sri Lanka",

  // Photos: drop your image files into the /public/images folder using
  // these exact filenames, and this whole site updates automatically.
  heroImage: "/images/hero.jpg",
  storyImages: ["/images/story-1.jpg", "/images/story-2.jpg"],

  // Short "Our Story" text. Keep it a few sentences — this is a placeholder.
  storyText:
    "We met on a rainy afternoon and knew, somehow, that it was the beginning of something wonderful. Since then, every day has felt like a new chapter in a story we can't wait to keep writing — together. Now, we're ready for the next one, and we would be so happy to have you there with us.",

  // Background music: drop your .mp3 file into /public/audio using this
  // exact filename (or change the filename here to match yours).
  musicSrc: "/audio/song.mp3",
} as const;
