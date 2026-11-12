import { cn } from "@/lib/cn";

/** The red Swiss-cross square from the logo, used as a brand bullet / separator. */
export function SwissCross({ className, square = true }: { className?: string; square?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={cn("inline-block shrink-0", className)}>
      {square && <rect width="20" height="20" fill="#E92730" />}
      <path d="M8 3.5h4V8h4.5v4H12v4.5H8V12H3.5V8H8z" fill={square ? "#fff" : "currentColor"} />
    </svg>
  );
}
