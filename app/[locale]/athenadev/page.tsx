import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { athenadev } from "@/lib/athenadev";
import { ui } from "@/lib/content";
import CodeBlock from "@/components/CodeBlock";
import MetricCard from "@/components/MetricCard";
import { pageAlternates } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "AthenaDev — AI Integration Consultancy",
    description:
      "Embedding Claude Code, MCP servers, and LLM workflows into mid-size product teams. Case studies in fintech, legal, and SaaS.",
    alternates: pageAlternates(locale, "/athenadev"),
  };
}

export default async function AthenaDevPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="prose">
      <div className="font-mono text-xs text-[var(--accent)] mb-2">
        athenadev.tech
      </div>
      <h1 className="!mb-2">AthenaDev</h1>
      <div className="text-xl text-[var(--fg-muted)] mt-1 mb-6 font-normal">
        {athenadev.hero.tagline[locale]}
      </div>

      <p>{athenadev.hero.description[locale]}</p>

      <div className="flex flex-wrap gap-1.5 not-prose mb-12">
        {athenadev.hero.formats[locale].map((f) => (
          <span key={f} className="pill">
            {f}
          </span>
        ))}
      </div>

      <h2 id="services">{locale === "ru" ? "Что делаем" : "What we do"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-12">
        {athenadev.services.map((s) => (
          <div
            key={s.id}
            className="border border-[var(--border)] rounded-lg p-5 bg-[var(--bg-elevated)]"
          >
            <h3 className="text-base font-semibold tracking-tight mb-2">
              {s.title[locale]}
            </h3>
            <p className="text-sm text-[var(--fg-muted)] mb-4 leading-relaxed">
              {s.desc[locale]}
            </p>
            <ul className="text-xs text-[var(--fg-muted)] space-y-1.5">
              {s.outcomes[locale].map((o, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[var(--fg-subtle)] font-mono shrink-0">→</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 id="engagements">
        {locale === "ru" ? "Кейсы" : "Selected engagements"}
      </h2>
      <p>
        {locale === "ru"
          ? "Клиенты не называются явно — стандартная практика консалтинга. По NDA-описанию профиль и контекст можно сверить."
          : "Clients are anonymized — standard consulting practice. Profile and context can be verified under NDA."}
      </p>

      {athenadev.engagements.map((e) => (
        <section
          key={e.slug}
          id={e.slug}
          className="not-prose mt-12 border border-[var(--border)] rounded-lg p-6 md:p-8 bg-[var(--bg-elevated)]"
        >
          <div className="font-mono text-xs text-[var(--fg-subtle)] mb-2">
            {e.industry[locale]} · {e.duration[locale]} · {e.team}
          </div>
          <h3 className="text-xl font-semibold tracking-tight mb-4">
            {e.client[locale]}
          </h3>

          <div className="prose max-w-none">
            <h4 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-subtle)] mt-6 mb-2">
              {locale === "ru" ? "Проблема" : "Problem"}
            </h4>
            {e.problem[locale].map((p, i) => (
              <p key={i} className="text-sm">{p}</p>
            ))}

            <h4 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-subtle)] mt-6 mb-2">
              {locale === "ru" ? "Подход" : "Approach"}
            </h4>
            <ul>
              {e.approach[locale].map((a, i) => (
                <li key={i} className="text-sm">{a}</li>
              ))}
            </ul>

            <h4 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-subtle)] mt-6 mb-2">
              {locale === "ru" ? "Решения" : "Decisions"}
            </h4>
            {e.decisions[locale].map((d, i) => (
              <p key={i} className="text-sm">{d}</p>
            ))}

            {e.snippets && (
              <>
                <h4 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-subtle)] mt-6 mb-2">
                  {locale === "ru" ? "Из кода" : "From the code"}
                </h4>
                {e.snippets.map((s, i) => (
                  <CodeBlock
                    key={i}
                    label={s.label[locale]}
                    lang={s.lang}
                    code={s.code}
                  />
                ))}
              </>
            )}

            <h4 className="text-sm font-mono uppercase tracking-wider text-[var(--fg-subtle)] mt-6 mb-3">
              {locale === "ru" ? "Результат" : "Outcome"}
            </h4>
            {e.outcome[locale].map((o, i) => (
              <p key={i} className="text-sm">{o}</p>
            ))}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 not-prose mt-6">
              {e.metrics.map((m) => (
                <MetricCard
                  key={m.value}
                  value={m.value}
                  label={m.label[locale]}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <h2 id="process" className="mt-16">
        {locale === "ru" ? "Как мы работаем" : "How we work"}
      </h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4">
        {athenadev.process[locale].map((p, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-lg p-5 bg-[var(--bg-elevated)]"
          >
            <div className="font-mono text-xs text-[var(--accent)] mb-2">
              {p.step}
            </div>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 id="contact" className="mt-16">
        {locale === "ru" ? "Связаться" : "Get in touch"}
      </h2>
      <p>
        {locale === "ru"
          ? "Если хочется обсудить, как Claude Code или RAG могут помочь именно вам — пишите. Диагностический созвон бесплатный, без обязательств."
          : "If you'd like to talk through whether Claude Code or RAG fits your team — reach out. Diagnostic call is free, no obligation."}
      </p>
      <p>
        <a href={`mailto:${ui.contact.email}`}>{ui.contact.email}</a>
        {" · "}
        <a href={`https://t.me/${ui.contact.telegram}`}>@{ui.contact.telegram}</a>
        {" · "}
        <Link href={`/${locale}/contact`}>
          {locale === "ru" ? "все контакты" : "all contacts"}
        </Link>
      </p>
    </article>
  );
}
