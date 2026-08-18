import { Card } from '@/components/ui/Card';
import { SocialIcons } from '@/components/ui/SocialIcons';
import type { TeamMember } from '@/lib/team';

/**
 * Initials disc is the portrait fallback and a DESIGNED state, not a broken
 * avatar — ink-800 fill, ink-300 initials, thin gold-900 ring. It carries the
 * card until real photography lands, and it is also the permanent treatment
 * for crew members listed by role only. docs/00-brand-identity.md §5.
 */
function Portrait({ member }: { member: TeamMember }) {
  if (member.portrait) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={member.portrait}
        alt=""
        className="size-[56px] rounded-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-[56px] items-center justify-center rounded-full border border-gold-950 bg-ink-800 text-lg font-medium text-ink-300"
    >
      {member.initials}
    </span>
  );
}

export function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <Card as="li" className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-5">
          <Portrait member={member} />
          <div>
            <h3 className="text-lg font-medium text-text">{member.displayName}</h3>
            <p className="mt-1 text-sm text-muted">{member.role}</p>
          </div>
        </div>
        <SocialIcons links={member.links} className="pt-2" />
      </div>

      <ul className="flex flex-col gap-3 border-t border-border pt-5">
        {member.credentials.map((c) => (
          <li key={c} className="flex gap-4 text-sm text-secondary">
            <span aria-hidden="true" className="marker-dot" />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <p className="font-mono text-2xs tracking-[0.06em] text-muted uppercase">
        {member.capabilities.join(' · ')}
      </p>

      {member.formats?.length ? (
        <p className="text-sm text-muted">
          <span className="text-secondary">Speaks at:</span> {member.formats.join(' · ')}
        </p>
      ) : null}
    </Card>
  );
}
