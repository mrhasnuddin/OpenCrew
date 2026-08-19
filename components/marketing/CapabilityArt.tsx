'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Capability artwork, inlined — the client-supplied gold line illustrations
 * (public/What/{n}.svg) fetched once and injected as live SVG instead of an
 * <img>, so each LAYER of the drawing can animate on its own (client
 * direction: per-layer motion, not one group).
 *
 * Layers: every file is either  svg > g(drop-shadow) > [layer, layer, …]
 * (files 1–5) or  svg > [layer, layer, …]  (file 6). After injection each
 * layer element is tagged `.cap-layer` with `--i`, and tokens.css runs the
 * choreography — a staggered rise-in when the card activates, then a slow
 * out-of-phase float per layer. Pure CSS from there; reduced motion kills it
 * globally.
 *
 * The SVG text is cached module-wide (six files, fetched at most once each);
 * while a file is in flight the box shows a `.skeleton` ghost.
 */
const cache = new Map<number, string>();
const inflight = new Map<number, Promise<string>>();

function load(index: number): Promise<string> {
  const hit = cache.get(index);
  if (hit) return Promise.resolve(hit);
  let p = inflight.get(index);
  if (!p) {
    p = fetch(`/What/${index}.svg`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then((t) => {
        cache.set(index, t);
        inflight.delete(index);
        return t;
      });
    inflight.set(index, p);
  }
  return p;
}

export function CapabilityArt({
  index,
  active,
  className,
  style,
}: {
  /** 1-based artwork index (public/What/{index}.svg). */
  index: number;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [svg, setSvg] = React.useState<string | null>(() => cache.get(index) ?? null);

  React.useEffect(() => {
    let alive = true;
    load(index)
      .then((t) => alive && setSvg(t))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [index]);

  // Tag the layers once the SVG is in the DOM.
  React.useLayoutEffect(() => {
    if (!svg || !ref.current) return;
    const root = ref.current.querySelector('svg');
    if (!root) return;
    const nonDefs = Array.from(root.children).filter((c) => c.tagName !== 'defs');
    // One wrapper group (the drop-shadow) → its children are the layers.
    const layers =
      nonDefs.length === 1 && nonDefs[0].tagName === 'g'
        ? Array.from(nonDefs[0].children)
        : nonDefs;
    layers.forEach((el, i) => {
      el.classList.add('cap-layer');
      (el as SVGElement).style.setProperty('--i', String(i));
    });
  }, [svg]);

  if (!svg) {
    return (
      <div className={cn('cap-art', className)} style={style} aria-hidden="true">
        <div className="skeleton absolute inset-[12%] rounded-xl" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-active={active || undefined}
      className={cn('cap-art', className)}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
