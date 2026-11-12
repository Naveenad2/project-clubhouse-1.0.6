import { SwissCross } from "@/components/brand/SwissCross";
import { cn } from "@/lib/cn";

/** Circular rotating text badge with the Swiss cross at its centre. */
export function RotatingBadge({ id, text, className }: { id: string; text: string; className?: string }) {
  const r = 38;
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={id} d={`M50,50 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text className="fill-current font-sans text-[8.4px] font-semibold uppercase tracking-[0.18em]">
          <textPath href={`#${id}`} textLength={2 * Math.PI * r - 2} lengthAdjust="spacingAndGlyphs">
            {text}
          </textPath>
        </text>
      </svg>
      <SwissCross className="size-[22%]" />
    </div>
  );
}
