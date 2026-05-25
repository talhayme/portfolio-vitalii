"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: Locale;
}) {
  const pathname = usePathname() ?? `/${currentLocale}`;

  const swap = (target: Locale) => {
    if (pathname === `/${currentLocale}`) return `/${target}`;
    return pathname.replace(`/${currentLocale}`, `/${target}`);
  };

  return (
    <div className="flex gap-2 font-mono text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={swap(l)}
          className={`px-2 py-1 rounded border transition-colors ${
            l === currentLocale
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
