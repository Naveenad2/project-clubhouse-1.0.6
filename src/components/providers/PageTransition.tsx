"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, lockScroll, scrollToTarget, unlockScroll } from "@/lib/scroll";
import { Logo } from "@/components/brand/Logo";

type Navigate = (href: string) => void;

const TransitionContext = createContext<Navigate | null>(null);

export function usePageTransition(): Navigate | null {
  return useContext(TransitionContext);
}

/**
 * Curtain transition between routes: the panel rises, the route changes underneath,
 * then the panel lifts away. Also owns scroll restoration / hash scrolling on route change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);
  const firstRender = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback<Navigate>(
    (href) => {
      const target = new URL(href, window.location.href);
      if (target.origin !== window.location.origin) {
        window.location.assign(target.href);
        return;
      }
      if (target.pathname === window.location.pathname) {
        if (target.hash) {
          scrollToTarget(target.hash);
          window.history.replaceState(window.history.state, "", target.hash);
        } else {
          scrollToTarget(0);
        }
        return;
      }
      const destination = `${target.pathname}${target.search}${target.hash}`;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !panel.current || transitioning.current) {
        router.push(destination, { scroll: false });
        return;
      }
      transitioning.current = true;
      lockScroll();
      gsap
        .timeline()
        .set(panel.current, { autoAlpha: 1, yPercent: 100 })
        .fromTo("[data-transition-logo]", { yPercent: 40, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }, 0.35)
        .to(panel.current, { yPercent: 0, duration: 0.75, ease: "expo.inOut" }, 0)
        .add(() => router.push(destination, { scroll: false }));
    },
    [router],
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const restoring = fromHistory.current;
    fromHistory.current = false;

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      // The new page has a different height — Lenis would otherwise clamp to the old page's limit.
      getLenis()?.resize();
      const hash = window.location.hash;
      if (restoring) return;
      if (hash) scrollToTarget(hash, { immediate: true });
      else if (getLenis()) getLenis()!.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    });

    if (transitioning.current && panel.current) {
      transitioning.current = false;
      unlockScroll();
      gsap
        .timeline({ delay: 0.15 })
        .to("[data-transition-logo]", { yPercent: -40, autoAlpha: 0, duration: 0.4, ease: "power2.in" })
        .to(panel.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 0.1)
        .set(panel.current, { autoAlpha: 0 });
    }
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[80] flex items-center justify-center bg-forest-950 opacity-0"
      >
        <div data-transition-logo className="w-36 text-cream-100 sm:w-44">
          <Logo decorative />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
