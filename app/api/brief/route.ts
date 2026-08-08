import { NextResponse } from 'next/server';

/**
 * Brief / application submission.
 *
 * The endpoint is provider-gated: it only sends when RESEND_API_KEY and
 * BRIEF_TO_EMAIL are set. With neither configured it returns 501 and the client
 * falls back to the compose-and-copy handoff, so an unconfigured deploy never
 * shows a success screen for a message that went nowhere. Set the two env vars
 * and submission activates with no code change.
 *
 *   RESEND_API_KEY   re_xxx
 *   BRIEF_TO_EMAIL   where briefs land
 *   BRIEF_FROM_EMAIL a verified sender on your Resend domain
 */

export const runtime = 'nodejs';

const MAX_FIELD = 5000;
const MAX_BODY = 20_000;

type Payload = {
  kind?: 'brief' | 'application';
  subject?: string;
  body?: string;
  replyTo?: string;
  /** Honeypot — a real user never fills a hidden field. */
  company_url?: string;
};

export async function POST(request: Request) {
  let payload: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }
    payload = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Silently accept and discard bot submissions — telling a bot it failed only
  // teaches it to try again.
  if (payload.company_url) {
    return NextResponse.json({ ok: true });
  }

  const body = (payload.body ?? '').slice(0, MAX_FIELD).trim();
  const replyTo = (payload.replyTo ?? '').trim();
  const kind = payload.kind === 'application' ? 'application' : 'brief';

  if (!body) {
    return NextResponse.json({ error: 'Empty submission.' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(replyTo)) {
    return NextResponse.json({ error: 'A valid reply address is required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BRIEF_TO_EMAIL;
  const from = process.env.BRIEF_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Not an error — this deploy simply has no mail provider configured.
    return NextResponse.json(
      { configured: false, error: 'Submission is not configured on this deployment.' },
      { status: 501 },
    );
  }

  const subject =
    (payload.subject ?? '').slice(0, 200).trim() ||
    (kind === 'application' ? 'Crew application — OPENCREW' : 'Project brief — OPENCREW');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, text: body }),
    });

    if (!res.ok) {
      // Log the provider's reason server-side; never leak it to the client.
      console.error('[brief] provider rejected submission', res.status, await res.text());
      return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[brief] submission failed', error);
    return NextResponse.json({ error: 'Could not send right now.' }, { status: 502 });
  }
}
