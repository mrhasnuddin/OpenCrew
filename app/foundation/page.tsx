import { Section, GoldenSplit } from '@/components/primitives/Layout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip, FilterChip, AvailabilityDot } from '@/components/ui/Chip';
import { Field, Input, Textarea, Select } from '@/components/ui/Input';
import { LogoMark } from '@/components/brand/Logo';
import { CAPABILITIES } from '@/lib/nav';

export const metadata = {
  title: 'Foundation',
  description: 'Phase 0 design-system proof.',
  robots: { index: false, follow: false },
};

/**
 * PHASE 0 — foundation proof, not the real home page.
 * Exists so every token and primitive can be seen in one place and reviewed
 * in both themes before Phase 1 builds real pages on top of them.
 */
export default function FoundationPage() {
  return (
    <>
      <Section className="pt-9">
        <p className="eyebrow mb-6">Phase 0 · Foundation</p>
        <h1 className="max-w-[16ch] text-4xl tracking-[-0.025em] lg:text-6xl lg:tracking-[-0.032em]">
          Your global team for Web3 &amp; AI.
        </h1>
        <p className="lead-measure mt-6 text-lg text-secondary">
          Tokens, type, logo system and the four base components. This page is a build artefact — it
          is replaced by the real home page in Phase 1.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button size="lg">Build your crew</Button>
          <Button size="lg" variant="ghost">
            Start a project
          </Button>
        </div>
      </Section>

      {/* ---------------- type ---------------- */}
      <Section
        eyebrow="Typography"
        title="Geist Sans · scale ratio √φ = 1.272"
        lead="Tracking tightens as size grows and loosens as it shrinks. Body line-height is 26px — 16 × φ."
      >
        <div className="flex flex-col gap-5 border-t border-border pt-6">
          {(
            [
              ['text-6xl / 86', 'text-6xl tracking-[-0.032em]', 'Deployed, not introduced'],
              ['text-3xl / 42', 'text-3xl tracking-[-0.02em]', 'One team. Six capabilities.'],
              ['serif / 42', 'manifesto text-3xl text-accent-text', 'We deploy them into the project.'],
              ['text-lg / 20', 'text-lg text-secondary', 'International executives and advisors'],
              ['text-base / 16', 'text-base text-secondary', 'Body copy sits on a 26px line.'],
              ['mono 2xs / 11', 'font-mono text-2xs uppercase tracking-[0.06em] text-muted', 'Role / CMO-APAC · Singapore'],
            ] as const
          ).map(([label, cls, sample]) => (
            <div key={label} className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-baseline md:gap-7">
              <span className="w-[128px] shrink-0 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
                {label}
              </span>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- colour ---------------- */}
      <Section
        eyebrow="Colour"
        title="Anchored on the logo gold, extended by the golden angle"
        lead="#C19C68 measures oklch(71.48% 0.0817 75.29). Every other hue is a 137.508° rotation from it."
      >
        <div className="flex flex-col gap-6">
          {(
            [
              ['Bullion — brand · H 75.29 (anchor)', ['#FCF2E5', '#F6E5CE', '#EFD4B1', '#E0BF92', '#D1AD7B', '#C19C68', '#A88655', '#886A40', '#67502E', '#45341C', '#271D0D']],
              ['Verdant — verified · H 144.04 (+½∠)', ['#EDF6EC', '#DBEDDA', '#C2E1C0', '#A5D1A4', '#8BC089', '#77AF76', '#619460', '#4B754B', '#375736', '#243A24', '#122112']],
              ['Meridian — systems · H 212.80 (+∠)', ['#EBF5F8', '#D6ECF1', '#BADEE7', '#96CCD8', '#76B8C6', '#58A1B0', '#3F8997', '#2A6E7B', '#1C525C', '#11383F', '#072025']],
              ['Alert — danger · H 25 (pinned)', ['#FEEFEE', '#FCE0DD', '#FAC8C3', '#F9A7A0', '#F28079', '#E35451', '#C73D3C', '#A22C2D', '#7B2020', '#561615', '#340B0B']],
            ] as const
          ).map(([label, swatches]) => (
            <div key={label}>
              <p className="mb-3 font-mono text-2xs tracking-[0.06em] text-muted uppercase">{label}</p>
              <div className="flex gap-1">
                {swatches.map((hex) => (
                  <div key={hex} className="flex-1">
                    <div
                      className="h-[42px] rounded-xs border border-[rgb(255_255_255/0.07)]"
                      style={{ backgroundColor: hex }}
                    />
                    <p className="mt-2 text-center font-mono text-[8.5px] text-muted">
                      {hex.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------- components ---------------- */}
      <Section eyebrow="Components" title="Buttons">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="quiet">Quiet</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button loading>Sending brief</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      <Section eyebrow="Components" title="Cards, chips & status">
        <GoldenSplit>
          <ul className="grid gap-5 sm:grid-cols-2">
            {CAPABILITIES.slice(0, 4).map((c) => (
              <Card as="li" key={c.slug} interactive>
                <span className="font-mono text-2xs tracking-[0.06em] text-muted">{c.index}</span>
                <h3 className="mt-3 text-lg font-medium">{c.name}</h3>
                <p className="mt-3 text-sm text-muted">{c.oneLiner}</p>
              </Card>
            ))}
          </ul>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              <Chip>Neutral</Chip>
              <Chip tone="accent">Featured</Chip>
              <Chip tone="success">Verified</Chip>
              <Chip tone="outline">Singapore</Chip>
            </div>
            <div className="flex flex-wrap gap-3">
              <FilterChip selected>CMO / Growth</FilterChip>
              <FilterChip>Regional Lead</FilterChip>
              <FilterChip>Advisor</FilterChip>
            </div>
            <div className="flex flex-col gap-4 border-t border-border pt-6">
              <AvailabilityDot state="available" />
              <AvailabilityDot state="limited" />
              <AvailabilityDot state="by_introduction" />
            </div>
          </div>
        </GoldenSplit>
      </Section>

      <Section eyebrow="Components" title="Form fields">
        <div className="grid max-w-[var(--container-content)] gap-6 md:grid-cols-2">
          <Field id="project" label="Project name" help="As it appears publicly.">
            <Input placeholder="PAYGO" />
          </Field>
          <Field id="site" label="Website" error="That doesn't look like a valid URL.">
            <Input defaultValue="paygo" />
          </Field>
          <Field id="stage" label="Current stage">
            <Select defaultValue="">
              <option value="" disabled>
                Select a stage
              </option>
              <option>Pre-launch</option>
              <option>Live, pre-listing</option>
              <option>Listed</option>
            </Select>
          </Field>
          <Field id="notes" label="Role needs" help="Which seats are you trying to fill?">
            <Textarea placeholder="Global CMO for APAC, plus a regional lead in Korea." />
          </Field>
        </div>
      </Section>

      <Section eyebrow="Brand" title="Logo system">
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-end gap-8 rounded-lg border border-border bg-surface p-7">
            <LogoMark height={64} title="OPENCREW mark" />
            <LogoMark height={40} />
            <LogoMark height={24} />
            <LogoMark height={20} />
          </div>
          <p className="prose-measure text-sm text-muted">
            The mark is 1.82:1 — not square. Only the C&rsquo;s arcs carry gold; the two-tone split
            is the mark. Inline <code className="font-mono text-2xs">LogoMark</code> inherits{' '}
            <code className="font-mono text-2xs">currentColor</code> for the body while the gold
            stays fixed. Header, footer and OG usage is fixed in the brand doc §2.4.
          </p>
        </div>
      </Section>
    </>
  );
}
