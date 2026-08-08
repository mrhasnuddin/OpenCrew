'use client';

import * as React from 'react';
import { Section } from '@/components/primitives/Layout';
import { Button } from '@/components/ui/Button';
import { CONTACT } from '@/content/contact';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  const email = CONTACT.find((c) => c.key === 'email');

  return (
    <Section className="pt-9 pb-10">
      <p className="eyebrow mb-6">Error</p>
      <h1 className="max-w-[18ch] text-4xl tracking-[-0.025em] lg:text-5xl lg:tracking-[-0.03em]">
        Something broke on our side.
      </h1>
      <p className="lead-measure mt-6 text-lg text-secondary">
        Not your fault. Try again, or write to us directly at {email?.value}.
      </p>
      {/* The digest is the only handle we have on a production error — showing
          it costs nothing and turns a vague report into a searchable one. */}
      {error.digest ? (
        <p className="mt-5 font-mono text-2xs tracking-[0.06em] text-muted uppercase">
          Reference {error.digest}
        </p>
      ) : null}
      <div className="mt-7">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </Section>
  );
}
