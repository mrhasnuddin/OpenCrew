'use client';

import * as React from 'react';
import { HeroWave } from '@/components/ui/dynamic-wave-canvas-background';

/**
 * The hero's first-viewport backdrop: the two-colour wave field, covering
 * exactly one viewport from the top of the page (it runs up behind the
 * translucent header), and blending out at the fold two ways:
 *
 *  1. a static gradient over its lower third into the canvas black, so the
 *     edge is never visible at rest;
 *  2. opacity tied to scroll — by the time the fold has passed, the field is
 *     gone, so nothing wave-like leaks behind the sections below.
 *
 * A soft dark vignette sits behind the centred copy so the headline, lead and
 * eyebrow keep their contrast whatever the field is doing underneath.
 */
export function HeroBackdrop() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.offsetHeight || window.innerHeight;
      // fully visible at the top; gone once 70% of the first viewport has scrolled
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.7)));
      el.style.opacity = String(1 - p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[-64px] z-0 h-[100svh] overflow-hidden"
    >
      <HeroWave />
      {/* copy vignette: keeps the centred text block on a calmer ground */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 42%, rgb(0 0 0 / 0.55) 0%, rgb(0 0 0 / 0.25) 45%, transparent 75%)',
        }}
      />
      {/* fold blend: the field dissolves into the canvas before the fold */}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, var(--color-canvas) 100%)' }}
      />
    </div>
  );
}
