import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SERVICES } from '@/content/services';
import { CREW } from '@/content/crew';

/**
 * Only indexable routes appear here. `/thank-you`, `/foundation` and non-public
 * crew profiles are deliberately absent — a sitemap that lists pages carrying
 * `noindex` sends contradictory signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly') => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry('', 1, 'weekly'),
    entry('/crew', 0.9, 'weekly'),
    entry('/services', 0.8, 'monthly'),
    entry('/partners', 0.7, 'monthly'),
    entry('/about', 0.7, 'monthly'),
    entry('/contact', 0.7, 'monthly'),
    entry('/join', 0.6, 'monthly'),
    entry('/legal/disclosure', 0.5, 'monthly'),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 0.8, 'monthly')),
    ...CREW.filter((m) => m.tier === 'public').map((m) => entry(`/crew/${m.slug}`, 0.6, 'monthly')),
  ];
}
