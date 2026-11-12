import type { PhotoKey } from "@/data/images";

/** Tiny external store so hovering menu rows only re-renders the floating preview, not the whole menu. */
let current: PhotoKey | null = null;
let lastShown: PhotoKey | null = null;
const listeners = new Set<() => void>();

export const previewStore = {
  get: () => current,
  /** Last non-empty value — keeps the image on screen while the preview fades out. */
  lastShown: () => lastShown,
  set(next: PhotoKey | null) {
    if (next === current) return;
    current = next;
    if (next) lastShown = next;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
