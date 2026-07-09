"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { generateInviteCode } from "@/lib/utils/inviteCode";
import { isAdminAuthenticated } from "@/lib/actions/auth";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Not authorized");
  }
}

export interface GuestFormState {
  error?: string;
  success?: boolean;
}

export async function addGuestAction(
  _prevState: GuestFormState,
  formData: FormData
): Promise<GuestFormState> {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim() || null;
  const seats = Math.max(1, Number(formData.get("seats") || 1) || 1);

  if (!name) return { error: "Name is required." };

  const supabase = getSupabaseAdmin();

  let lastErrorMessage = "Failed to add guest.";
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateInviteCode();
    const { error } = await supabase
      .from("guests")
      .insert({ name, phone, seats_invited: seats, invite_code: code });

    if (!error) {
      revalidatePath("/admin/guests");
      revalidatePath("/admin");
      return { success: true };
    }

    lastErrorMessage = error.message;
    if (error.code !== "23505") break; // not a duplicate-code collision, stop retrying
  }

  return { error: lastErrorMessage };
}

export interface BulkAddFormState {
  error?: string;
  addedCount?: number;
}

export async function bulkAddGuestsAction(
  _prevState: BulkAddFormState,
  formData: FormData
): Promise<BulkAddFormState> {
  await requireAdmin();

  const raw = String(formData.get("names") || "");
  const defaultSeats = Math.max(1, Number(formData.get("defaultSeats") || 1) || 1);
  const names = raw
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);

  if (names.length === 0) return { error: "Paste at least one name, one per line." };

  const supabase = getSupabaseAdmin();
  const rows = names.map((name) => ({
    name,
    seats_invited: defaultSeats,
    invite_code: generateInviteCode(),
  }));

  const { error } = await supabase.from("guests").insert(rows);
  if (error) return { error: error.message };

  revalidatePath("/admin/guests");
  revalidatePath("/admin");
  return { addedCount: names.length };
}

export async function deleteGuestAction(id: string): Promise<void> {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  await supabase.from("guests").delete().eq("id", id);
  revalidatePath("/admin/guests");
  revalidatePath("/admin");
}
