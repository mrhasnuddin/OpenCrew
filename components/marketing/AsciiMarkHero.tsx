'use client';

import * as React from 'react';
import { OC_ASCII_HERO } from '@/content/ascii';
import { cn } from '@/lib/utils';

/**
 * The OC mark in ASCII, tilting in 3D toward the cursor.
 *
 * Deliberately NOT Framer Motion. Two reasons:
 *
 * 1. Bundle. This is a static import in the home page, so pulling `motion` in
 *    here would put ~46 kB back into the initial bundle — the exact cost we
 *    removed by deferring the capability icons.
 * 2. It's a worse fit. A CSS transition on `transform` retargets continuously
 *    as the pointer moves, which is precisely the trailing, springy feel we
 *    want, and it runs on the compositor rather than through React.
 *
 * The handler writes `transform` straight to the element — no React state, so
 * pointer movement never triggers a render, and no CSS custom property on a
 * parent, which would force a style recalc on every child.
 *
 * Tilt is small (±9° / ±7°): the mark should read as a physical object catching
 * the light, not as a rotating widget.
 */

const MAX_Y = 9; // deg, left ↔ right
const MAX_X = 7; // deg, up ↕ down

export function AsciiMarkHero({ className }: { className?: string }) {
  const ref = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      // Re-read per event so a preference change applies immediately, and so
      // touch (which synthesises hover) never drives this.
      if (
        !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      // Written straight to the element. No rAF wrapper: mousemove already
      // fires at roughly frame cadence, this is a pure style write with no
      // layout read to batch, and the engine coalesces writes before paint.
      // (An rAF wrapper also silently does nothing on a backgrounded tab,
      // where rAF is suspended.)
      const x = e.clientX / window.innerWidth - 0.5; // −0.5 … 0.5
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateX(${(-y * 2 * MAX_X).toFixed(2)}deg) rotateY(${(x * 2 * MAX_Y).toFixed(2)}deg)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className={cn('@container flex w-full items-center justify-center', className)}
      // Perspective belongs on the parent — on the element itself it flattens.
      style={{ perspective: 1100 }}
      aria-hidden="true"
    >
      <pre
        ref={ref}
        className={cn(
          'pointer-events-none font-mono whitespace-pre select-none',
          // Font size and leading MUST travel together as `text-[…]/[…]`: as
          // separate classes tailwind-merge drops the leading, because a
          // font-size utility can also carry line-height (`text-base/6`).
          // 1.22 keeps the 128×35 grid at the mark's true 1.816 aspect, and
          // 1.24cqw fills the column (128 cols × 0.62em advance ≈ 79em).
          'text-[clamp(4px,1.24cqw,16px)]/[1.22]',
          'text-accent',
          // Long, eased transition = the trailing feel a spring would give.
          // Transitions retarget mid-flight; keyframes would restart from zero.
          'transition-transform duration-[500ms] ease-out',
          'motion-reduce:transition-none',
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {OC_ASCII_HERO}
      </pre>
    </div>
  );
}
