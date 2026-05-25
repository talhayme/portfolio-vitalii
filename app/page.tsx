import Link from "next/link";

export default function RootPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="font-mono text-xs text-[var(--fg-subtle)] mb-4">
          Vitalii Bogachev · Portfolio
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Senior Fullstack Engineer
        </h1>
        <p className="text-[var(--fg-muted)] mb-10">
          AI/SaaS founder. 13 years shipping production systems.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/en"
            className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded font-mono text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
          >
            English →
          </Link>
          <Link
            href="/ru"
            className="px-6 py-3 border border-[var(--accent)] text-[var(--accent)] rounded font-mono text-sm hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
          >
            Русский →
          </Link>
        </div>
      </div>
    </main>
  );
}
