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
 *
 * Pagination sits at the bottom centre: it says how many slides there are —
 * otherwise a crossfade with no edges reads as one restless photograph — and
 * each dot is a real button, so a reader who wants a particular frame is not
 * made to wait six seconds a slide for it. Choosing a slide stops the
 * auto-advance: the reader has taken over, and a carousel that keeps moving
 * under a deliberate choice is the classic carousel sin.
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
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }
    if (paused) return;
    const id = setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      setActive((a) => (a + 1) % SLIDES.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="OPENCREW at work"
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
            aria-hidden="true"
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
      {/* ------------------------------------------------------- pagination */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-6">
        {/* A short scrim only under the dots, so they hold on a bright frame
            without putting a wash over the photograph. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[110px] bg-[linear-gradient(0deg,rgb(0_0_0/0.55),transparent)]"
        />
        <div className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-[rgb(255_255_255/0.14)] bg-[rgb(0_0_0/0.45)] px-3 py-2 backdrop-blur-[8px]">
          {SLIDES.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={src}
                type="button"
                aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                aria-current={isActive}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                // The mark stays a dot; the target around it is what grows,
                // to the 44px a thumb needs on a touch screen.
                className="group/dot flex size-[28px] items-center justify-center rounded-full [@media(pointer:coarse)]:size-[44px] focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2"
              >
                <span
                  className={cn(
                    'block h-[6px] rounded-full transition-[width,background-color] duration-[var(--dur-base)] ease-hover',
                    isActive
                      ? 'w-[22px] bg-accent'
                      : 'w-[6px] bg-[rgb(255_255_255/0.45)] group-hover/dot:bg-[rgb(255_255_255/0.8)]',
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
