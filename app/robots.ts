import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/foundation', // design-system proof, not a public page
        '/crew?', // filtered permutations; the canonical /crew is indexed
        '/thank-you', // post-submission page — an orphan in search results
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
