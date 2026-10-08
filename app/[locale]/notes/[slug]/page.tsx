import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { notes } from "@/lib/notes";
import type { CodeSnippet } from "@/lib/case-studies";
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
  return { alternates: pageAlternates(locale, `/notes/${slug}`) };
}

export function generateStaticParams() {
  const slugs = notes.map((n) => n.slug);
  return [
    ...slugs.map((slug) => ({ locale: "en", slug })),
    ...slugs.map((slug) => ({ locale: "ru", slug })),
  ];
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const note = notes.find((n) => n.slug === slug);
  if (!note) notFound();

  return (
    <article className="prose">
      <Link
        href={`/${locale}/notes`}
        className="font-mono text-xs text-[var(--fg-subtle)] no-underline hover:text-[var(--fg)]"
      >
        ← {locale === "ru" ? "все заметки" : "all notes"}
      </Link>

      <div className="font-mono text-xs text-[var(--fg-subtle)] mt-6 mb-2">
        {note.date}
      </div>
      <h1 className="!mb-2">{note.title[locale]}</h1>
      <p className="text-xl text-[var(--fg-muted)] mt-1 mb-6 font-normal">
        {note.tagline[locale]}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-8 not-prose">
        {note.tags.map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>

      {note.body[locale].map((block, i) => {
        if (block.kind === "p") return <p key={i}>{block.value as string}</p>;
        if (block.kind === "h") return <h2 key={i}>{block.value as string}</h2>;
        if (block.kind === "ul") {
          return (
            <ul key={i}>
              {(block.value as string[]).map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.kind === "code") {
          const s = block.value as CodeSnippet;
          return <CodeBlock key={i} label={s.label[locale]} lang={s.lang} code={s.code} />;
        }
        return null;
      })}
    </article>
  );
}
