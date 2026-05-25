export default function CodeBlock({
  label,
  lang,
  code,
}: {
  label?: string;
  lang: string;
  code: string;
}) {
  return (
    <div className="not-prose my-6 border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--code-bg)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-subtle)]">
          {lang}
        </div>
        {label && (
          <div className="font-mono text-xs text-[var(--fg-muted)]">{label}</div>
        )}
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="font-mono text-[var(--fg)]">{code}</code>
      </pre>
    </div>
  );
}
