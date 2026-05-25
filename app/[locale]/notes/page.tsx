import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { notes } from "@/lib/notes";

export default async function NotesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="prose">
      <h1>{locale === "ru" ? "Engineering Notes" : "Engineering Notes"}</h1>
      <p>
        {locale === "ru"
          ? "Короткие заметки о реальных проблемах из работы. Не туториалы и не «10 трендов 2026». То, что я узнал, починив что-то конкретное."
          : "Short notes about real problems from work. Not tutorials, not '10 trends in 2026.' Things I learned by fixing something specific."}
      </p>

      <div className="not-prose flex flex-col gap-4 mt-8">
        {notes.map((n) => (
          <Link
            key={n.slug}
            href={`/${locale}/notes/${n.slug}`}
            className="group block border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg p-5 transition-all hover:bg-[var(--bg-elevated)]"
          >
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                {n.title[locale]}
              </h3>
              <span className="font-mono text-xs text-[var(--fg-subtle)] whitespace-nowrap">
                {n.date}
              </span>
            </div>
            <p className="text-sm text-[var(--fg-muted)] mb-3 leading-relaxed">
              {n.tagline[locale]}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {n.tags.map((t) => (
                <span key={t} className="pill">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
