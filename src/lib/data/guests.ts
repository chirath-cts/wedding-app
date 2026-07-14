import "server-only";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Guest } from "@/lib/types";

export async function getGuestByInviteCode(code: string): Promise<Guest | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("invite_code", code.toUpperCase())
    .maybeSingle();

  if (error || !data) return null;
  return data as Guest;
}

export async function getAllGuests(): Promise<Guest[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as Guest[];
}

export interface DashboardStats {
  totalInvited: number;
  attendingCount: number;
  attendingSeats: number;
  declinedCount: number;
  pendingCount: number;
}

export function computeDashboardStats(guests: Guest[]): DashboardStats {
  const stats: DashboardStats = {
    totalInvited: guests.length,
    attendingCount: 0,
    attendingSeats: 0,
    declinedCount: 0,
    pendingCount: 0,
  };

  for (const guest of guests) {
    if (guest.rsvp_status === "attending") {
      stats.attendingCount += 1;
      stats.attendingSeats += guest.seats_invited;
    } else if (guest.rsvp_status === "declined") {
      stats.declinedCount += 1;
    } else {
      stats.pendingCount += 1;
    }
  }

  return stats;
}
