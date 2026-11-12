"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markSiteReady } from "@/lib/ready";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { Logo } from "@/components/brand/Logo";
import { SwissCross } from "@/components/brand/SwissCross";

/** First-visit-per-session intro. Repeat visits skip it via the inline `data-visited` flag (no flash). */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const skip =
        document.documentElement.hasAttribute("data-visited") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (skip) {
        el.style.display = "none";
        markSiteReady();
        return;
      }
      try {
        sessionStorage.setItem("ch-visited", "1");
      } catch {
        /* storage blocked — the intro simply plays again next time */
      }

      lockScroll();
      const counter = el.querySelector<HTMLElement>("[data-count]")!;
      const progress = { value: 0 };

      gsap
        .timeline({
          onComplete: () => {
            el.style.display = "none";
          },
        })
        .from("[data-pl-cross]", { scale: 0, rotate: -180, duration: 1, ease: "expo.out" })
        .fromTo(
          "[data-pl-logo]",
          { clipPath: "inset(0% 0% 100% 0%)", yPercent: 12 },
          { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.1, ease: "expo.out" },
          0.15,
        )
        .from("[data-pl-meta]", { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.8 }, 0.3)
        .to(
          progress,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-pl-bar]", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to("[data-pl-inner]", { yPercent: -18, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 1.55)
        .add(() => {
          unlockScroll();
          markSiteReady();
        }, 1.85)
        .to(el, { y: () => -window.innerHeight * 1.3, duration: 1.1, ease: "expo.inOut" }, 1.75);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden="true" className="preloader fixed inset-x-0 top-0 z-[95] h-svh">
      <div className="absolute inset-0 bg-forest-950" />
      {/* curved trailing edge while the curtain lifts */}
      <div className="absolute inset-x-[-10%] top-full h-[22vh] rounded-b-[50%] bg-forest-950" />
      <div data-pl-inner className="relative flex h-full flex-col items-center justify-center px-6 text-cream-100">
        <div data-pl-cross className="mb-8">
          <SwissCross className="size-10" />
        </div>
        <div data-pl-logo className="w-[min(62vw,320px)]">
          <Logo decorative />
        </div>
        <p data-pl-meta className="eyebrow mt-8 text-cream-100/60">
          Café &amp; Restaurant · Princess Street
        </p>
        <div className="absolute inset-x-6 bottom-8 flex items-end justify-between gap-6 sm:inset-x-10">
          <p data-pl-meta className="eyebrow max-w-[14ch] text-cream-100/50">
            Where the glow meets the gathering
          </p>
          <div className="hidden h-px flex-1 self-center bg-cream-100/15 sm:block">
            <div data-pl-bar className="h-full origin-left scale-x-0 bg-brass" />
          </div>
          <span data-count className="display text-6xl tabular-nums text-cream-100 sm:text-7xl">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
