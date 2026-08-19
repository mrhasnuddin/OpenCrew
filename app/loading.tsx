import { Container } from '@/components/primitives/Layout';

/**
 * Route-level ghost state (client direction: skeleton loading site-wide).
 * App Router shows this instantly on navigation while the target segment
 * streams in. It sketches the shared page anatomy — eyebrow, display line,
 * lead, then a row of cards — in `.skeleton` blocks (tokens.css shimmer),
 * so the transition reads as the page assembling rather than a blank hold.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <Container>
        <div className="pt-8 lg:pt-9">
          <div className="skeleton h-[15px] w-[120px] rounded-xs" />
          <div className="mt-6 flex flex-col gap-4">
            <div className="skeleton h-[44px] w-[min(560px,80%)] rounded-sm" />
            <div className="skeleton h-[44px] w-[min(380px,55%)] rounded-sm" />
          </div>
          <div className="mt-7 flex flex-col gap-3">
            <div className="skeleton h-[17px] w-[min(520px,90%)] rounded-xs" />
            <div className="skeleton h-[17px] w-[min(430px,70%)] rounded-xs" />
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton h-[220px] rounded-xl" />
          ))}
        </div>
      </Container>
    </div>
  );
}
