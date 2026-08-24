'use client';

import * as React from 'react';
import { EXECUTION_FLOW } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * The five-stage execution flow, selectable (client direction): tapping a
 * stage makes it the composition's accent — the cell fills with the primary
 * gold and its content flips to ink, the treatment defined in tokens.css
 * (`.flow-cell[data-active]`), so the state is a design-system fact rather
 * than a one-off.
 *
 * One stage is always selected (radio semantics, aria-pressed): the sequence
 * starts on 01, and reading it by clicking through is the intended use. The
 * rail and nodes are drawn here; their active state follows the selection.
 */
export function ExecutionFlow() {
  const [active, setActive] = React.useState(0);

  return (
    <ol className="grid gap-6 lg:grid-cols-5 lg:gap-5">
      {EXECUTION_FLOW.map((step, i) => {
        const isActive = i === active;
        const last = i === EXECUTION_FLOW.length - 1;
        return (
          <li key={step.index} className="relative pl-8 lg:pt-6 lg:pl-0">
            {/* rail: to the next cell on lg, down to it below */}
            {!last ? (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute bg-[linear-gradient(180deg,color-mix(in_oklab,var(--gold-500)_55%,transparent),color-mix(in_oklab,var(--gold-500)_20%,transparent))]',
                  'top-[26px] left-[13px] h-[calc(100%-4px)] w-px',
                  'lg:top-[13px] lg:left-[26px] lg:h-px lg:w-[calc(100%-6px)]',
                  'lg:bg-[linear-gradient(90deg,color-mix(in_oklab,var(--gold-500)_55%,transparent),color-mix(in_oklab,var(--gold-500)_20%,transparent))]',
                )}
              />
            ) : null}

            <span
              aria-hidden="true"
              data-active={isActive || undefined}
              className="flow-cell-node lg:left-[13px]"
            >
              {step.index}
            </span>

            <button
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              data-active={isActive || undefined}
              className={cn(
                'flow-cell w-full lg:pt-7',
                'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
              )}
            >
              {/* the order, readable before the words */}
              <span
                aria-hidden="true"
                className="flow-cell-mark pointer-events-none absolute -right-2 -bottom-4 font-label text-[64px] leading-none font-bold tabular-nums"
              >
                {step.index}
              </span>
              <span className="flow-cell-title relative block font-medium">{step.title}</span>
              <span className="flow-cell-body relative mt-3 block text-sm">{step.body}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
