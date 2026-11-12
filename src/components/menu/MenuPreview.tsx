"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { photos } from "@/data/images";
import { gsap, useGSAP } from "@/lib/gsap";
import { previewStore } from "./preview-store";

/** Dish photo that trails the cursor while hovering menu rows (desktop, precise pointers only). */
export function MenuPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useSyncExternalStore(previewStore.subscribe, previewStore.get, () => null);
  const shown = active ?? previewStore.lastShown();

  useGSAP(() => {
    if (!window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    const move = (e: PointerEvent) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - 120);
      rTo(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block">
      <div
        className={`relative h-[260px] w-[200px] overflow-hidden rounded-t-full bg-forest-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] ${
          active ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {shown && (
          <Image key={shown} src={photos[shown].src} alt="" fill sizes="200px" quality={70} className="animate-[preview-in_0.6s_var(--ease-out-expo)] object-cover" />
        )}
      </div>
    </div>
  );
}
