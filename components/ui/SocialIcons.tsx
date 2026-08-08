import { cn } from '@/lib/utils';

/**
 * Social marks for profile cards.
 *
 * Handles are not supplied yet, so these render as non-interactive placeholders
 * — muted, unlinked, aria-hidden. They read as a designed part of the card
 * rather than a broken link, and they hold the layout so nothing shifts when
 * the real handles land.
 *
 * To activate: pass `href` and the icon renders as an anchor. No other change.
 */

type Platform = 'x' | 'linkedin';

const PATHS: Record<Platform, { label: string; d: string; viewBox: string }> = {
  x: {
    label: 'X',
    viewBox: '0 0 24 24',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  linkedin: {
    label: 'LinkedIn',
    viewBox: '0 0 24 24',
    d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M2.4 21h5.16V9.24H2.4zm7.62 0h5.16v-6.36c0-3.36 4.32-3.63 4.32 0V21h5.16v-8.16c0-7.98-8.7-7.68-9.48-3.75V9.24h-5.16z',
  },
};

function Glyph({ platform }: { platform: Platform }) {
  const { d, viewBox } = PATHS[platform];
  return (
    <svg viewBox={viewBox} className="size-[15px]" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function SocialIcons({
  links,
  className,
}: {
  links?: { x?: string; linkedin?: string };
  className?: string;
}) {
  const platforms: Platform[] = ['x', 'linkedin'];

  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {platforms.map((platform) => {
        const href = links?.[platform];
        return (
          <li key={platform}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={PATHS[platform].label}
                className="block text-muted transition-colors duration-[var(--dur-fast)] ease-hover hover:text-text"
              >
                <Glyph platform={platform} />
              </a>
            ) : (
              <span className="block text-disabled" aria-hidden="true">
                <Glyph platform={platform} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
