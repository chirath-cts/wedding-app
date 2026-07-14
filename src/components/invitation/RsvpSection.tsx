"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { submitRsvpAction, type RsvpState } from "@/lib/actions/rsvp";
import { fadeUp } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { NumberStepper } from "./NumberStepper";
import type { Guest } from "@/lib/types";

const initialState: RsvpState = { status: "idle" };

// Little hearts that float up from the thank-you card.
function FloatingHearts() {
  const hearts = Array.from({ length: 9 }, (_, i) => ({
    left: `${8 + i * 10}%`,
    delay: 0.2 + (i % 5) * 0.25,
    duration: 2.4 + (i % 3) * 0.7,
    size: i % 3 === 0 ? "text-2xl" : "text-lg",
    emoji: i % 4 === 0 ? "💕" : i % 3 === 0 ? "🌸" : "❤️",
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: [0, 1, 0], y: -220 }}
          transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}
          className={`absolute bottom-0 ${h.size}`}
          style={{ left: h.left }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export function RsvpSection({ guest }: { guest: Guest | null }) {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(submitRsvpAction, initialState);
  const [attending, setAttending] = useState(true);
  const [dietary, setDietary] = useState<"normal" | "vegetarian" | "other">("normal");

  const dietaryLabel = {
    normal: t("rsvp.dietaryNormal"),
    vegetarian: t("rsvp.dietaryVegetarian"),
    other: t("rsvp.dietaryOther"),
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-to-b from-blush to-ivory px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Soft decorative glows behind the card */}
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
        aria-hidden
      />

      <div className="mx-auto max-w-lg">
        <SectionHeading accent={t("rsvp.accent")} title={t("rsvp.title")} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="relative mt-10 rounded-3xl border border-gold/30 bg-white/90 p-1.5 shadow-xl shadow-rose/10 backdrop-blur-sm"
        >
          {/* Inner hairline frame for the invitation-card feel */}
          <div className="relative rounded-[1.25rem] border border-gold/40 px-5 py-8 sm:px-8">
            <AnimatePresence mode="wait">
              {state.status === "success" ? (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex flex-col items-center gap-4 py-8 text-center"
                >
                  <FloatingHearts />
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                    className="text-6xl"
                    aria-hidden
                  >
                    {state.attending ? "💐" : "🤍"}
                  </motion.span>
                  <h3 className="font-script text-4xl text-rose-dark">
                    {state.attending
                      ? t("rsvp.thankYouTitleAttending")
                      : t("rsvp.thankYouTitleDeclined")}
                  </h3>
                  <p className="max-w-xs text-charcoal/80">
                    {state.attending ? t("rsvp.thankYouAttending") : t("rsvp.thankYouDeclined")}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  action={formAction}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <input type="hidden" name="inviteCode" value={guest?.invite_code ?? ""} />
                  <input type="hidden" name="attending" value={attending ? "yes" : "no"} />

                  {guest ? (
                    <p className="rounded-2xl bg-blush/70 px-4 py-3 text-center text-sm text-rose-dark">
                      {t("rsvp.seatsHint", { seats: guest.seats_invited })}
                    </p>
                  ) : (
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-charcoal/80">
                        {t("rsvp.nameLabel")}
                      </span>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t("rsvp.namePlaceholder")}
                        className="rounded-2xl border border-blush-dark bg-white px-4 py-3 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/20"
                      />
                    </label>
                  )}

                  {/* Attending: two large tappable cards */}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-charcoal/80">
                      {t("rsvp.attendingQuestion")}
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setAttending(true)}
                        aria-pressed={attending}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-sm font-medium transition active:scale-[0.98] ${
                          attending
                            ? "border-rose bg-gradient-to-b from-rose-dark to-rose text-white shadow-lg shadow-rose/25"
                            : "border-blush-dark bg-white text-charcoal/60 hover:border-rose/40"
                        }`}
                      >
                        <span className="text-2xl" aria-hidden>
                          💌
                        </span>
                        {t("rsvp.yes")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAttending(false)}
                        aria-pressed={!attending}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-3 py-4 text-sm font-medium transition active:scale-[0.98] ${
                          !attending
                            ? "border-rose bg-gradient-to-b from-rose-dark to-rose text-white shadow-lg shadow-rose/25"
                            : "border-blush-dark bg-white text-charcoal/60 hover:border-rose/40"
                        }`}
                      >
                        <span className="text-2xl" aria-hidden>
                          🕊️
                        </span>
                        {t("rsvp.no")}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {attending && (
                      <motion.div
                        key="attending-fields"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="flex flex-col gap-6 overflow-hidden"
                      >
                        <div className="flex gap-4">
                          <NumberStepper
                            name="adults"
                            label={t("rsvp.adultsLabel")}
                            min={0}
                            defaultValue={1}
                          />
                          <NumberStepper
                            name="children"
                            label={t("rsvp.childrenLabel")}
                            min={0}
                            defaultValue={0}
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="text-sm font-medium text-charcoal/80">
                            {t("rsvp.dietaryLabel")}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {(["normal", "vegetarian", "other"] as const).map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setDietary(option)}
                                aria-pressed={dietary === option}
                                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition active:scale-[0.97] ${
                                  dietary === option
                                    ? "border-rose bg-rose-dark text-white shadow-md shadow-rose/20"
                                    : "border-blush-dark bg-white text-charcoal/60 hover:border-rose/40"
                                }`}
                              >
                                {dietaryLabel[option]}
                              </button>
                            ))}
                          </div>
                          <input type="hidden" name="dietary" value={dietary} />
                          <AnimatePresence initial={false}>
                            {dietary === "other" && (
                              <motion.input
                                key="dietary-other"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                type="text"
                                name="dietaryOther"
                                placeholder={t("rsvp.dietaryOtherPlaceholder")}
                                className="rounded-2xl border border-blush-dark bg-white px-4 py-3 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/20"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-charcoal/80">
                      {t("rsvp.wishLabel")}
                    </span>
                    <textarea
                      name="wish"
                      rows={3}
                      placeholder={t("rsvp.wishPlaceholder")}
                      className="resize-none rounded-2xl border border-blush-dark bg-white px-4 py-3 outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/20"
                    />
                  </label>

                  {state.status === "error" && (
                    <p className="rounded-2xl bg-rose/10 px-4 py-3 text-center text-sm text-rose">
                      {t(`rsvp.${state.error}`)}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-gradient-to-r from-rose-dark via-rose to-rose-dark bg-[length:200%_auto] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-rose/30 transition-all hover:bg-right disabled:opacity-60"
                  >
                    {isPending ? t("rsvp.submitting") : t("rsvp.submit")}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
