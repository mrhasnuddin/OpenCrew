'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Hero media card — the reference's pattern: the showreel sits BELOW the
 * headline as a rounded media object whose top edge crosses the fold, not
 * behind it as a scrimmed backdrop. Photography at full brightness (no scrim
 * needed now that no text sits on it), the same six client-curated slides.
 *
 * Motion: crossfade plus a slow drift-scale on the active slide (1.06 → 1
 * over the hold) — the still-photo equivalent of the reference's video, and
 * cheap: transform + opacity only. Reduced motion pins slide 0, no drift.
 * A hidden tab doesn't advance.
 *
 * Slide 0 is priority — it IS the hero's first paint. All slides are in the
 * DOM from the start (in-viewport fill images), so crossfades land on decoded
 * pixels.
 */

const SLIDES = [
  '/showcase/web/gala-panel.webp',
  '/showcase/web/team-office.webp',
  '/showcase/web/team-group.webp',
  '/showcase/web/summit-stage.webp',
  '/showcase/web/bali-stage.webp',
  '/showcase/web/workshop.webp',
];

const HOLD_MS = 6000;
const FADE_MS = 1200;

export function HeroSlideshow({ className }: { className?: string }) {
  const [active, setActive] = React.useState(0);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    const id = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      setActive((a) => (a + 1) % SLIDES.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'card-glass relative overflow-hidden rounded-xl bg-ink-1000',
        // Lifts the card off the canvas: a deep drop shadow plus a faint gold
        // under-glow, so the media reads as an object rather than a cut-out.
        'shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.06),0_30px_80px_-40px_color-mix(in_oklab,var(--gold-500)_35%,transparent)]',
        // Tall enough to cross the fold on any desktop; capped so the card
        // never becomes a second full-viewport hero.
        'h-[clamp(360px,62svh,760px)]',
        className,
      )}
    >
      {SLIDES.map((src, i) => {
        const isActive = i === active;
        return (
          <div
            key={src}
            className="absolute inset-0 motion-reduce:transition-none"
            style={{
              opacity: isActive ? 1 : 0,
              // Drift: the incoming slide starts slightly zoomed and settles
              // over the whole hold, so it's always gently alive.
              transform: reduced ? 'none' : isActive ? 'scale(1)' : 'scale(1.06)',
              transition: `opacity ${FADE_MS}ms var(--ease-in-out), transform ${HOLD_MS + FADE_MS}ms linear`,
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1600px) 1520px, 94vw"
              className="object-cover"
            />
          </div>
        );
      })}
      {/* Hairline top sheen only — the glass card's own; no scrim. */}
    </div>
  );
}
