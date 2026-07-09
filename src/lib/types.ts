export type RsvpStatus = "pending" | "attending" | "declined";

export type DietaryPreference = "normal" | "vegetarian" | "other";

export interface Guest {
  id: string;
  invite_code: string | null;
  name: string;
  phone: string | null;
  seats_invited: number;
  rsvp_status: RsvpStatus;
  adults: number;
  children: number;
  dietary: DietaryPreference | null;
  dietary_other: string | null;
  wish_message: string | null;
  // Empty for now — Phase 2 will assign this for the QR-code table finder.
  table_number: number | null;
  responded_at: string | null;
  created_at: string;
}
