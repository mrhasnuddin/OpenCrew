import Link from 'next/link';
import Image from 'next/image';
import { getCrewMember } from '@/content/crew';

/**
 * Curated crew strip for the landing page — proof, not a directory.
 *
 * Placed directly after "Participation standards": the section states that
 * every member holds a real, verifiable seat, and this strip is the standard
 * applied to ourselves — leadership and advisors under their own names and
 * faces. Browsing, filtering and shortlisting stay on /crew, which is why this
 * card is a plain link and not the full CrewCard (no availability dot, no
 * add-to-crew — those are hiring tools, and mid-narrative nobody is hiring yet).
 *
 * FEATURED is an explicit list, not `CREW.filter(has portrait)`: who fronts the
 * landing page is an editorial decision, and a data edit shouldn't change it
 * silently. Amir Leo joins the moment his portrait lands — add the slug here.
 * Every slug must resolve to a real listed member; build fails otherwise.
 */
const FEATURED = ['adam-gee', 'ak', 'dean', 'arion'] as const;

export function FeaturedCrew() {
  const members = FEATURED.map((slug) => {
    const m = getCrewMember(slug);
    if (!m) throw new Error(`FeaturedCrew: unknown crew slug "${slug}"`);
    return m;
  });

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m) => (
        <li key={m.slug}>
          <Link
            href={`/crew/${m.slug}`}
            className="group flex h-full flex-col rounded-md border border-border bg-surface p-6 transition-[border-color,transform] duration-[var(--dur-base)] ease-out focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px] [@media(hover:hover)_and_(pointer:fine)]:hover:border-border-strong"
          >
            {/* 120px square: the 268px source crops stay ≥2× sharp. Square, not
                circle, matching the crew card's rationale. Name sits adjacent,
                so the image is decorative. */}
            {m.portrait ? (
              <Image
                src={m.portrait}
                alt=""
                width={120}
                height={120}
                sizes="120px"
                className="size-[120px] rounded-md border border-border object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-[120px] items-center justify-center rounded-md border border-gold-950 bg-ink-800 text-2xl font-medium text-ink-300"
              >
                {m.initials}
              </span>
            )}
            <p className="mt-5 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
              {m.roleCode}
            </p>
            <h3 className="mt-2 text-lg font-medium text-text">{m.displayName}</h3>
            <p className="mt-1 text-sm text-muted">{m.role}</p>
            <p className="mt-3 line-clamp-2 text-sm text-secondary">{m.headline}</p>
            <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-secondary transition-colors duration-[var(--dur-fast)] ease-hover group-hover:text-text">
              View profile
              <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
                <path
                  d="M3 9 9 3M4.5 3H9v4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
