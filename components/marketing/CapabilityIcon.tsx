'use client';

import * as React from 'react';
import type { AnimatedIconHandle } from '@/components/ui/types';
import UsersGroupIcon from '@/components/ui/users-group-icon';
import MessageCircleIcon from '@/components/ui/message-circle-icon';
import ShieldCheck from '@/components/ui/shield-check';
import WorldIcon from '@/components/ui/world-icon';
import PlugConnectedIcon from '@/components/ui/plug-connected-icon';
import TargetIcon from '@/components/ui/target-icon';

/**
 * This whole module is the lazy-loaded chunk, which is the point: the ref that
 * drives the icon's imperative start/stop handle lives INSIDE it.
 *
 * `next/dynamic` does not forward refs. Lazy-loading the icons directly meant
 * `ref.current` was null and every animation call silently no-opped through
 * optional chaining — the icons rendered, and nothing moved. Moving the ref
 * inside the deferred chunk and passing a plain `active` boolean across the
 * boundary fixes it and keeps `motion` off the initial bundle.
 */

type IconComponent = React.ForwardRefExoticComponent<
  { size?: number; strokeWidth?: number } & React.RefAttributes<AnimatedIconHandle>
>;

const ICONS: Record<string, IconComponent> = {
  // Each pairing is semantic, not decorative.
  'global-crew': UsersGroupIcon as IconComponent,
  'consultants-education': MessageCircleIcon as IconComponent,
  'exchange-readiness': ShieldCheck as IconComponent,
  'global-representation': WorldIcon as IconComponent,
  'institutional-access': PlugConnectedIcon as IconComponent,
  'market-execution': TargetIcon as IconComponent,
};

export default function CapabilityIcon({ slug, active }: { slug: string; active: boolean }) {
  const ref = React.useRef<AnimatedIconHandle>(null);
  const Icon = ICONS[slug];

  React.useEffect(() => {
    if (!ref.current) return;
    // Gate lives here, not in the consumers: touch devices fire hover on tap,
    // and reduced-motion users opted out. Read at call time so a preference
    // change mid-session is respected without a remount.
    const allowed =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (active && allowed) ref.current.startAnimation();
    else ref.current.stopAnimation();
  }, [active]);

  if (!Icon) return <span className="block size-[26px]" aria-hidden="true" />;
  return <Icon ref={ref} size={26} strokeWidth={1.5} />;
}
