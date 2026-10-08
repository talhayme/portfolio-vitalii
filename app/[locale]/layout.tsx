import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { isLocale, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Declare the canonical URL and the language alternates for every page under
 * a locale. Without hreflang the RU and EN versions of the same page look
 * like duplicates to a crawler and compete with each other instead of each
 * ranking for its own language.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  // Note: a partial `openGraph` here replaces the parent object wholesale
  // rather than merging, so url/siteName/type are restated.
  return {
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}`)])),
        "x-default": absoluteUrl("/en"),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Vitalii Bogachev",
      url: absoluteUrl(`/${locale}`),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      alternateLocale: locale === "ru" ? "en_US" : "ru_RU",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar locale={locale} />
      <main className="flex-1 md:ml-64 p-6 md:p-12 lg:p-16 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
