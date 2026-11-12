import { DIET_LABEL, type Diet } from "@/data/menu";

const COLOURS: Record<Diet, string> = { veg: "#2f8f46", egg: "#d4a017", nonveg: "#8b2b1f" };

/** Indian-style food marker: outlined square with a dot (veg / egg) or triangle (non-veg). */
export function DietMark({ diet, className }: { diet: Diet; className?: string }) {
  const c = COLOURS[diet];
  return (
    <svg viewBox="0 0 16 16" className={className ?? "size-3.5 shrink-0"} role="img" aria-label={DIET_LABEL[diet]}>
      <title>{DIET_LABEL[diet]}</title>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
      {diet === "nonveg" ? <path d="M8 4.2 12 11.3H4z" fill={c} /> : <circle cx="8" cy="8" r="3.4" fill={c} />}
    </svg>
  );
}
