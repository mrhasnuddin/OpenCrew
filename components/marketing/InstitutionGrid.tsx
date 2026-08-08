import { NETWORK } from '@/content/site';
import { InstitutionPlate } from './InstitutionPlate';

/**
 * Institutional landscape as a static grid, grouped by category.
 *
 * Used on /network, which is the complete, linkable reference — every name
 * present, readable, and reachable without waiting for an animation. The home
 * page uses the marquee variant instead; the two surfaces do different jobs.
 */
export function InstitutionGrid() {
  return (
    <div className="flex flex-col gap-8">
      {NETWORK.categories.map((cat) => (
        <section key={cat.title} className="border-t border-border pt-6">
          <div className="mb-6 flex items-baseline justify-between gap-5">
            <h3 className="eyebrow">{cat.title}</h3>
            <span className="font-mono text-2xs tracking-[0.06em] text-muted">
              ({String(cat.items.length).padStart(2, '0')})
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {cat.items.map((item) => (
              <li key={item.name}>
                <InstitutionPlate item={item} className="h-full min-h-[124px]" />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
