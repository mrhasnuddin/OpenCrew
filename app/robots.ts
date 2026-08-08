import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/start', // intake engine — no indexable content, and it holds form state
        '/foundation', // design-system proof, not a public page
        '/crew?', // filtered permutations; the canonical /crew is indexed
      ],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
