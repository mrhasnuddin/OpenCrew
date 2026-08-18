'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button, buttonClasses } from '@/components/ui/Button';
import { CONTACT, BRIEF_EMAIL, RESPONSE_TIME } from '@/content/contact';

/**
 * Shared final step for both the project brief and the crew application.
 *
 * Tries the API route first. If the deployment has no mail provider configured
 * the route returns 501 and we fall back to copy-and-send — never a success
 * screen for a message that went nowhere. See app/api/brief/route.ts.
 */

type Status = 'idle' | 'sending' | 'sent' | 'fallback' | 'error';

export function BriefHandoff({
  kind,
  subject,
  body,
  replyTo,
  onEdit,
  heading,
  sentHeading,
}: {
  kind: 'brief' | 'application';
  subject: string;
  body: string;
  replyTo: string;
  onEdit: () => void;
  heading: string;
  sentHeading: string;
}) {
  const router = useRouter();
  const [status, setStatus] = React.useState<Status>('idle');
  const [copied, setCopied] = React.useState(false);
  // Hidden honeypot. A real user never fills this; bots fill everything.
  const [companyUrl, setCompanyUrl] = React.useState('');

  async function send() {
    setStatus('sending');
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, subject, body, replyTo, company_url: companyUrl }),
      });
      if (res.ok) {
        setStatus('sent');
        // A page, not a card: it survives refresh and carries the
        // response-time promise. replace() so Back returns to the site,
        // not to a stale form.
        router.replace('/thank-you');
        return;
      }
      setStatus(res.status === 501 ? 'fallback' : 'error');
    } catch {
      setStatus('error');
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (status === 'sent') {
    return (
      <Card className="flex flex-col items-start gap-6">
        <h2 className="text-xl font-medium">{sentHeading}</h2>
        <p className="max-w-[var(--measure-prose)] text-secondary">
          {RESPONSE_TIME} If it is urgent, the channels below reach us faster.
        </p>
        <ContactList />
      </Card>
    );
  }

  const mailto = BRIEF_EMAIL
    ? `mailto:${BRIEF_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    : null;
  const showFallback = status === 'fallback' || status === 'error';

  return (
    <Card className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-medium">{heading}</h2>
        <p className="mt-3 max-w-[var(--measure-prose)] text-secondary">
          {showFallback
            ? status === 'error'
              ? 'Sending failed. Copy the text below and send it on any channel. Nothing is lost.'
              : 'Direct sending is not switched on for this deployment yet. Copy the text below and send it on any channel.'
            : `Review it, then send. ${RESPONSE_TIME}`}
        </p>
      </div>

      <pre className="max-h-[300px] overflow-auto rounded-md border border-border bg-canvas-sunken p-5 font-mono text-2xs whitespace-pre-wrap text-secondary">
        {body}
      </pre>

      {/* Honeypot: off-screen, not hidden — display:none fields are skipped by
          some bots but also by some password managers. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-company-url`}>Company URL</label>
        <input
          id={`${kind}-company-url`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {!showFallback ? (
          <Button size="lg" onClick={send} loading={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Send to OPENCREW'}
          </Button>
        ) : null}
        <Button variant={showFallback ? 'primary' : 'secondary'} size="lg" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
        {mailto ? (
          <a href={mailto} className={buttonClasses('secondary', 'lg')}>
            Open in email
          </a>
        ) : null}
        <Button variant="ghost" size="lg" onClick={onEdit}>
          Keep editing
        </Button>
      </div>

      <ContactList />
    </Card>
  );
}

function ContactList() {
  return (
    <ul className="flex flex-col gap-3 border-t border-border pt-5">
      {CONTACT.map((c) => (
        <li key={c.key} className="flex gap-4 text-sm">
          <span className="w-[96px] shrink-0 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
            {c.label}
          </span>
          <span className="text-text">{c.value}</span>
        </li>
      ))}
    </ul>
  );
}
