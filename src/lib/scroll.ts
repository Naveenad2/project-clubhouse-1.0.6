"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

const HEADER_OFFSET = -72;

/** Smoothly scrolls to a selector, element or y-position. Falls back to native scrolling without Lenis. */
export function scrollToTarget(target: string | number | HTMLElement, options: { immediate?: boolean; offset?: number } = {}) {
  const offset = options.offset ?? (typeof target === "number" ? 0 : HEADER_OFFSET);
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: options.immediate, duration: 1.4, force: true });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
  const top = typeof target === "number" ? target : el ? el.getBoundingClientRect().top + window.scrollY + offset : null;
  if (top === null) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: options.immediate || reduce ? "auto" : "smooth" });
}

export const lockScroll = () => {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
};

export const unlockScroll = () => {
  lenis?.start();
  document.documentElement.style.overflow = "";
};
