import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { ProjectMeta } from "@/lib/content";

export default function ProjectCard({
  project,
  locale,
}: {
  project: ProjectMeta;
  locale: Locale;
}) {
  return (
    <Link
      href={`/${locale}/work/${project.slug}`}
      className="block group border border-[var(--border)] hover:border-[var(--border-strong)] rounded-lg p-6 transition-all hover:bg-[var(--bg-elevated)]"
    >
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="text-lg font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
          {project.company}
        </h3>
        <span className="font-mono text-xs text-[var(--fg-subtle)] whitespace-nowrap">
          {project.year}
        </span>
      </div>
      <div className="text-sm text-[var(--fg-muted)] mb-3">
        {project.role[locale]}
      </div>
      <p className="text-sm text-[var(--fg-muted)] mb-4 leading-relaxed">
        {project.oneLiner[locale]}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
        {project.stack.length > 6 && (
          <span className="pill">+{project.stack.length - 6}</span>
        )}
      </div>
    </Link>
  );
}
