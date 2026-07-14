export type Locale = "en" | "si";

// NOTE: the "si" block below is currently just a copy of the English text.
// When real Sinhala translations are ready, replace the strings inside the
// "si" object only — the app code never needs to change.
export const translations = {
  en: {
    languageName: "English",
    calendar: {
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
      weekdays: [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      ],
      // {weekday} {month} {day} {year} get replaced with the real values.
      dateTemplate: "{weekday}, {month} {day}, {year}",
      am: "AM",
      pm: "PM",
      timeTemplate: "{h}:{mm} {ampm}",
    },
    nav: { story: "Our Story", details: "Details", rsvp: "RSVP" },
    hero: {
      greetingNamed: "Dear {name},",
      greetingGeneric: "You're Invited",
      inviteLine: "we warmly invite you to celebrate our wedding",
      scrollHint: "Scroll down",
    },
    countdown: {
      title: "Counting down to our big day",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    music: { play: "Play music", pause: "Pause music" },
    story: { title: "Our Story", accent: "how it began" },
    details: {
      title: "Event Details",
      accent: "save the date",
      date: "Date",
      time: "Time",
      venue: "Venue",
      getDirections: "Get Directions",
    },
    rsvp: {
      title: "RSVP",
      accent: "will you join us?",
      nameLabel: "Your Name",
      namePlaceholder: "Your full name",
      wishPlaceholder: "Write a little note for us...",
      attendingQuestion: "Will you be attending?",
      yes: "Joyfully Accept",
      no: "Regretfully Decline",
      wishLabel: "Leave a wish for the couple (optional)",
      submit: "Send RSVP",
      submitting: "Sending...",
      seatsHint: "You have {seats} seat(s) reserved for you.",
      thankYouTitleAttending: "Thank You!",
      thankYouTitleDeclined: "Thank You for Letting Us Know",
      thankYouAttending: "We can't wait to celebrate with you!",
      thankYouDeclined: "We'll miss you, but we appreciate you telling us.",
      errorGeneric: "Something went wrong. Please try again.",
      nameRequired: "Please tell us your name.",
    },
  },
  si: {
    languageName: "සිංහල",
    calendar: {
      months: [
        "ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි",
        "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්",
      ],
      weekdays: [
        "ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා",
      ],
      dateTemplate: "{year} {month} {day}, {weekday}",
      am: "පෙ.ව.",
      pm: "ප.ව.",
      timeTemplate: "{ampm} {h}:{mm}",
    },
    nav: { story: "අපේ කතාව", details: "විස්තර", rsvp: "පිළිතුර" },
    hero: {
      greetingNamed: "ආදරණීය {name},",
      greetingGeneric: "ඔබට ආරාධනා",
      inviteLine: "අපගේ විවාහ මංගල්‍යය සැමරීමට ඔබට සාදරයෙන් ආරාධනා කරමු",
      scrollHint: "පහළට යන්න",
    },
    countdown: {
      title: "අපේ සුවිශේෂී දවසට තව",
      days: "දින",
      hours: "පැය",
      minutes: "මිනිත්තු",
      seconds: "තත්පර",
    },
    music: { play: "සංගීතය වාදනය", pause: "සංගීතය නවත්වන්න" },
    story: { title: "අපේ කතාව", accent: "එය ඇරඹුණු හැටි" },
    details: {
      title: "උත්සව විස්තර",
      accent: "දිනය මතක තබාගන්න",
      date: "දිනය",
      time: "වේලාව",
      venue: "ස්ථානය",
      getDirections: "මග පෙන්වීම",
    },
    rsvp: {
      title: "පැමිණීම දන්වන්න",
      accent: "ඔබ අප හා එක්වනවාද?",
      nameLabel: "ඔබේ නම",
      namePlaceholder: "ඔබේ සම්පූර්ණ නම",
      wishPlaceholder: "අපට කුඩා පණිවිඩයක් ලියන්න...",
      attendingQuestion: "ඔබ සහභාගී වනවාද?",
      yes: "සතුටින් එක්වෙමි",
      no: "කණගාටුයි, බැහැ",
      wishLabel: "යුවළට සුබ පැතුමක් තබන්න (අත්‍යවශ්‍ය නොවේ)",
      submit: "පිළිතුර යවන්න",
      submitting: "යවමින්...",
      seatsHint: "ඔබ වෙනුවෙන් ආසන {seats} ක් වෙන් කර ඇත.",
      thankYouTitleAttending: "ස්තූතියි!",
      thankYouTitleDeclined: "දැනුම් දුන්නාට ස්තූතියි",
      thankYouAttending: "ඔබ සමඟ සැමරීමට අපි නොඉවසිල්ලෙන් බලා සිටිමු!",
      thankYouDeclined: "ඔබ නැතුව අඩුවක් දැනේවි — දැනුම් දුන්නාට ස්තූතියි.",
      errorGeneric: "යමක් වැරදුණා. කරුණාකර නැවත උත්සාහ කරන්න.",
      nameRequired: "කරුණාකර ඔබේ නම ඇතුළත් කරන්න.",
    },
  },
} as const satisfies Record<Locale, unknown>;

export type TranslationDict = typeof translations.en;
