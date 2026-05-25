export default function MetricCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg-elevated)]">
      <div className="font-mono text-2xl font-semibold tracking-tight text-[var(--fg)]">
        {value}
      </div>
      <div className="text-xs text-[var(--fg-muted)] mt-1 leading-relaxed">
        {label}
      </div>
    </div>
  );
}
