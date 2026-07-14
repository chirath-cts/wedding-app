import { getAllGuests, computeDashboardStats } from "@/lib/data/guests";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { StatCard } from "@/components/admin/StatCard";

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const guests = await getAllGuests();
  const stats = computeDashboardStats(guests);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-serif text-2xl text-rose-dark">Dashboard</h1>

      {!configured && (
        <div className="mt-4 rounded-lg border border-gold bg-gold-light/30 px-4 py-3 text-sm text-charcoal">
          Supabase isn&apos;t connected yet, so this dashboard is showing empty data. Add your
          Supabase URL and service role key to <code>.env.local</code> to see live numbers.
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Invited" value={stats.totalInvited} />
        <StatCard
          label="Confirmed Attending"
          value={stats.attendingCount}
          sub={`${stats.attendingSeats} seat(s) reserved`}
        />
        <StatCard label="Declined" value={stats.declinedCount} />
        <StatCard label="Not Yet Responded" value={stats.pendingCount} />
      </div>
    </div>
  );
}
