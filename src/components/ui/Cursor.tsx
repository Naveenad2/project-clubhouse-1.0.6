"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Soft follower cursor (native cursor stays visible for usability).
 * Elements can request a label with `data-cursor="View"`.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    let visible = false;

    const move = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled?.dataset.cursor) {
        label.current!.textContent = labelled.dataset.cursor;
        el.dataset.state = "label";
      } else if (target?.closest("a, button, [role='button'], input, select, textarea, label")) {
        el.dataset.state = "link";
      } else {
        el.dataset.state = "default";
      }
    };

    const leave = () => {
      visible = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-state="default"
      className="cursor-follower group/cursor pointer-events-none invisible fixed left-0 top-0 z-[100] opacity-0"
    >
      <div className="-ml-12 -mt-12 grid size-24 scale-[0.1] place-items-center rounded-full bg-cream-100 transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)] group-data-[state=default]/cursor:mix-blend-difference group-data-[state=label]/cursor:scale-100 group-data-[state=label]/cursor:bg-swiss group-data-[state=link]/cursor:scale-[0.5] group-data-[state=link]/cursor:bg-cream-100/25">
        <span
          ref={label}
          className="eyebrow text-[0.625rem] text-white opacity-0 transition-opacity duration-300 group-data-[state=label]/cursor:opacity-100"
        />
      </div>
    </div>
  );
}
