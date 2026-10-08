"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { ui, projects } from "@/lib/content";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Sidebar({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;

  const items: { href: string; label: string }[] = [
    { href: `/${locale}`, label: ui.nav.home[locale] },
    { href: `/${locale}/athenadev`, label: ui.nav.athenadev[locale] },
    { href: `/${locale}/work`, label: ui.nav.work[locale] },
    { href: `/${locale}/notes`, label: ui.nav.notes[locale] },
    { href: `/${locale}/stack`, label: ui.nav.stack[locale] },
    { href: `/${locale}/about`, label: ui.nav.about[locale] },
    { href: `/${locale}/contact`, label: ui.nav.contact[locale] },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full md:w-64 md:shrink-0 md:fixed md:h-screen md:overflow-y-auto border-b md:border-b-0 md:border-r border-[var(--border)] p-6 md:p-8 bg-[var(--bg)]">
      <div className="flex flex-col h-full">
        <Link href={`/${locale}`} className="block mb-8 group">
          <div className="font-mono text-xs text-[var(--fg-subtle)] mb-1">
            {locale === "ru" ? "Портфолио" : "Portfolio"} / v1
          </div>
          <div className="text-base font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
            {locale === "ru" ? ui.hero.nameRu : ui.hero.name}
          </div>
          <div className="text-xs text-[var(--fg-muted)] mt-1">
            Senior AI Engineer · LLM · RAG · MCP
          </div>
        </Link>

        <nav className="flex flex-col gap-1 mb-8">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm py-1.5 px-2 -mx-2 rounded transition-colors ${
                isActive(item.href)
                  ? "text-[var(--fg)] bg-[var(--bg-elevated)] font-medium"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* External: the blog is a separate site, so it is a plain anchor. */}
          <a
            href={ui.blogUrl}
            className="text-sm py-1.5 px-2 -mx-2 rounded transition-colors text-[var(--fg-muted)] hover:text-[var(--fg)] flex items-center gap-1.5"
          >
            {ui.nav.blog[locale]}
            <span aria-hidden className="text-[var(--fg-subtle)] text-xs">↗</span>
          </a>
        </nav>

        <div className="mb-6">
          <div className="font-mono text-xs text-[var(--fg-subtle)] uppercase tracking-wider mb-2">
            {locale === "ru" ? "Кейсы" : "Case studies"}
          </div>
          <nav className="flex flex-col gap-1">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/${locale}/work/${p.slug}`}
                className={`text-sm py-1 px-2 -mx-2 rounded transition-colors ${
                  pathname === `/${locale}/work/${p.slug}`
                    ? "text-[var(--fg)] bg-[var(--bg-elevated)] font-medium"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {p.company}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-6 border-t border-[var(--border)]">
          <LocaleSwitcher currentLocale={locale} />
          <div className="mt-4 font-mono text-[10px] text-[var(--fg-subtle)] leading-relaxed">
            © {new Date().getFullYear()} Vitalii Bogachev
            <br />
            athenadev.tech
          </div>
        </div>
      </div>
    </aside>
  );
}
