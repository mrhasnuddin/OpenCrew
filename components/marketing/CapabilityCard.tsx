'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardLink } from '@/components/ui/Card';

/**
 * Capability card.
 *
 * This is the one place on the site where icons earn their keep: six abstract
 * services in a grid, where a glyph does real work differentiating them at a
 * glance. Icons are deliberately NOT used in the mega-panel — that lives in the
 * Header, and pulling `motion` into the shared bundle for every route is not
 * worth a hover flourish.
 *
 * Animation is driven by hovering the CARD, not the 26px glyph, which would be
 * a miss target. The icon chunk is deferred: statically imported, `motion` cost
 * the home page 46 kB and pushed first-load JS past our 180 kB budget for an
 * effect four sections below the fold.
 */
const CapabilityIcon = dynamic(() => import('./CapabilityIcon'), {
  // Reserves the exact box so the glyph fades in without moving anything.
  loading: () => <span className="block size-[26px]" aria-hidden="true" />,
});

export function CapabilityCard({
  index,
  name,
  oneLiner,
  href,
  slug,
}: {
  index: string;
  name: string;
  oneLiner: string;
  href: string;
  slug: string;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      as="li"
      interactive
      className="group flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Keyboard users get the animation too when the card link takes focus.
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-5">
        {/* Gold arrives on hover only — six ambient gold glyphs in one viewport
            would blow the ~4% accent budget outright. */}
        <span
          aria-hidden="true"
          className="text-muted transition-colors duration-[var(--dur-base)] ease-hover group-hover:text-accent-text group-focus-within:text-accent-text"
        >
          <CapabilityIcon slug={slug} active={hovered} />
        </span>
        <span className="font-mono text-2xs tracking-[0.06em] text-muted">{index}</span>
      </div>

      <h3 className="mt-6 text-lg font-medium">
        <CardLink href={href}>{name}</CardLink>
      </h3>
      <p className="mt-3 text-sm text-muted">{oneLiner}</p>
    </Card>
  );
}
