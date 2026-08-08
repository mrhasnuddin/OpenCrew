'use client';

import { buttonClasses } from '@/components/ui/Button';

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          // Respect the motion preference — a 14,000px smooth scroll is exactly
          // the kind of movement that triggers vestibular discomfort.
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      className={buttonClasses('secondary', 'md', 'gap-3')}
    >
      Back to top
      <svg viewBox="0 0 12 12" className="size-[12px]" aria-hidden="true">
        <path
          d="M6 10V2M2.5 5.5 6 2l3.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
