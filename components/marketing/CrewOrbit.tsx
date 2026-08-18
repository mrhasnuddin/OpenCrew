import Image from 'next/image';
import { CREW } from '@/content/crew';
import { cn } from '@/lib/utils';

/**
 * Orbit illustration for the "Deployed, not introduced" panel — replaces the
 * fanned portrait stack, which sat small in a large cell (client annotation).
 *
 * The idea is the business itself: the OC mark at the centre, three faint gold
 * orbit rings, and the five real crew members as nodes ON the rings — people
 * deployed around a project. It fills the cell edge to edge, scales with it
 * (everything is % of the square), and carries meaning rather than decoration.
 *
 * Motion: the ring layer rotates once per 90s; each node counter-rotates by
 * the same amount so faces stay upright. Both are compositor-only transforms.
 * A soft breathing glow sits behind the mark. Reduced motion: static.
 *
 * Decorative (aria-hidden) — the panel text and the crew cards below carry
 * the names.
 */

// [angle deg, ring 0..2 (inner→outer)] — spread so no two nodes crowd.
const NODES: [number, number][] = [
  [-52, 2],
  [24, 1],
  [96, 2],
  [168, 1],
  [236, 2],
];
const RING_R = [23, 33, 44]; // % of the square, radius

export function CrewOrbit({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative mx-auto aspect-square w-full max-w-[560px]', className)}
    >
      {/* breathing glow behind the mark */}
      <div
        className="absolute inset-[26%] rounded-full opacity-70 motion-safe:animate-[oc-breathe_5s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--gold-500) 30%, transparent) 0%, transparent 65%)',
        }}
      />

      {/* rings + nodes rotate together; nodes counter-rotate to stay upright */}
      <div className="absolute inset-0 motion-safe:animate-[oc-orbit_90s_linear_infinite]">
        {RING_R.map((r, i) => (
          <div
            key={r}
            className="absolute rounded-full border"
            style={{
              inset: `${50 - r}%`,
              borderColor: `color-mix(in oklab, var(--gold-500) ${[34, 22, 14][i]}%, transparent)`,
              borderStyle: i === 1 ? 'dashed' : 'solid',
            }}
          />
        ))}

        {NODES.map(([deg, ring], i) => {
          const m = CREW[i];
          const r = RING_R[ring];
          const rad = (deg * Math.PI) / 180;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          const size = ring === 2 ? 14 : 12; // % of square
          return (
            <div
              key={m.slug}
              className="absolute motion-safe:animate-[oc-orbit-counter_90s_linear_infinite]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}%`,
                height: `${size}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[color-mix(in_oklab,var(--gold-500)_60%,transparent)] bg-ink-900 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8),0_0_0_6px_color-mix(in_oklab,var(--gold-500)_10%,transparent)]">
                {m.portrait ? (
                  <Image src={m.portrait} alt="" fill sizes="96px" className="object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium text-ink-300">
                    {m.initials}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* the mark, centre, upright, on top */}
      <div className="absolute top-1/2 left-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--gold-500)_45%,transparent)] bg-ink-1000 shadow-[0_0_60px_-10px_color-mix(in_oklab,var(--gold-500)_55%,transparent)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/mark-2.svg" alt="" className="h-[46%] w-auto" />
      </div>
    </div>
  );
}
