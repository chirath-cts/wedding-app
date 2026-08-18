import { getSiteSettings } from "@/lib/data/settings";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { TextSettingsForm } from "@/components/admin/TextSettingsForm";
import { MediaUploadField } from "@/components/admin/MediaUploadField";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const settings = await getSiteSettings();
  const configured = isSupabaseConfigured();
  const uploadsConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-serif text-2xl text-rose-dark">Site Content</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Edit your wedding details and photos/music here — changes go live on the site
        immediately, no redeploy needed.
      </p>

      {!configured && (
        <div className="mt-4 rounded-lg border border-gold bg-gold-light/30 px-4 py-3 text-sm text-charcoal">
          Supabase isn&apos;t connected yet, so this page is showing placeholder data and
          changes won&apos;t be saved. Add your Supabase keys to <code>.env.local</code> first.
        </div>
      )}
      {configured && !uploadsConfigured && (
        <div className="mt-4 rounded-lg border border-gold bg-gold-light/30 px-4 py-3 text-sm text-charcoal">
          Photo/music uploads need one more key: add{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code> (from Supabase
          Project Settings → API → &quot;anon public&quot; key). Text fields below still work
          without it.
        </div>
      )}

      <div className="mt-8 flex flex-col gap-8">
        <TextSettingsForm settings={settings} />

        <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Landing Page Photo</h3>
            <p className="text-xs text-charcoal/60">
              The big full-screen photo guests see first.
            </p>
          </div>
          <MediaUploadField
            field="hero"
            label="Hero Background Photo"
            hint="Landscape or tall photo, at least 1600px wide works best."
            kind="image"
            accept="image/*"
            initialUrl={settings.heroImage}
          />
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Our Story Photos</h3>
            <p className="text-xs text-charcoal/60">
              Add one photo, or two for the overlapping collage layout.
            </p>
          </div>
          <MediaUploadField
            field="story1"
            label="Story Photo 1"
            hint="Shown large if it's the only one."
            kind="image"
            accept="image/*"
            initialUrl={settings.storyImages[0] ?? null}
          />
          <MediaUploadField
            field="story2"
            label="Story Photo 2 (optional)"
            hint="Add this to switch to the two-photo collage."
            kind="image"
            accept="image/*"
            initialUrl={settings.storyImages[1] ?? null}
          />
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-blush-dark bg-white p-5">
          <div>
            <h3 className="text-sm font-semibold text-charcoal">Background Music</h3>
            <p className="text-xs text-charcoal/60">
              Plays when a guest taps the music button.
            </p>
          </div>
          <MediaUploadField
            field="music"
            label="Background Track"
            hint="MP3 works best. Keep it a reasonable length for a loop."
            kind="audio"
            accept="audio/*"
            initialUrl={settings.musicSrc}
          />
        </section>
      </div>
    </div>
  );
}
