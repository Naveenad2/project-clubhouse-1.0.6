"use client";

import { Fragment, useRef } from "react";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SwissCross } from "@/components/brand/SwissCross";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  /** 1 = right-to-left, -1 = left-to-right. */
  direction?: 1 | -1;
  /** Seconds per loop. */
  duration?: number;
  className?: string;
  itemClassName?: string;
};

/** Infinite marquee that speeds up and flips direction with scroll velocity. */
export function Marquee({ items, direction = 1, duration = 38, className, itemClassName }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const track = ref.current!.querySelector("[data-track]")!;
        const loop = gsap.fromTo(
          track,
          { xPercent: direction === 1 ? 0 : -50 },
          { xPercent: direction === 1 ? -50 : 0, duration, ease: "none", repeat: -1 },
        );
        const boost = { value: 1 };
        let scrollDir = 1;
        const st = ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            scrollDir = self.direction;
            const velocity = Math.min(Math.abs(self.getVelocity()) / 300, 5);
            gsap.to(boost, {
              value: 1 + velocity,
              duration: 0.2,
              overwrite: true,
              onUpdate: () => loop.timeScale(boost.value * scrollDir),
              onComplete: () => {
                gsap.to(boost, { value: 1, duration: 1.2, ease: "power2.out", onUpdate: () => loop.timeScale(boost.value * scrollDir) });
              },
            });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // Two identical halves so the loop is seamless at -50%.
  const half = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
      {[...items, ...items].map((item, i) => (
        <Fragment key={`${copy}-${i}`}>
          <span className={cn("whitespace-nowrap px-[0.35em]", itemClassName)}>{item}</span>
          <SwissCross className="mx-[0.35em] size-[0.42em]" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div data-track className="flex w-max will-change-transform">
        {half(0)}
        {half(1)}
      </div>
    </div>
  );
}
