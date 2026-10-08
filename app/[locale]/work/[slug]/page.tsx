import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { projects, type ProjectSlug } from "@/lib/content";
import MetricCard from "@/components/MetricCard";
import { caseStudies } from "@/lib/case-studies";
import CodeBlock from "@/components/CodeBlock";
import { pageAlternates } from "@/lib/site";

// Each article gets its own canonical URL — without it every note would
// collapse onto the section page in search results.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return { alternates: pageAlternates(locale, `/work/${slug}`) };
}

export function generateStaticParams() {
  const slugs = projects.map((p) => p.slug);
  return [
    ...slugs.map((slug) => ({ locale: "en", slug })),
    ...slugs.map((slug) => ({ locale: "ru", slug })),
  ];
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const study = caseStudies[project.slug as ProjectSlug];

  return (
    <article className="prose">
      <Link
        href={`/${locale}/work`}
        className="font-mono text-xs text-[var(--fg-subtle)] no-underline hover:text-[var(--fg)]"
      >
        ← {locale === "ru" ? "все проекты" : "all work"}
      </Link>

      <div className="font-mono text-xs text-[var(--fg-subtle)] mt-6 mb-2">
        {project.year}
      </div>
      <h1 className="!mb-1">{project.company}</h1>
      <div className="text-xl text-[var(--fg-muted)] mt-1 mb-6 font-normal">
        {project.role[locale]}
      </div>

      <p>{project.oneLiner[locale]}</p>

      {project.links && (
        <div className="flex flex-wrap gap-2 mb-8 not-prose">
          {project.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-xs font-mono px-3 py-1.5 border border-[var(--accent)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-[var(--accent-fg)] transition-colors"
            >
              {l.label} →
            </a>
          ))}
        </div>
      )}

      <h2>{locale === "ru" ? "Метрики" : "Outcomes"}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 not-prose mb-8">
        {project.metrics.map((m) => (
          <MetricCard key={m.value} value={m.value} label={m.label[locale]} />
        ))}
      </div>

      {study ? (
        <>
          <h2>{locale === "ru" ? "Контекст" : "Context"}</h2>
          {study.context[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{locale === "ru" ? "Что я сделал" : "What I built"}</h2>
          <ul>
            {study.built[locale].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>{locale === "ru" ? "Технические решения" : "Technical decisions"}</h2>
          {study.decisions[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {study.snippets && study.snippets.length > 0 && (
            <>
              <h2>{locale === "ru" ? "Из кода" : "From the code"}</h2>
              {study.snippets.map((s, i) => (
                <CodeBlock
                  key={i}
                  label={s.label[locale]}
                  lang={s.lang}
                  code={s.code}
                />
              ))}
            </>
          )}

          <h2>{locale === "ru" ? "Результат" : "Result"}</h2>
          {study.result[locale].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </>
      ) : (
        <p className="text-[var(--fg-subtle)] italic">
          {locale === "ru"
            ? "Полный кейс — в работе. Метрики выше отражают итоги проекта."
            : "Full case study in progress. Metrics above reflect project outcomes."}
        </p>
      )}

      <h2>{locale === "ru" ? "Стек" : "Stack"}</h2>
      <div className="flex flex-wrap gap-1.5 not-prose">
        {project.stack.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
