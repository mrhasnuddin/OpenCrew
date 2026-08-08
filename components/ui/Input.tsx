import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Focus is border-colour AND an outline ring — never colour alone, which is
 * invisible to a portion of users. Error state sets aria-invalid and points
 * aria-describedby at the message. docs/03-design-system.md §3.5.
 */

const FIELD_BASE = cn(
  'w-full rounded-sm border border-border-strong bg-surface px-5 text-base text-text',
  'placeholder:text-ink-400',
  'transition-[border-color] duration-[var(--dur-fast)] ease-hover',
  'focus-visible:border-focus focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2',
  'disabled:cursor-not-allowed disabled:opacity-45',
  'aria-[invalid=true]:border-danger',
);

type FieldProps = {
  label: string;
  help?: string;
  error?: string;
  id: string;
};

export function Field({
  label,
  help,
  error,
  id,
  children,
}: FieldProps & { children: React.ReactNode }) {
  const describedBy = error ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
      </label>
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            id,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': describedBy,
          })
        : children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-2 text-sm text-danger">
          <svg viewBox="0 0 14 14" className="size-[16px] shrink-0" aria-hidden="true">
            <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="7" cy="10" r="0.8" fill="currentColor" />
          </svg>
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="text-sm text-muted">
          {help}
        </p>
      ) : null}
    </div>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(FIELD_BASE, 'h-[40px]', className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(FIELD_BASE, 'min-h-[110px] py-4', className)} {...props} />;
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(FIELD_BASE, 'h-[40px] appearance-none pr-7', className)} {...props}>
      {children}
    </select>
  );
});
