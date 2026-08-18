"use client";

import { useActionState } from "react";
import { updateSiteSettingsAction, type SettingsFormState } from "@/lib/actions/settings";
import { isoToVenueLocalInput } from "@/lib/i18n/dates";
import type { SiteSettings } from "@/lib/types";

const initialState: SettingsFormState = {};

export function TextSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettingsAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
        <h3 className="text-sm font-semibold text-charcoal">Landing Page</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-xs font-medium text-charcoal/70">Partner 1 Name</span>
            <input
              type="text"
              name="partner1Name"
              required
              defaultValue={settings.partner1Name}
              className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1">
            <span className="text-xs font-medium text-charcoal/70">Partner 2 Name</span>
            <input
              type="text"
              name="partner2Name"
              required
              defaultValue={settings.partner2Name}
              className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-charcoal/70">
            Wedding Date &amp; Time (Sri Lanka time)
          </span>
          <input
            type="datetime-local"
            name="weddingDateInput"
            required
            defaultValue={isoToVenueLocalInput(settings.weddingDateISO)}
            className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose sm:max-w-xs"
          />
        </label>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
        <h3 className="text-sm font-semibold text-charcoal">Our Story</h3>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-charcoal/70">Story Text</span>
          <textarea
            name="storyText"
            rows={5}
            defaultValue={settings.storyText}
            className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
          />
        </label>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
        <h3 className="text-sm font-semibold text-charcoal">Event Details</h3>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-charcoal/70">Venue Name</span>
          <input
            type="text"
            name="venueName"
            required
            defaultValue={settings.venueName}
            className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-charcoal/70">Venue Address</span>
          <input
            type="text"
            name="venueAddress"
            required
            defaultValue={settings.venueAddress}
            className="rounded-lg border border-blush-dark px-3 py-2 text-sm outline-none focus:border-rose"
          />
        </label>
      </section>

      {state.error && (
        <p className="rounded-lg bg-rose/10 px-4 py-2 text-sm text-rose">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
          Saved — changes are live on the site now.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-full bg-rose-dark px-6 py-3 text-sm font-medium text-white transition hover:bg-rose disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
