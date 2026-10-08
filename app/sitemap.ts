import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { locales } from "@/lib/i18n";
import { projects } from "@/lib/content";
import { notes } from "@/lib/notes";
import { absoluteUrl } from "@/lib/site";

/**
 * Static sitemap covering every locale of every route.
 *
 * Without this, a crawler only finds pages by following links, which on an
 * i18n site reliably leaves half the tree unindexed. Each entry carries
 * `alternates.languages` so Google treats the RU and EN versions as
 * translations of one page rather than duplicates competing with each other.
 */

const STATIC_ROUTES = ["", "/work", "/notes", "/stack", "/about", "/contact", "/athenadev"] as const;

function localeAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(`/${locale}${path}`)])
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Root redirect page.
  entries.push({
    url: absoluteUrl("/"),
    lastModified,
    changeFrequency: "monthly",
    priority: 1,
  });

  for (const path of STATIC_ROUTES) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}${path}`),
        lastModified,
        changeFrequency: path === "/notes" ? "weekly" : "monthly",
        // The landing page outranks sections; sections outrank leaves.
        priority: path === "" ? 1 : 0.8,
        alternates: { languages: localeAlternates(path) },
      });
    }
  }

  for (const project of projects) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}/work/${project.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates(`/work/${project.slug}`) },
      });
    }
  }

  for (const note of notes) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(`/${locale}/notes/${note.slug}`),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates(`/notes/${note.slug}`) },
      });
    }
  }

  return entries;
}
