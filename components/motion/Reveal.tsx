'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Scroll-triggered reveal — the reference's second signature after smooth
 * scroll: content arrives as the reader reaches it, on a soft rise, and stays.
 *
 * IntersectionObserver + CSS transitions, no animation library: the reference
 * uses GSAP/ScrollTrigger for this, but for reveals alone that's ~70 kB of
 * runtime to do what one observer and one transition already do on the
 * compositor. `motion` (Framer) is in the project but deliberately kept OUT of
 * the shared bundle; a site-wide reveal would drag it in on every route.
 *
 * Variants:
 *  — 'up'   : fade + 24px rise (default; sections, cards, paragraphs)
 *  — 'mask' : clip-path wipe from the bottom (headlines — mimics the
 *             reference's masked line reveal without splitting text into
 *             spans, which would break screen-reader phrasing)
 *  — 'fade' : opacity only (media, logos)
 *
 * `delay` staggers siblings; `once` (default true) means it never un-reveals.
 * Reduced motion: everything is visible immediately — the global rule in
 * tokens.css zeroes transition durations, so this degrades to instant.
 *
 * SSR renders the pre-reveal state, so nothing flashes; if JS never arrives,
 * a `.no-js` fallback isn't needed because IntersectionObserver is universal
 * in the browsers this site targets.
 */
type Variant = 'up' | 'mask' | 'fade';

export function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  once = true,
  threshold = 0.18,
  className,
  children,
}: {
  as?: 'div' | 'section' | 'span' | 'li' | 'ul' | 'header' | 'p' | 'h1' | 'h2' | 'h3';
  variant?: Variant;
  delay?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(el);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    // Safety net: an element already in the viewport at mount must never stay
    // hidden if the observer is deferred (background tab, throttled frame,
    // an embedded preview). If it's on screen 1.2s after mount, show it.
    const fallback = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setShown(true);
    }, 1200);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [once, threshold]);

  const Comp = Tag as React.ElementType;

  return (
    <Comp
      ref={ref}
      data-reveal={variant}
      data-shown={shown ? '' : undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Comp>
  );
}
