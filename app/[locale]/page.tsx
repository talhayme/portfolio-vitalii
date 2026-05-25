import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui, projects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import MetricCard from "@/components/MetricCard";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const featured = projects[0];

  return (
    <article className="prose">
      <div className="font-mono text-xs text-[var(--fg-subtle)] mb-4">
        v1.0 · {locale === "ru" ? "обновлено" : "updated"} {new Date().getFullYear()}
      </div>

      <h1>{locale === "ru" ? ui.hero.nameRu : ui.hero.name}</h1>
      <div className="text-xl text-[var(--fg-muted)] mt-2 mb-6 font-normal">
        {ui.hero.title[locale]}
      </div>

      <p className="text-base">{ui.hero.description[locale]}</p>

      <div className="flex flex-wrap gap-2 text-xs text-[var(--fg-subtle)] font-mono mb-12">
        <span>{ui.hero.location[locale]}</span>
      </div>

      <hr />

      <h2 id="featured">
        {locale === "ru" ? "Текущий проект" : "Currently building"}
      </h2>
      <Link
        href={`/${locale}/work/${featured.slug}`}
        className="block group border border-[var(--border)] hover:border-[var(--accent)] rounded-lg p-8 transition-all bg-[var(--bg-elevated)] no-underline"
      >
        <div className="font-mono text-xs text-[var(--accent)] mb-2">
          {featured.year} · {featured.status?.[locale]}
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors mt-0">
          {featured.company}
        </h3>
        <div className="text-sm text-[var(--fg-muted)] mb-4">
          {featured.role[locale]}
        </div>
        <p className="text-[var(--fg-muted)] mb-6">{featured.oneLiner[locale]}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {featured.metrics.map((m) => (
            <MetricCard key={m.value} value={m.value} label={m.label[locale]} />
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {featured.stack.map((t) => (
            <span key={t} className="pill">
              {t}
            </span>
          ))}
        </div>
      </Link>

      <h2 id="other-work">{locale === "ru" ? "Прошлые проекты" : "Past work"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
        {projects.slice(1).map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} />
        ))}
      </div>

      <h2 id="cta">{locale === "ru" ? "Открыт к работе" : "Open to work"}</h2>
      <p>
        {locale === "ru"
          ? "Senior Fullstack / AI Engineer / Tech Lead. Удалёнка или Москва. Контракты, full-time, advisor-роли."
          : "Senior Fullstack / AI Engineer / Tech Lead. Remote or Moscow. Contract, full-time, advisor roles."}
      </p>
      <p>
        <Link href={`/${locale}/contact`}>
          {locale === "ru" ? "→ Связаться" : "→ Get in touch"}
        </Link>
      </p>
    </article>
  );
}
