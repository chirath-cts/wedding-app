"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { DietaryPreference } from "@/lib/types";

export interface RsvpState {
  status: "idle" | "success" | "error";
  error?: string;
  attending?: boolean;
}

export async function submitRsvpAction(
  _prevState: RsvpState,
  formData: FormData
): Promise<RsvpState> {
  const inviteCode = String(formData.get("inviteCode") || "").trim() || null;
  const name = String(formData.get("name") || "").trim();
  const attending = formData.get("attending") === "yes";
  const adults = Math.max(0, Number(formData.get("adults") || 0) || 0);
  const children = Math.max(0, Number(formData.get("children") || 0) || 0);
  const dietary = String(formData.get("dietary") || "normal") as DietaryPreference;
  const dietaryOther = String(formData.get("dietaryOther") || "").trim() || null;
  const wish = String(formData.get("wish") || "").trim() || null;

  if (!inviteCode && !name) {
    return { status: "error", error: "nameRequired" };
  }
  if (attending && adults + children === 0) {
    return { status: "error", error: "minGuestsRequired" };
  }

  const supabase = getSupabaseAdmin();
  const payload = {
    rsvp_status: attending ? ("attending" as const) : ("declined" as const),
    adults: attending ? adults : 0,
    children: attending ? children : 0,
    dietary: attending ? dietary : null,
    dietary_other: attending && dietary === "other" ? dietaryOther : null,
    wish_message: wish,
    responded_at: new Date().toISOString(),
  };

  const result = inviteCode
    ? await supabase.from("guests").update(payload).eq("invite_code", inviteCode.toUpperCase())
    : await supabase.from("guests").insert({
        name,
        seats_invited: attending ? adults + children : 1,
        ...payload,
      });

  if (result.error) {
    return { status: "error", error: "errorGeneric" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/guests");
  return { status: "success", attending };
}
