"use client";

declare global {
  interface Window {
    __chReady?: boolean;
  }
}

const EVENT = "clubhouse:ready";

/** Fired once the preloader has finished (or was skipped) — intro animations wait for it. */
export function markSiteReady() {
  window.__chReady = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onSiteReady(callback: () => void): () => void {
  if (window.__chReady) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(EVENT, handler, { once: true });
  return () => window.removeEventListener(EVENT, handler);
}
