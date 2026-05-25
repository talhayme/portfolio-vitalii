import { notFound } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
