import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/lib/content";
import { pageAlternates } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "/stack") };
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="prose">
      <h1>{locale === "ru" ? "Стек" : "Stack"}</h1>
      <p>
        {locale === "ru"
          ? "То, с чем работаю в продакшене. Сгруппировано по слоям. Не все технологии я использую ежедневно — но во всех писал production-код, не туториалы."
          : "Production-grade tools I work with. Grouped by layer. Not everything is daily — but everything below has shipped real code, not tutorial output."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 not-prose">
        {ui.stackCategories.map((cat) => (
          <div
            key={cat.title.en}
            className="border border-[var(--border)] rounded-lg p-5 bg-[var(--bg-elevated)]"
          >
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--fg-subtle)] mb-3">
              {cat.title[locale]}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
