import HK from "country-flag-icons/react/3x2/HK";
import SG from "country-flag-icons/react/3x2/SG";
import MY from "country-flag-icons/react/3x2/MY";
import VN from "country-flag-icons/react/3x2/VN";
import KR from "country-flag-icons/react/3x2/KR";
import JP from "country-flag-icons/react/3x2/JP";
import AE from "country-flag-icons/react/3x2/AE";
import EU from "country-flag-icons/react/3x2/EU";
import US from "country-flag-icons/react/3x2/US";
import { HERO } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The nine markets, with flags.
 *
 * SVG flags, not emoji: Windows has no colour flag glyphs, so 🇭🇰 renders as the
 * letters "HK" there — on the platform a good share of this audience uses.
 * Imported per-country so only nine flags reach the bundle.
 *
 * Flags are decoration on top of the label, so they carry no alt text — the
 * country name is already the accessible content.
 */
const FLAGS: Record<
  string,
  React.ComponentType<{ className?: string; title?: string }>
> = {
  HK,
  SG,
  MY,
  VN,
  KR,
  JP,
  AE,
  EU,
  US,
};

export function MarketFlags({
  className,
  align = "between",
}: {
  className?: string;
  /** `between` spreads edge to edge at lg (a strip); `center` keeps the
   *  row centred and wrapping at every width (a caption under a grid). */
  align?: "between" | "center";
}) {
  return (
    <ul
      className={cn(
        // Wraps with even gaps on narrow screens; from `lg` it goes single-row
        // and spreads edge to edge. justify-between is only safe once wrapping
        // is off — on a wrapped last row it strands items across the width.
        "flex flex-wrap items-center gap-x-6 gap-y-4",
        align === "between"
          ? "lg:flex-nowrap lg:justify-between lg:gap-x-4"
          : "justify-center gap-x-7 gap-y-5",
        className,
      )}
    >
      {HERO.markets.map((m) => {
        const Flag = FLAGS[m.code];
        return (
          <li key={m.code} className="flex shrink-0 items-center gap-3">
            {Flag ? (
              // 1px ring stops light flags (JP, KR) dissolving into a pale
              // canvas and dark ones bleeding into the ink hero.
              <span
                aria-hidden="true"
                className="block h-[18px] w-[26px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-border"
              >
                <Flag className="h-full w-full object-cover" />
              </span>
            ) : null}
            <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">
              {m.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
