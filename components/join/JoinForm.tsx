'use client';

import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Field, Input, Textarea } from '@/components/ui/Input';
import { FilterChip } from '@/components/ui/Chip';
import { BriefHandoff } from '@/components/forms/BriefHandoff';
import { ROLE_LABELS, type CrewRoleSlug } from '@/content/crew';

/**
 * Supply-side application. Single step — this audience is senior and will not
 * click through four screens to introduce themselves.
 *
 * Same handoff as the project intake: no submission endpoint exists yet, so the
 * form composes the application rather than showing a success screen for a POST
 * that went nowhere. See components/start/IntakeForm.tsx.
 */

const STORAGE_KEY = 'oc-application';
const ROLE_OPTIONS = Object.keys(ROLE_LABELS) as CrewRoleSlug[];
const MARKETS = [
  'Hong Kong', 'Singapore', 'Malaysia', 'Vietnam', 'South Korea',
  'Japan', 'Dubai', 'Europe', 'North America',
];

type Application = {
  name: string;
  currentPosition: string;
  roles: string[];
  markets: string[];
  languages: string;
  experience: string;
  links: string;
  email: string;
  telegram: string;
  message: string;
};

const EMPTY: Application = {
  name: '', currentPosition: '', roles: [], markets: [], languages: '',
  experience: '', links: '', email: '', telegram: '', message: '',
};

export function JoinForm() {
  const [form, setForm] = React.useState<Application>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Application, string>>>({});
  const [composed, setComposed] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setForm({ ...EMPTY, ...(JSON.parse(raw) as Partial<Application>) });
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form]);

  const set = <K extends keyof Application>(key: K, value: Application[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggle = (key: 'roles' | 'markets', value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));

  function compose() {
    const next: Partial<Record<keyof Application, string>> = {};
    if (!form.name.trim()) next.name = 'Tell us your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter an email so we can reply.';
    if (!form.roles.length) next.roles = 'Choose at least one role.';
    if (!form.experience.trim()) next.experience = 'A short background helps us place you.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const line = (label: string, value: string) => (value ? `${label}: ${value}\n` : '');
    const list = (label: string, values: string[]) =>
      values.length ? `${label}: ${values.join(', ')}\n` : '';

    setComposed(
      `CREW APPLICATION · OPENCREW\n\n` +
        line('Name', form.name) +
        line('Current position', form.currentPosition) +
        list('Roles sought', form.roles.map((r) => ROLE_LABELS[r as CrewRoleSlug] ?? r)) +
        list('Markets', form.markets) +
        line('Languages', form.languages) +
        line('Links', form.links) +
        line('Email', form.email) +
        line('Telegram', form.telegram) +
        `\nBackground:\n${form.experience}\n` +
        (form.message ? `\n${form.message}\n` : ''),
    );
  }

  if (composed) {
    return (
      <BriefHandoff
        kind="application"
        subject={`Crew application: ${form.name}`}
        body={composed}
        replyTo={form.email}
        onEdit={() => setComposed(null)}
        heading="Your application is ready."
        sentHeading="Application received."
      />
    );
  }

  return (
    <Card className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field id="join-name" label="Your name" error={errors.name}>
          <Input value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field id="join-position" label="Current position">
          <Input
            value={form.currentPosition}
            onChange={(e) => set('currentPosition', e.target.value)}
          />
        </Field>
      </div>

      <fieldset className="border-0 p-0">
        <legend className="eyebrow mb-5">Roles you can hold</legend>
        <ul className="flex flex-wrap gap-3">
          {ROLE_OPTIONS.map((r) => (
            <li key={r}>
              <FilterChip selected={form.roles.includes(r)} onClick={() => toggle('roles', r)}>
                {ROLE_LABELS[r]}
              </FilterChip>
            </li>
          ))}
        </ul>
        {errors.roles ? <p className="mt-4 text-sm text-danger">{errors.roles}</p> : null}
      </fieldset>

      <fieldset className="border-0 p-0">
        <legend className="eyebrow mb-5">Markets you genuinely own</legend>
        <ul className="flex flex-wrap gap-3">
          {MARKETS.map((m) => (
            <li key={m}>
              <FilterChip selected={form.markets.includes(m)} onClick={() => toggle('markets', m)}>
                {m}
              </FilterChip>
            </li>
          ))}
        </ul>
      </fieldset>

      <Field id="join-languages" label="Languages" help="Working proficiency, not conversational.">
        <Input
          placeholder="English, Mandarin, Bahasa"
          value={form.languages}
          onChange={(e) => set('languages', e.target.value)}
        />
      </Field>

      <Field
        id="join-experience"
        label="Background"
        help="Where you have operated, and what you actually did there."
        error={errors.experience}
      >
        <Textarea value={form.experience} onChange={(e) => set('experience', e.target.value)} />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field id="join-links" label="LinkedIn / X" help="Anything that lets us verify the above.">
          <Input value={form.links} onChange={(e) => set('links', e.target.value)} />
        </Field>
        <Field id="join-email" label="Email" error={errors.email}>
          <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
        </Field>
      </div>

      <Field id="join-telegram" label="Telegram" help="Optional.">
        <Input value={form.telegram} onChange={(e) => set('telegram', e.target.value)} />
      </Field>

      <Field id="join-message" label="Anything else?">
        <Textarea value={form.message} onChange={(e) => set('message', e.target.value)} />
      </Field>

      <div className="flex flex-wrap items-center gap-4 border-t border-border pt-6">
        <Button size="lg" onClick={compose}>
          Review application
        </Button>
        <p className="text-sm text-muted">
          Every listed member is verifiable by counterparties. Apply only if you are willing to be.
        </p>
      </div>
    </Card>
  );
}
