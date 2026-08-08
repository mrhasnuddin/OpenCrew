import { OC_ASCII } from '@/content/ascii';
import { cn } from '@/lib/utils';

/**
 * The OC mark as an ASCII texture.
 *
 * `aria-hidden` and `select-none`: it is decoration, and a screen reader
 * reading 2,300 punctuation characters would be a genuine accessibility
 * failure, not a quirk.
 *
 * Sized in `cqw` so it scales with its container rather than the viewport —
 * the panel it sits in is not full-bleed.
 */
export function AsciiMark({ className }: { className?: string }) {
  return (
    <pre
      aria-hidden="true"
      className={cn(
        'pointer-events-none font-mono whitespace-pre select-none tracking-[0.02em]',
        // Font size and leading MUST travel together as `text-[…]/[…]`.
        // As separate classes, tailwind-merge drops the `leading-*` — a
        // font-size utility can also carry line-height (`text-base/6`), so it
        // treats them as conflicting and keeps only the last. The block then
        // inherits the 26px body leading and stretches to ~2.7× its height.
        //
        // 1.22 is derived, not guessed: 104 cols × 0.62em advance = 64.5em wide;
        // ÷ 1.816 (the mark's true aspect) = 35.5em tall; ÷ 29 rows = 1.22.
        'text-[clamp(3px,1.35cqw,9px)]/[1.22]',
        className,
      )}
    >
      {OC_ASCII}
    </pre>
  );
}
