import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { SERVICES } from '@/content/services';
import { ROLES_CONTENT } from '@/content/roles';
import { WORK } from '@/content/site';
import { CREW } from '@/content/crew';

/**
 * Only indexable routes appear here. `/start`, `/foundation` and non-public
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
    entry('/roles', 0.8, 'monthly'),
    entry('/work', 0.8, 'monthly'),
    entry('/network', 0.7, 'monthly'),
    entry('/engage', 0.7, 'monthly'),
    entry('/about', 0.7, 'monthly'),
    entry('/join', 0.6, 'monthly'),
    entry('/legal/disclosure', 0.5, 'monthly'),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 0.8, 'monthly')),
    ...ROLES_CONTENT.map((r) => entry(`/roles/${r.slug}`, 0.8, 'monthly')),
    ...WORK.map((w) => entry(`/work/${w.slug}`, 0.7, 'monthly')),
    ...CREW.filter((m) => m.tier === 'public').map((m) => entry(`/crew/${m.slug}`, 0.6, 'monthly')),
  ];
}
