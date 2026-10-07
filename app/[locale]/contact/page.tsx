import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { ui } from "@/lib/content";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const items = [
    {
      label: "Email",
      value: ui.contact.email,
      href: `mailto:${ui.contact.email}`,
    },
    {
      label: "Telegram",
      value: `@${ui.contact.telegram}`,
      href: `https://t.me/${ui.contact.telegram}`,
    },
    {
      label: "GitHub",
      value: `github.com/${ui.contact.github}`,
      href: `https://github.com/${ui.contact.github}`,
    },
    { label: "Site", value: ui.contact.site, href: `https://${ui.contact.site}` },
  ];

  return (
    <article className="prose">
      <h1>{locale === "ru" ? "Контакты" : "Contact"}</h1>
      <p>
        {locale === "ru"
          ? "Лучше всего — email или Telegram. Отвечаю в течение суток."
          : "Best reach: email or Telegram. I reply within 24 hours."}
      </p>

      <div className="not-prose mt-8 border border-[var(--border)] rounded-lg overflow-hidden">
        {items.map((it, i) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer noopener"
            className={`flex items-center justify-between gap-4 p-5 hover:bg-[var(--bg-elevated)] transition-colors ${
              i > 0 ? "border-t border-[var(--border)]" : ""
            }`}
          >
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
              {it.label}
            </div>
            <div className="font-mono text-sm text-[var(--fg)]">{it.value}</div>
          </a>
        ))}
      </div>

      <h2>{locale === "ru" ? "Что я ищу" : "What I'm looking for"}</h2>
      <ul>
        <li>
          {locale === "ru"
            ? "Senior AI Engineer / LLM Engineer / AI Tech Lead"
            : "Senior AI Engineer / LLM Engineer / AI Tech Lead"}
        </li>
        <li>
          {locale === "ru"
            ? "Продукты с LLM в центре, не как accessory"
            : "Products where LLMs are core, not an accessory"}
        </li>
        <li>
          {locale === "ru"
            ? "Удалённая работа или Москва. Готов к командировкам."
            : "Remote or Moscow. Open to travel."}
        </li>
        <li>
          {locale === "ru"
            ? "Full-time, контракт, advisor — открыт ко всем форматам"
            : "Full-time, contract, advisor — all formats welcome"}
        </li>
      </ul>
    </article>
  );
}
