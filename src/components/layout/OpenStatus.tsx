"use client";

import { useMinuteClock } from "@/lib/hooks";
import { getOpenStatus } from "@/lib/hours";
import { cn } from "@/lib/cn";

/** Live "Open now / Closed" pill computed in Fort Kochi time. Renders a neutral fallback during prerender. */
export function OpenStatus({ className }: { className?: string }) {
  const now = useMinuteClock();
  const status = now === null ? null : getOpenStatus(new Date(now));

  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)} aria-live="polite">
      <span className="relative flex size-2">
        {status?.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#8fdc9b] opacity-60" />}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            status === null ? "bg-brass" : status.open ? "bg-[#8fdc9b]" : "bg-swiss",
          )}
        />
      </span>
      {status?.label ?? "7:30 AM – 1 AM · Closed Wed"}
    </span>
  );
}
