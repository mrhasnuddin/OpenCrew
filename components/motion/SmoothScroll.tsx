'use client';

import * as React from 'react';
import Lenis from 'lenis';

/**
 * Lenis smooth scroll — the single biggest contributor to the "premium agency"
 * feel of the reference (Cuberto runs Lenis; the `lenis` class on their <html>
 * is its fingerprint). It interpolates the wheel so every scroll-linked effect
 * on the page — reveals, the partner marquee's parallax, the header's scrolled
 * state — moves on a curve instead of in steps.
 *
 * Deliberately NOT applied when the user asks for reduced motion, and never
 * on touch devices: Lenis leaves native touch scrolling alone by default, and
 * that is the correct call — synthetic scroll on a phone fights the OS.
 *
 * Renders nothing. Mount once, in the root layout.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Same curve as our --ease-out token, expressed as a function.
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // In-page anchors (nav → #section) should ride the same curve.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"], a[href^="/#"]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const id = href.slice(href.indexOf('#') + 1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      // Only intercept when we're already on the page that holds the target.
      if (href.startsWith('/#') && window.location.pathname !== '/') return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -64 });
      history.pushState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
