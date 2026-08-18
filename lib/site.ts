/**
 * Site-level configuration. The production domain is still a placeholder —
 * set NEXT_PUBLIC_SITE_URL at deploy time and canonical URLs, the sitemap,
 * robots.txt and OG image URLs all follow from one value.
 */

export const SITE = {
  name: 'OPENCREW Labs',
  shortName: 'OPENCREW',
  /** 【replace at deploy: NEXT_PUBLIC_SITE_URL】 */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opencrew.example',
  title: 'OPENCREW Labs · Your Global Team for Web3 & AI',
  description:
    'A global team and growth partner for Web3, AI and new finance. We deploy international executives, advisors and regional leadership, with institutional access and overseas market execution.',
  locale: 'en',
} as const;

/**
 * Organization schema. Deliberately minimal: no `sameAs` until real social
 * URLs exist, no `address` until the entity details are settled, no `founder`
 * entries beyond what /about already states publicly. Structured data that
 * overstates is the same problem as marketing copy that overstates — it is
 * just machine-readable.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    slogan: 'Global Team. Global Access. Global Execution.',
  };
}
