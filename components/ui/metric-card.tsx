export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface px-4 py-3">
      <p className="mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
