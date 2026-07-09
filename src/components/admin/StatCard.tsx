export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-charcoal/50">{label}</p>
      <p className="mt-1 font-serif text-2xl text-rose-dark">{value}</p>
      {sub && <p className="mt-1 text-xs text-charcoal/60">{sub}</p>}
    </div>
  );
}
