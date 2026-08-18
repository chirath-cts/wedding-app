import "server-only";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { weddingConfig } from "@/lib/config";
import type { SiteSettings } from "@/lib/types";

function defaults(): SiteSettings {
  return {
    partner1Name: weddingConfig.partner1Name,
    partner2Name: weddingConfig.partner2Name,
    weddingDateISO: weddingConfig.weddingDateISO,
    venueName: weddingConfig.venueName,
    venueAddress: weddingConfig.venueAddress,
    heroImage: weddingConfig.heroImage,
    storyImages: [...weddingConfig.storyImages],
    storyText: weddingConfig.storyText,
    musicSrc: weddingConfig.musicSrc,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const fallback = defaults();
  if (!isSupabaseConfigured()) return fallback;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data) return fallback;

  const storyImages = Array.isArray(data.story_image_urls) && data.story_image_urls.length > 0
    ? data.story_image_urls
    : fallback.storyImages;

  return {
    partner1Name: data.partner1_name || fallback.partner1Name,
    partner2Name: data.partner2_name || fallback.partner2Name,
    weddingDateISO: data.wedding_date || fallback.weddingDateISO,
    venueName: data.venue_name || fallback.venueName,
    venueAddress: data.venue_address || fallback.venueAddress,
    heroImage: data.hero_image_url || fallback.heroImage,
    storyImages,
    storyText: data.story_text || fallback.storyText,
    musicSrc: data.music_url || fallback.musicSrc,
  };
}
