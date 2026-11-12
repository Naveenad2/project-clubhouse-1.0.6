"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { useMinuteClock } from "@/lib/hooks";
import { formatTime, kochiTime } from "@/lib/hours";
import { HOURS } from "@/data/site";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/cn";

/** Footer content drifts up from below as it scrolls into view. */
export function FooterReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-footer-inner]",
          { yPercent: -28 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
        gsap.from("[data-footer-word]", {
          yPercent: 60,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom bottom", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div data-footer-inner>{children}</div>
    </div>
  );
}

export function KochiClock() {
  const now = useMinuteClock();
  if (now === null) return <span>Fort Kochi, IST</span>;
  const { hour, minute } = kochiTime(new Date(now));
  return <span>Fort Kochi · {formatTime(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`)} IST</span>;
}

export function CurrentYear({ fallback }: { fallback: string }) {
  const now = useMinuteClock();
  return <>{now === null ? fallback : new Date(now).getFullYear()}</>;
}

/** Weekly hours with today's row highlighted (in Fort Kochi time). */
export function HoursList({ className, todayClassName = "text-brass" }: { className?: string; todayClassName?: string }) {
  const now = useMinuteClock();
  const today = now === null ? -1 : kochiTime(new Date(now)).day;
  // Start the week on Monday.
  const ordered = [...HOURS.slice(1), HOURS[0]];
  return (
    <ul className={cn("space-y-1.5", className)}>
      {ordered.map((h) => {
        const isToday = HOURS.indexOf(h) === today;
        return (
          <li key={h.day} className={cn("flex items-baseline justify-between gap-3", isToday && todayClassName)}>
            <span className="flex items-center gap-2">
              {h.day}
              {isToday && <span className="eyebrow text-[0.6rem]">Today</span>}
            </span>
            <span className="tabular-nums">{h.closed ? "Closed" : `${formatTime(h.opens)} – ${formatTime(h.closes)}`}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="eyebrow group inline-flex items-center gap-3 text-cream-100/70 transition-colors hover:text-cream-100"
    >
      Back to top
      <span className="grid size-10 place-items-center rounded-full border border-cream-100/25 transition-transform duration-500 group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
