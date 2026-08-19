/**
 * Brandfetch Logo API — https://docs.brandfetch.com/logo-api/overview
 *
 * Free, no attribution required, authenticated by a public client ID passed
 * as `?c=`. Rules that shape this module:
 *  - Marks must be hotlinked in browser <img> tags with a Referer; no
 *    server-side fetching or re-hosting. So this file only BUILDS URLs.
 *  - `theme/light` = a light mark for dark backgrounds (our canvas is black).
 *    Brandfetch's naming is by the mark's colour, not the background.
 *  - `fallback/404` makes a missing mark a real 404 so the <img> onError
 *    fires and our own monogram plate takes over, instead of Brandfetch's
 *    lettermark or its own logo appearing on our wall.
 *
 * The client ID is NEXT_PUBLIC_ because the browser must carry it. It is not
 * a secret (it is visible in every image URL) but it is still per-account:
 * keep it in env, never in source.
 */
export const BRANDFETCH_CLIENT_ID = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID ?? '';

export const brandfetchEnabled = () => BRANDFETCH_CLIENT_ID.length > 0;

export type BrandfetchType = 'logo' | 'icon' | 'symbol';

export function brandfetchLogoUrl(
  domain: string,
  {
    type = 'logo',
    theme = 'light',
    h,
    w,
  }: { type?: BrandfetchType; theme?: 'light' | 'dark'; h?: number; w?: number } = {},
): string | null {
  if (!brandfetchEnabled() || !domain) return null;
  // Short form (`/{domain}`), not the docs' explicit `/domain/{domain}`
  // routing: probed 2026-08-18, the explicit prefix 302s to the usage
  // guidelines on this account while the short form serves the mark.
  const parts = [`https://cdn.brandfetch.io/${encodeURIComponent(domain)}`];
  if (w) parts.push(`w/${w}`);
  if (h) parts.push(`h/${h}`);
  parts.push(`theme/${theme}`, 'fallback/404', `type/${type}`);
  return `${parts.join('/')}?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
}
