"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { NAV_LINKS, SITE } from "@/data/site";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { SwissCross } from "@/components/brand/SwissCross";
import { OpenStatus } from "./OpenStatus";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .set(ref.current, { visibility: "visible" })
        .fromTo(
          ref.current,
          { clipPath: "circle(0% at calc(100% - 42px) 42px)" },
          { clipPath: "circle(150% at calc(100% - 42px) 42px)", duration: 0.9, ease: "expo.inOut" },
        )
        .from("[data-mm-link]", { yPercent: 110, rotate: 4, stagger: 0.06, duration: 0.9, ease: "expo.out" }, 0.35)
        .from("[data-mm-fade]", { autoAlpha: 0, y: 16, stagger: 0.05, duration: 0.6 }, 0.55);
    },
    { scope: ref },
  );

  useEffect(() => {
    const timeline = tl.current;
    if (!timeline) return;
    if (open) {
      lockScroll();
      timeline.timeScale(1).play();
      ref.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (timeline.progress() > 0) {
      timeline.timeScale(1.6).reverse();
      unlockScroll();
    }
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className="invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forest-950 px-6 pb-8 pt-28 text-cream-100 lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="space-y-1">
          {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <TransitionLink href={link.href} onClick={onClose} className="group flex items-baseline gap-4 py-1" data-mm-link>
                <span className="eyebrow w-6 text-cream-100/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(2.75rem,13vw,5rem)] transition-colors group-hover:text-brass">
                  {link.label}
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto space-y-6 pt-12">
        <div data-mm-fade className="h-px bg-cream-100/15" />
        <OpenStatus className="eyebrow text-cream-100/70" />
        <address data-mm-fade className="not-italic leading-relaxed text-cream-100/75">
          {SITE.address.building}, {SITE.address.street}
          <br />
          {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
        </address>
        <div data-mm-fade className="flex flex-wrap gap-3">
          <a href={SITE.phone.href} className="eyebrow rounded-full bg-cream-100 px-5 py-3.5 text-forest-900">
            Call {SITE.phone.display}
          </a>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow rounded-full border border-cream-100/25 px-5 py-3.5">
            Directions ↗
          </a>
        </div>
        <p data-mm-fade className="flex items-center gap-2 text-sm text-cream-100/50">
          <SwissCross className="size-3" /> {SITE.tagline}
        </p>
      </div>
    </div>
  );
}
