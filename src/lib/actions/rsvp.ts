"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";

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
  const wish = String(formData.get("wish") || "").trim() || null;

  if (!inviteCode && !name) {
    return { status: "error", error: "nameRequired" };
  }

  const supabase = getSupabaseAdmin();
  const payload = {
    rsvp_status: attending ? ("attending" as const) : ("declined" as const),
    wish_message: wish,
    responded_at: new Date().toISOString(),
  };

  const result = inviteCode
    ? await supabase.from("guests").update(payload).eq("invite_code", inviteCode.toUpperCase())
    : await supabase.from("guests").insert({ name, ...payload });

  if (result.error) {
    return { status: "error", error: "errorGeneric" };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/guests");
  return { status: "success", attending };
}
