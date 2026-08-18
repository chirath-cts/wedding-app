"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isAdminAuthenticated } from "@/lib/actions/auth";
import { venueLocalInputToIso } from "@/lib/i18n/dates";
import type { UploadField } from "@/lib/types";

const BUCKET = "site-assets";

const FIELD_FOLDER: Record<UploadField, string> = {
  hero: "hero",
  story1: "story/1",
  story2: "story/2",
  music: "music",
};

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Not authorized");
  }
}

function revalidateGuestPages() {
  revalidatePath("/");
  revalidatePath("/invite/[code]", "page");
  revalidatePath("/admin/content");
}

export interface SettingsFormState {
  error?: string;
  success?: boolean;
}

export async function updateSiteSettingsAction(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();

  const partner1Name = String(formData.get("partner1Name") || "").trim();
  const partner2Name = String(formData.get("partner2Name") || "").trim();
  const weddingDateInput = String(formData.get("weddingDateInput") || "").trim();
  const venueName = String(formData.get("venueName") || "").trim();
  const venueAddress = String(formData.get("venueAddress") || "").trim();
  const storyText = String(formData.get("storyText") || "").trim();

  if (!partner1Name || !partner2Name || !weddingDateInput || !venueName || !venueAddress) {
    return { error: "Please fill in all the required fields." };
  }

  const weddingDateISO = venueLocalInputToIso(weddingDateInput);
  if (Number.isNaN(new Date(weddingDateISO).getTime())) {
    return { error: "That date/time doesn't look valid." };
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("site_settings").upsert({
    id: 1,
    partner1_name: partner1Name,
    partner2_name: partner2Name,
    wedding_date: weddingDateISO,
    venue_name: venueName,
    venue_address: venueAddress,
    story_text: storyText || null,
    updated_at: new Date().toISOString(),
  });

  if (error) return { error: error.message };

  revalidateGuestPages();
  return { success: true };
}

export interface UploadUrlResult {
  error?: string;
  path?: string;
  token?: string;
  publicUrl?: string;
}

// Step 1 of an upload: mint a short-lived signed URL the browser can PUT
// the file straight to Supabase Storage with — the file bytes never pass
// through our own server, so there's no Vercel request-size limit to hit.
export async function createUploadUrlAction(field: UploadField, fileExt: string): Promise<UploadUrlResult> {
  await requireAdmin();

  const safeExt = fileExt.replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  const path = `${FIELD_FOLDER[field]}/${Date.now()}.${safeExt}`;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);

  if (error || !data) {
    return { error: error?.message || "Could not prepare the upload." };
  }

  const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return { path: data.path, token: data.token, publicUrl: publicData.publicUrl };
}

// Step 2: after the browser finishes the direct upload, save the new
// public URL into site_settings.
export async function confirmUploadAction(field: UploadField, publicUrl: string): Promise<SettingsFormState> {
  await requireAdmin();

  const supabase = getSupabaseAdmin();

  if (field === "story1" || field === "story2") {
    const { data: current } = await supabase
      .from("site_settings")
      .select("story_image_urls")
      .eq("id", 1)
      .maybeSingle();

    const existing: string[] = Array.isArray(current?.story_image_urls) ? [...current.story_image_urls] : [];
    const index = field === "story1" ? 0 : 1;
    while (existing.length <= index) existing.push("");
    existing[index] = publicUrl;

    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, story_image_urls: existing.filter(Boolean), updated_at: new Date().toISOString() });

    if (error) return { error: error.message };
  } else {
    const column = field === "hero" ? "hero_image_url" : "music_url";
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, [column]: publicUrl, updated_at: new Date().toISOString() });

    if (error) return { error: error.message };
  }

  revalidateGuestPages();
  return { success: true };
}
