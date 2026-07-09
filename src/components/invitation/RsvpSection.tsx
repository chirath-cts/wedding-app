"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { submitRsvpAction, type RsvpState } from "@/lib/actions/rsvp";
import { fadeUp } from "@/lib/motion";
import type { Guest } from "@/lib/types";

const initialState: RsvpState = { status: "idle" };

export function RsvpSection({ guest }: { guest: Guest | null }) {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState(submitRsvpAction, initialState);
  const [attending, setAttending] = useState(true);
  const [dietary, setDietary] = useState<"normal" | "vegetarian" | "other">("normal");

  return (
    <section id="rsvp" className="bg-ivory px-6 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-lg"
      >
        <h2 className="text-center font-serif text-3xl text-rose-dark sm:text-4xl">
          {t("rsvp.title")}
        </h2>

        <AnimatePresence mode="wait">
          {state.status === "success" ? (
            <motion.div
              key="thank-you"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-blush px-6 py-12 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                className="text-5xl"
                aria-hidden
              >
                {state.attending ? "💐" : "🤍"}
              </motion.span>
              <h3 className="font-serif text-2xl text-rose-dark">
                {state.attending
                  ? t("rsvp.thankYouTitleAttending")
                  : t("rsvp.thankYouTitleDeclined")}
              </h3>
              <p className="text-charcoal/80">
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
              className="mt-10 flex flex-col gap-5"
            >
              <input type="hidden" name="inviteCode" value={guest?.invite_code ?? ""} />

              {!guest && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-charcoal/80">
                    {t("rsvp.nameLabel")}
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="rounded-lg border border-blush-dark bg-white px-4 py-2.5 outline-none focus:border-rose"
                  />
                </label>
              )}

              {guest && guest.seats_invited > 0 && (
                <p className="rounded-lg bg-blush px-4 py-2 text-center text-sm text-rose-dark">
                  {t("rsvp.seatsHint", { seats: guest.seats_invited })}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-charcoal/80">
                  {t("rsvp.attendingQuestion")}
                </span>
                <div className="flex gap-3">
                  <label
                    className={`flex-1 cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm transition ${
                      attending
                        ? "border-rose bg-rose-dark text-white"
                        : "border-blush-dark bg-white text-charcoal/70"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending}
                      onChange={() => setAttending(true)}
                      className="hidden"
                    />
                    {t("rsvp.yes")}
                  </label>
                  <label
                    className={`flex-1 cursor-pointer rounded-lg border px-4 py-2.5 text-center text-sm transition ${
                      !attending
                        ? "border-rose bg-rose-dark text-white"
                        : "border-blush-dark bg-white text-charcoal/70"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={!attending}
                      onChange={() => setAttending(false)}
                      className="hidden"
                    />
                    {t("rsvp.no")}
                  </label>
                </div>
              </div>

              {attending && (
                <>
                  <div className="flex gap-4">
                    <label className="flex flex-1 flex-col gap-1.5">
                      <span className="text-sm font-medium text-charcoal/80">
                        {t("rsvp.adultsLabel")}
                      </span>
                      <input
                        type="number"
                        name="adults"
                        min={0}
                        defaultValue={guest ? Math.min(1, guest.seats_invited) : 1}
                        className="rounded-lg border border-blush-dark bg-white px-4 py-2.5 outline-none focus:border-rose"
                      />
                    </label>
                    <label className="flex flex-1 flex-col gap-1.5">
                      <span className="text-sm font-medium text-charcoal/80">
                        {t("rsvp.childrenLabel")}
                      </span>
                      <input
                        type="number"
                        name="children"
                        min={0}
                        defaultValue={0}
                        className="rounded-lg border border-blush-dark bg-white px-4 py-2.5 outline-none focus:border-rose"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-charcoal/80">
                      {t("rsvp.dietaryLabel")}
                    </span>
                    <div className="flex gap-3">
                      {(["normal", "vegetarian", "other"] as const).map((option) => (
                        <label
                          key={option}
                          className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
                            dietary === option
                              ? "border-rose bg-rose-dark text-white"
                              : "border-blush-dark bg-white text-charcoal/70"
                          }`}
                        >
                          <input
                            type="radio"
                            name="dietary"
                            value={option}
                            checked={dietary === option}
                            onChange={() => setDietary(option)}
                            className="hidden"
                          />
                          {t(`rsvp.dietary${option[0].toUpperCase()}${option.slice(1)}`)}
                        </label>
                      ))}
                    </div>
                    {dietary === "other" && (
                      <input
                        type="text"
                        name="dietaryOther"
                        placeholder={t("rsvp.dietaryOtherPlaceholder")}
                        className="rounded-lg border border-blush-dark bg-white px-4 py-2.5 outline-none focus:border-rose"
                      />
                    )}
                  </div>
                </>
              )}

              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-charcoal/80">
                  {t("rsvp.wishLabel")}
                </span>
                <textarea
                  name="wish"
                  rows={3}
                  className="rounded-lg border border-blush-dark bg-white px-4 py-2.5 outline-none focus:border-rose"
                />
              </label>

              {state.status === "error" && (
                <p className="text-center text-sm text-rose">
                  {t(`rsvp.${state.error}`)}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="rounded-full bg-rose-dark px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-rose disabled:opacity-60"
              >
                {isPending ? t("rsvp.submitting") : t("rsvp.submit")}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
