import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Layout';
import { BrandMark } from '@/components/marketing/BrandMark';
import { logoPlateClass } from '@/components/marketing/logoPlate';
import { cn } from '@/lib/utils';
import { NETWORK, type Institution } from '@/content/site';
import { PageBanner } from '@/components/ui/PageBanner';

export const metadata: Metadata = {
  title: 'Partners',
  description:
    'The institutions across capital, payments, RWA, professional services and global industries that the OPENCREW network engages with.',
};

/**
 * The full partner directory — every institution as a card with name, short
 * description and, where a verified domain exists, a link to its official
 * site. This is the depth behind the landing page's logo wall; per client
 * direction the flat grid replaced the by-industry sections, and the industry
 * survives as a label on each card instead.
 *
 * Marks: local file, else Brandfetch CDN by domain when the client ID env is
 * set, else monogram (components/marketing/BrandMark). Naming a partner in
 * text and displaying its trademark are different permissions (brand doc
 * §7.2d) — confirm before launch. A card without a domain renders without a
 * link; a dead anchor is worse than no anchor.
 */

function PartnerCard({ item }: { item: Institution }) {
  const href = item.domain ? `https://${item.domain}` : null;

  const body = (
    <>
      <span className="flex items-start justify-between gap-4">
        {/* Local file → Brandfetch by domain (if configured) → monogram, in
            the institution's own colours on a light chip. The chip is what
            makes near-black marks (OKX, Visa, HKEX, BNY…) legible without
            inverting anyone's logo. */}
        <span className={cn(logoPlateClass(item), 'h-[64px] w-[168px] shrink-0 px-5')}>
          <BrandMark
            item={item}
            type="logo"
            h={72}
            className="max-h-[34px] max-w-[128px]"
            monogramClassName="size-[34px]"
          />
        </span>
        {href ? (
          <svg viewBox="0 0 12 12" className="size-[12px] shrink-0 text-muted" aria-hidden="true">
            <path
              d="M3 9 9 3M4.5 3H9v4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span className="mt-5 block font-medium text-text">{item.name}</span>
      <span className="mt-1 block font-mono text-2xs tracking-[0.06em] text-accent-text uppercase">
        {item.industry}
      </span>
      <span className="mt-3 block text-sm text-secondary">{item.blurb}</span>
    </>
  );

  const shell =
    'card-glass group flex h-full flex-col rounded-md p-6 ' +
    'transition-transform duration-[var(--dur-base)] ease-out';

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${shell} card-glass-hover focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-[2px]`}
    >
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export default function PartnersPage() {
  const partners = NETWORK.categories.flatMap((c) => c.items);

  return (
    <>
      <Section className="pt-7 lg:pt-8">
        <PageBanner
          motif="partners"
          eyebrow={NETWORK.eyebrow}
          title="The institutional landscape we work across."
          subtitle={NETWORK.lead}
          actionLabel="How institutional access works"
          actionHref="/#cap-institutional-access"
        />
      </Section>

      <Section className="border-t border-border">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {partners.map((item) => (
            <li key={item.name}>
              <PartnerCard item={item} />
            </li>
          ))}
        </ul>

      </Section>

      {/* No page-level closing section (client direction): the shared footer
          CTA panel is the page's ask. */}
    </>
  );
}
