/**
 * Canonical location of this site — the single place to change when the
 * domain changes.
 *
 * Today the site is served from a GitHub Pages subpath. When a custom domain
 * is bought, set SITE_URL in the build environment (and PAGES_BASE_PATH="")
 * and every canonical URL, sitemap entry and Open Graph tag follows.
 *
 * Getting this wrong is not cosmetic: a canonical pointing at a domain the
 * page is not served from tells search engines the real copy lives elsewhere,
 * and the page may not get indexed at all.
 */

const FALLBACK_ORIGIN = "https://talhayme.github.io";

/** Origin without a trailing slash, e.g. "https://example.com". */
export const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_ORIGIN).replace(/\/$/, "");

/** Path prefix the app is mounted under, e.g. "/portfolio-vitalii" or "". */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Full public base, origin + basePath, no trailing slash. */
export const siteUrl = `${siteOrigin}${basePath}`;

/** Build an absolute URL for a route path like "/en/notes". */
export function absoluteUrl(path = "/"): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${suffix === "/" ? "/" : suffix}`;
}

/**
 * Canonical URL plus hreflang alternates for one page.
 *
 * Next replaces `alternates` wholesale when a child route declares it, so a
 * page that sets only `canonical` silently drops the `languages` map from the
 * layout. Building both together here keeps them from diverging.
 */
export function pageAlternates(locale: string, path = "") {
  const locales = ["en", "ru"];
  return {
    canonical: absoluteUrl(`/${locale}${path}`),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(`/${l}${path}`)])),
      "x-default": absoluteUrl(`/en${path}`),
    },
  };
}
