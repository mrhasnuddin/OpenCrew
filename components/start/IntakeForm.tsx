'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Field, Input, Textarea, Select } from '@/components/ui/Input';
import { FilterChip } from '@/components/ui/Chip';
import { BriefHandoff } from '@/components/forms/BriefHandoff';
import { useShortlist } from '@/lib/shortlist';
import { CREW, ROLE_LABELS, type CrewRoleSlug } from '@/content/crew';
import { CAPABILITIES } from '@/lib/nav';
import { ENGAGEMENT_MODELS } from '@/content/site';
import { RESPONSE_TIME } from '@/content/contact';
import { cn } from '@/lib/utils';

/**
 * Four-step intake. State persists to sessionStorage so a refresh mid-form
 * doesn't lose the brief, and the crew shortlist attaches automatically.
 *
 * ⚠️ There is no submission endpoint yet. Rather than show a success screen for
 * a POST that went nowhere — which would silently lose real enquiries — the
 * final step composes the brief and hands it over: a prefilled mail draft plus
 * a copyable block for Telegram or WhatsApp. Wiring a real endpoint later is a
 * change to `submit()` and BRIEF_EMAIL, nothing else.
 */

const STORAGE_KEY = 'oc-brief';

const CATEGORIES = ['Web3', 'AI', 'RWA & New Finance', 'Other'];
const STAGES = ['Pre-launch', 'Live, pre-listing', 'Listed', 'Scaling'];
const TIMELINES = ['Immediately', 'Within one month', 'One to three months', 'Exploring'];
const MARKETS = [
  'Hong Kong',
  'Singapore',
  'Malaysia',
  'Vietnam',
  'South Korea',
  'Japan',
  'Dubai',
  'Europe',
  'North America',
];

const ROLE_OPTIONS = Object.keys(ROLE_LABELS) as CrewRoleSlug[];

type Brief = {
  project: string;
  website: string;
  deck: string;
  category: string;
  stage: string;
  roleNeeds: string[];
  resourceNeeds: string[];
  markets: string[];
  timeline: string;
  model: string;
  name: string;
  contactRole: string;
  email: string;
  telegram: string;
  message: string;
};

const EMPTY: Brief = {
  project: '', website: '', deck: '', category: '', stage: '',
  roleNeeds: [], resourceNeeds: [], markets: [], timeline: '', model: '',
  name: '', contactRole: '', email: '', telegram: '', message: '',
};

const STEPS = ['Your project', 'What you need', 'Shape', 'Contact'] as const;

export function IntakeForm() {
  const [step, setStep] = React.useState(0);
  const [brief, setBrief] = React.useState<Brief>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Brief, string>>>({});
  const [composed, setComposed] = React.useState<string | null>(null);
  const { slugs, hydrated } = useShortlist();

  React.useEffect(() => {
    let restored: Partial<Brief> = {};
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) restored = JSON.parse(raw) as Partial<Brief>;
    } catch {
      /* ignore */
    }
    // Handed over from the footer panel: /contact?email=…
    // Read from location rather than useSearchParams so this page stays
    // statically rendered without a Suspense boundary.
    try {
      const handed = new URLSearchParams(window.location.search).get('email');
      if (handed) restored.email = handed;
    } catch {
      /* ignore */
    }
    setBrief({ ...EMPTY, ...restored });
  }, []);

  React.useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(brief));
    } catch {
      /* ignore */
    }
  }, [brief]);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((b) => ({ ...b, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggle = (key: 'roleNeeds' | 'resourceNeeds' | 'markets', value: string) =>
    setBrief((b) => ({
      ...b,
      [key]: b[key].includes(value) ? b[key].filter((v) => v !== value) : [...b[key], value],
    }));

  const shortlisted = hydrated
    ? slugs.map((s) => CREW.find((m) => m.slug === s)).filter(Boolean)
    : [];

  function validate(current: number) {
    const next: Partial<Record<keyof Brief, string>> = {};
    if (current === 0 && !brief.project.trim()) next.project = 'Tell us what the project is called.';
    if (current === 1 && !brief.roleNeeds.length && !brief.resourceNeeds.length) {
      next.roleNeeds = 'Choose at least one role or capability.';
    }
    if (current === 3) {
      if (!brief.name.trim()) next.name = 'Tell us who you are.';
      if (!/^\S+@\S+\.\S+$/.test(brief.email)) next.email = 'Enter a work email so we can reply.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const next = () => validate(step) && setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  function compose() {
    if (!validate(3)) return;
    const line = (label: string, value: string) => (value ? `${label}: ${value}\n` : '');
    const list = (label: string, values: string[]) =>
      values.length ? `${label}: ${values.join(', ')}\n` : '';

    const text =
      `PROJECT BRIEF · OPENCREW\n\n` +
      line('Project', brief.project) +
      line('Website', brief.website) +
      line('Deck', brief.deck) +
      line('Category', brief.category) +
      line('Current stage', brief.stage) +
      '\n' +
      list('Role needs', brief.roleNeeds.map((r) => ROLE_LABELS[r as CrewRoleSlug] ?? r)) +
      list('Resource needs', brief.resourceNeeds) +
      list('Target markets', brief.markets) +
      line('Timeline', brief.timeline) +
      line('Preferred model', brief.model) +
      '\n' +
      (shortlisted.length
        ? `Shortlist: ${shortlisted
            .map((m) => (m!.tier === 'public' ? m!.displayName : m!.roleCode))
            .join(', ')}\n\n`
        : '') +
      line('Name', brief.name) +
      line('Role', brief.contactRole) +
      line('Email', brief.email) +
      line('Telegram', brief.telegram) +
      (brief.message ? `\n${brief.message}\n` : '');

    setComposed(text);
  }

  /* ------------------------------------------------------------- composed */
  if (composed) {
    return (
      <BriefHandoff
        kind="brief"
        subject={`Project brief: ${brief.project}`}
        body={composed}
        replyTo={brief.email}
        onEdit={() => setComposed(null)}
        heading="Your brief is ready."
        sentHeading="Brief received."
      />
    );
  }

  /* ------------------------------------------------------------- the form */
  return (
    <div className="flex h-full flex-col gap-7">
      {/* Progress, not decoration: a done step is a gold node you can go back
          to, the one you are on is lit, and the rest are inert until the step
          before them validates. Same numbered-node language as the execution
          flow, so a reader who has seen one recognises the other. */}
      <ol className="flex gap-2">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => (i < step ? setStep(i) : validate(step) && setStep(i))}
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'group/step flex w-full flex-col gap-4 text-left',
                  '[@media(pointer:coarse)]:min-h-[44px]',
                  'focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-[3px] w-full rounded-full transition-colors duration-[var(--dur-base)] ease-hover',
                    current ? 'bg-accent' : done ? 'bg-accent/45' : 'bg-border',
                  )}
                />
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={cn(
                      'flex size-[26px] shrink-0 items-center justify-center rounded-full border',
                      'font-label text-2xs font-semibold tabular-nums',
                      current
                        ? 'border-accent bg-accent text-on-accent'
                        : done
                          ? 'border-[color-mix(in_oklab,var(--gold-500)_55%,transparent)] text-accent-text'
                          : 'border-border text-disabled',
                    )}
                  >
                    {done ? <Tick /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'hidden truncate text-sm sm:block',
                      current ? 'font-medium text-text' : 'text-muted',
                    )}
                  >
                    {label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <Card className="flex flex-1 flex-col gap-6 p-6 lg:p-7">
        {step === 0 ? (
          <>
            <Field id="project" label="Project name" error={errors.project}>
              <Input value={brief.project} onChange={(e) => set('project', e.target.value)} />
            </Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="website" label="Website" help="Optional.">
                <Input
                  placeholder="https://"
                  value={brief.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </Field>
              <Field id="deck" label="Project deck" help="A link is fine.">
                <Input value={brief.deck} onChange={(e) => set('deck', e.target.value)} />
              </Field>
              <Field id="category" label="Category">
                <Select value={brief.category} onChange={(e) => set('category', e.target.value)}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field id="stage" label="Current stage">
                <Select value={brief.stage} onChange={(e) => set('stage', e.target.value)}>
                  <option value="">Select a stage</option>
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <fieldset className="border-0 p-0">
              <legend className="eyebrow mb-5">Role needs</legend>
              <ul className="flex flex-wrap gap-3">
                {ROLE_OPTIONS.map((r) => (
                  <li key={r}>
                    <FilterChip
                      selected={brief.roleNeeds.includes(r)}
                      onClick={() => toggle('roleNeeds', r)}
                    >
                      {ROLE_LABELS[r]}
                    </FilterChip>
                  </li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="border-0 p-0">
              <legend className="eyebrow mb-5">Resource needs</legend>
              <ul className="flex flex-wrap gap-3">
                {CAPABILITIES.map((c) => (
                  <li key={c.slug}>
                    <FilterChip
                      selected={brief.resourceNeeds.includes(c.name)}
                      onClick={() => toggle('resourceNeeds', c.name)}
                    >
                      {c.name}
                    </FilterChip>
                  </li>
                ))}
              </ul>
            </fieldset>
            {errors.roleNeeds ? <p className="text-sm text-danger">{errors.roleNeeds}</p> : null}
          </>
        ) : null}

        {step === 2 ? (
          <>
            <fieldset className="border-0 p-0">
              <legend className="eyebrow mb-5">Target markets</legend>
              <ul className="flex flex-wrap gap-3">
                {MARKETS.map((m) => (
                  <li key={m}>
                    <FilterChip
                      selected={brief.markets.includes(m)}
                      onClick={() => toggle('markets', m)}
                    >
                      {m}
                    </FilterChip>
                  </li>
                ))}
              </ul>
            </fieldset>
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="timeline" label="When do you need people in place?">
                <Select value={brief.timeline} onChange={(e) => set('timeline', e.target.value)}>
                  <option value="">Select a timeline</option>
                  {TIMELINES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field id="model" label="Preferred engagement model" help="Optional. We can advise.">
                <Select value={brief.model} onChange={(e) => set('model', e.target.value)}>
                  <option value="">No preference</option>
                  {ENGAGEMENT_MODELS.map((m) => (
                    <option key={m.slug}>{m.title}</option>
                  ))}
                </Select>
              </Field>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            {shortlisted.length ? (
              <div className="flex flex-wrap items-center gap-4 rounded-md border border-border bg-canvas-sunken p-5">
                <p className="text-sm text-secondary">
                  Your shortlist ({shortlisted.length}{' '}
                  {shortlisted.length === 1 ? 'member' : 'members'}) will be attached:{' '}
                  <span className="text-text">
                    {shortlisted
                      .map((m) => (m!.tier === 'public' ? m!.displayName : m!.roleCode))
                      .join(', ')}
                  </span>
                </p>
                <Link href="/crew" className="text-sm text-link underline underline-offset-4">
                  Edit
                </Link>
              </div>
            ) : null}
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                <Input value={brief.name} onChange={(e) => set('name', e.target.value)} />
              </Field>
              <Field id="contactRole" label="Your role">
                <Input
                  value={brief.contactRole}
                  onChange={(e) => set('contactRole', e.target.value)}
                />
              </Field>
              <Field id="email" label="Work email" error={errors.email}>
                <Input
                  type="email"
                  value={brief.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </Field>
              <Field id="telegram" label="Telegram" help="Optional.">
                <Input value={brief.telegram} onChange={(e) => set('telegram', e.target.value)} />
              </Field>
            </div>
            <Field id="message" label="Anything else we should know?">
              <Textarea value={brief.message} onChange={(e) => set('message', e.target.value)} />
            </Field>
          </>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-6">
          {step > 0 ? (
            <Button variant="ghost" size="lg" onClick={back}>
              Back
            </Button>
          ) : null}
          {step < STEPS.length - 1 ? (
            <Button size="lg" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button size="lg" onClick={compose}>
              Review brief
            </Button>
          )}
          <p className="text-sm text-muted">{RESPONSE_TIME}</p>
        </div>
      </Card>
    </div>
  );
}

/** Completed step marker — the numeral is replaced once a step is behind you. */
function Tick() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="size-[11px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 6.4 4.9 8.8 9.6 3.4" />
    </svg>
  );
}
