import Link from 'next/link';
import Image from 'next/image';
import { getCrewMember, type CrewMember } from '@/content/crew';
import { cn } from '@/lib/utils';

/**
 * Landing crew section, two tiers (client annotation):
 *
 *  — LEADS: Amir Leo and Dean as two 50/50 hero cards. Landscape, portrait
 *    on the left third, credentials on the right — the reference's expert
 *    card at full width.
 *  — BENCH: the other three as a minimal full-width row. Thumbnail + name
 *    are the priority; role and one headline line are what I judged worth
 *    keeping (the credential that answers "why is this person here").
 *
 * Both lists are explicit, not derived: who leads is an editorial decision
 * and a data edit shouldn't change it silently. Every slug must resolve to a
 * real listed member; the build fails otherwise.
 */
const LEADS = ['amir-leo', 'dean'] as const;
const BENCH = ['adam-gee', 'ak', 'arion'] as const;

function resolve(slugs: readonly string[]): CrewMember[] {
  return slugs.map((slug) => {
    const m = getCrewMember(slug);
    if (!m) throw new Error(`FeaturedCrew: unknown crew slug "${slug}"`);
    return m;
  });
}

const CARD = cn(
  'card-glass card-glass-hover group flex h-full overflow-hidden rounded-xl',
  'transition-[border-color,transform] duration-[var(--dur-base)] ease-out',
  'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
  '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]',
);

function Portrait({ m, sizes, className }: { m: CrewMember; sizes: string; className?: string }) {
  return (
    <span className={cn('relative block shrink-0 overflow-hidden', className)}>
      {m.portrait ? (
        <Image
          src={m.portrait}
          alt=""
          fill
          sizes={sizes}
          // The portraits are 1:1 crops with the head in the upper part of the
          // frame (Dean's is a stage shot, head at ~20% down). Whenever the box
          // is not square, cover from a top-biased anchor so the crop takes the
          // feet, never the head. Centre anchoring cut Dean off at the eyes on
          // mobile (client annotation).
          className="object-cover object-[50%_18%] transition-transform duration-[var(--dur-slow)] ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-ink-800 text-3xl font-medium text-ink-300">
          {m.initials}
        </span>
      )}
    </span>
  );
}

function Arrow() {
  return (
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
  );
}

export function FeaturedCrew() {
  const leads = resolve(LEADS);
  const bench = resolve(BENCH);

  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      {/* ------------------------------------------------- tier 1: the leads */}
      {/* `min-w-0` on every grid item: a grid item's default min-width is auto
          (its min-content), so a nowrap line inside one card widens the whole
          track past the viewport. That was the 438px page on a 375px phone. */}
      <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {leads.map((m) => (
          <li key={m.slug} className="min-w-0">
            <Link href={`/crew/${m.slug}`} className={cn(CARD, 'flex-col sm:flex-row')}>
              {/* Portrait owns the left third on sm+; a 4:3 banner on mobile
                  (top-anchored, see Portrait) so the head is always in frame. */}
              <Portrait
                m={m}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 100vw"
                className="aspect-[4/3] w-full sm:aspect-auto sm:w-[38%] sm:min-h-[300px]"
              />
              <span className="flex min-w-0 flex-1 flex-col p-6 lg:p-7">
                <span className="eyebrow text-accent-text">{m.roleCode}</span>
                <span className="mt-3 block text-2xl font-bold text-text lg:text-3xl">
                  {m.displayName}
                </span>
                <span className="mt-1 block text-secondary">{m.role}</span>
                <span className="mt-4 block text-sm text-secondary">{m.headline}</span>
                <span className="mt-5 flex flex-wrap gap-2">
                  {m.capabilities.slice(0, 3).map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-[color-mix(in_oklab,var(--gold-500)_45%,transparent)] bg-accent-subtle px-4 py-1.5 font-mono text-2xs tracking-[0.06em] text-accent-text uppercase"
                    >
                      {c}
                    </span>
                  ))}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-secondary transition-colors duration-[var(--dur-fast)] ease-hover group-hover:text-text">
                  View profile
                  <Arrow />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* ------------------------------------------------ tier 2: the bench */}
      <ul className="grid gap-5 sm:grid-cols-3 lg:gap-6">
        {bench.map((m) => (
          <li key={m.slug} className="min-w-0">
            <Link href={`/crew/${m.slug}`} className={cn(CARD, 'min-w-0 items-center gap-5 p-5')}>
              <Portrait
                m={m}
                sizes="96px"
                className="size-[96px] rounded-md"
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="block truncate text-lg font-bold text-text">{m.displayName}</span>
                {/* Role wraps on phones (a 180px column truncated every role);
                    one line with an ellipsis from sm up where the row is wide. */}
                <span className="mt-1 block text-sm text-secondary sm:truncate">{m.role}</span>
                <span className="mt-2 block truncate text-xs text-muted">{m.credentials[0]}</span>
              </span>
              <span className="shrink-0 text-muted transition-colors duration-[var(--dur-fast)] ease-hover group-hover:text-text">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
