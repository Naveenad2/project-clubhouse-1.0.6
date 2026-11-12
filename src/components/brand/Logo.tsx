import { LOGO_CROSS, LOGO_PLACE_PATH, LOGO_VIEWBOX, LOGO_WORD_PATH, LOGO_WORDMARK_VIEWBOX } from "./logo-paths";

const WORD_ID = "ch-logo-word";
const PLACE_ID = "ch-logo-place";

/** Rendered once in the root layout; every <Logo /> references these paths instead of repeating 10KB of SVG. */
export function LogoSprite() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <path id={WORD_ID} fillRule="evenodd" d={LOGO_WORD_PATH} />
        <path id={PLACE_ID} fillRule="evenodd" d={LOGO_PLACE_PATH} />
      </defs>
    </svg>
  );
}

function Cross() {
  const c = LOGO_CROSS;
  const armStart = c.armX;
  const centre = armStart + c.armLength / 2;
  return (
    <g>
      <rect x={c.x} y={c.y} width={c.size} height={c.size - 1} fill="#E92730" />
      <rect x={armStart} y={c.armY} width={c.armLength} height={c.armWidth} fill="#fff" />
      <rect x={centre - c.armWidth / 2} y={c.y + 8} width={c.armWidth} height={c.armLength} fill="#fff" />
    </g>
  );
}

type LogoProps = {
  className?: string;
  /** Show the "FORT KOCHI" line. */
  showPlace?: boolean;
  /** Hide from assistive tech when a visible label already exists. */
  decorative?: boolean;
};

export function Logo({ className, showPlace = true, decorative = false }: LogoProps) {
  return (
    <svg
      viewBox={showPlace ? LOGO_VIEWBOX : LOGO_WORDMARK_VIEWBOX}
      className={className}
      fill="currentColor"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Club House Fort Kochi"}
    >
      <use href={`#${WORD_ID}`} />
      {showPlace && <use href={`#${PLACE_ID}`} />}
      <Cross />
    </svg>
  );
}
