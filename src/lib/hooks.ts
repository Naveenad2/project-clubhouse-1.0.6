"use client";

import { useSyncExternalStore } from "react";

function subscribeToClock(callback: () => void) {
  const id = window.setInterval(callback, 10_000);
  return () => window.clearInterval(id);
}

/**
 * Current minute as a timestamp, or `null` during server rendering / hydration.
 * Keeps time-dependent UI out of the static prerender and free of hydration mismatches.
 */
export function useMinuteClock(): number | null {
  return useSyncExternalStore(
    subscribeToClock,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => null,
  );
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
