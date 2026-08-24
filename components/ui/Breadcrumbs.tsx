import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * Breadcrumb trail for detail pages — orientation plus a BreadcrumbList
 * schema so search results show the path instead of a bare URL.
 *
 * The current page is the last item, rendered as text (linking a page to
 * itself is noise). Home is implicit as the first crumb.
 */
export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE.url}${c.href === '/' ? '' : c.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex flex-wrap items-center gap-3 font-mono text-2xs tracking-[0.06em] uppercase">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-3">
              {i > 0 ? (
                <span aria-hidden="true" className="text-disabled">
                  /
                </span>
              ) : null}
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="inline-flex min-h-[24px] items-center text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
                >
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className="text-secondary">
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
