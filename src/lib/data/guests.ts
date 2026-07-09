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
  confirmedAdults: number;
  confirmedChildren: number;
  declinedCount: number;
  pendingCount: number;
  dietary: { normal: number; vegetarian: number; other: number };
}

export function computeDashboardStats(guests: Guest[]): DashboardStats {
  const stats: DashboardStats = {
    totalInvited: guests.length,
    confirmedAdults: 0,
    confirmedChildren: 0,
    declinedCount: 0,
    pendingCount: 0,
    dietary: { normal: 0, vegetarian: 0, other: 0 },
  };

  for (const guest of guests) {
    if (guest.rsvp_status === "attending") {
      stats.confirmedAdults += guest.adults;
      stats.confirmedChildren += guest.children;
      if (guest.dietary === "normal") stats.dietary.normal += guest.adults + guest.children;
      if (guest.dietary === "vegetarian") stats.dietary.vegetarian += guest.adults + guest.children;
      if (guest.dietary === "other") stats.dietary.other += guest.adults + guest.children;
    } else if (guest.rsvp_status === "declined") {
      stats.declinedCount += 1;
    } else {
      stats.pendingCount += 1;
    }
  }

  return stats;
}
