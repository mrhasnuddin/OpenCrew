import Link from 'next/link';
import { ROLE_LABELS, type CrewRoleSlug } from '@/content/crew';
import { cn } from '@/lib/utils';

/**
 * Browse-by-role rail — the reference marketplace's "most popular in this
 * category" row: a horizontal strip of plates that drop you straight into a
 * filtered directory. It is the fast path past the filter panel, and it
 * doubles as a statement of what the roster actually contains.
 *
 * Every plate is a real link that sets `?role=`, so it works without
 * JavaScript, is shareable, and the back button undoes it. Only roles that at
 * least one listed member holds are rendered — the row is built from the same
 * facets as the filters, never from a hardcoded list.
 */
export function RoleBrowse({ roles, active }: { roles: string[]; active?: string[] }) {
  if (roles.length < 2) return null;

  return (
    <ul className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {roles.map((slug) => {
        const isActive = active?.includes(slug);
        return (
          <li key={slug} className="shrink-0">
            <Link
              href={isActive ? '/crew' : `/crew?role=${slug}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'card-glass flex h-[64px] items-center gap-4 rounded-md px-5',
                'transition-[border-color,background-color,color] duration-[var(--dur-base)] ease-hover',
                'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                isActive
                  ? 'card-glass-open text-text'
                  : 'text-secondary hover:border-border-strong hover:text-text',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'shrink-0 transition-colors duration-[var(--dur-base)] ease-hover',
                  isActive ? 'text-accent-text' : 'text-muted',
                )}
              >
                <RoleGlyph slug={slug as CrewRoleSlug} />
              </span>
              <span className="text-sm font-medium whitespace-nowrap">
                {ROLE_LABELS[slug as CrewRoleSlug] ?? slug}
              </span>
              <svg viewBox="0 0 12 12" className="size-[12px] shrink-0" aria-hidden="true">
                <path
                  d={isActive ? 'M3 3l6 6M9 3l-6 6' : 'M2.5 6h7M6.5 3l3 3-3 3'}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** 20×20, 1.5 stroke — the same drawing language as the standards icons. */
function RoleGlyph({ slug }: { slug: CrewRoleSlug }) {
  const paths: Record<CrewRoleSlug, string> = {
    'ceo-coo': 'M10 3.5 16.5 7v6L10 16.5 3.5 13V7L10 3.5Zm0 4.2L13 9.2v3L10 13.8 7 12.2v-3l3-1.5Z',
    'cto-product': 'M7 6.5 3.5 10 7 13.5M13 6.5 16.5 10 13 13.5M11.5 4.5l-3 11',
    'cmo-growth': 'M3.5 13.5 7.5 9l3 2.6 5.5-6M12.5 5.5h4v4',
    advisor: 'M10 3.5 16.5 6.2v4.6c0 3.4-2.7 5.8-6.5 6.7-3.8-.9-6.5-3.3-6.5-6.7V6.2L10 3.5Z',
    consultant: 'M4 5.5h8M4 9.5h8M4 13.5h5m3.5-1.2 1.9 1.9 3.1-3.4',
    'regional-lead':
      'M10 17s5.5-5 5.5-9A5.5 5.5 0 0 0 4.5 8c0 4 5.5 9 5.5 9Zm0-7.6a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z',
    'community-lead':
      'M7.6 9.2a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6ZM13 9.6a1.9 1.9 0 1 0 0-3.8M3.2 15.6c0-2.2 2-3.6 4.4-3.6s4.4 1.4 4.4 3.6M14 12.4c1.7.3 2.9 1.4 2.9 3.2',
    spokesperson:
      'M10 10.2v.1M6.2 6.4a5.4 5.4 0 0 0 0 7.2M13.8 6.4a5.4 5.4 0 0 1 0 7.2M3.6 3.8a9 9 0 0 0 0 12.4M16.4 3.8a9 9 0 0 1 0 12.4',
  };
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[slug] ?? paths.consultant} />
    </svg>
  );
}
