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
  return { alternates: pageAlternates(locale, "/about") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <article className="prose">
      <h1>{locale === "ru" ? "Обо мне" : "About"}</h1>
      <p className="text-xl text-[var(--fg-muted)] -mt-2 mb-8">
        {locale === "ru"
          ? "Как 13 лет инженерного опыта привели к LLM-продуктам в продакшене — и почему AI-часть держится именно на этом фундаменте."
          : "How 13 years of engineering led to LLM products in production — and why the AI work holds up precisely because of that foundation."}
      </p>

      {ui.about.paragraphs[locale].map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      <h2>{locale === "ru" ? "Образование" : "Education"}</h2>
      <ul>
        <li>
          <strong>2024</strong> — Russian State Social University, Jurisprudence / Social services
        </li>
        <li>
          <strong>2020</strong> — RUDN University, Jurisprudence / Corporate Law
        </li>
        <li>
          <strong>2015</strong> — RUDN University, Mathematics and Computer Science
        </li>
      </ul>

      <h2>{locale === "ru" ? "Языки" : "Languages"}</h2>
      <ul>
        <li>{locale === "ru" ? "Русский — родной" : "Russian — native"}</li>
        <li>{locale === "ru" ? "Английский — C1, ежедневная работа" : "English — C1, daily work language"}</li>
        <li>{locale === "ru" ? "Французский — A2" : "French — A2"}</li>
      </ul>
    </article>
  );
}
