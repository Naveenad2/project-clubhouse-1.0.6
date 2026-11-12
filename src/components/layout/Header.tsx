"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV_LINKS, SITE } from "@/data/site";
import { Logo } from "@/components/brand/Logo";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { OpenStatus } from "./OpenStatus";
import { MobileMenu } from "./MobileMenu";

/** Text that rolls up to a duplicate on hover. */
function RollText({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/roll:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/roll:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useGSAP(
    () => {
      const el = ref.current!;
      let hidden = false;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate(self) {
          const y = self.scroll();
          el.dataset.scrolled = String(y > 40);
          const hide = self.direction === 1 && y > 480 && !menuOpenRef.current;
          if (hide !== hidden) {
            hidden = hide;
            gsap.to(el, { yPercent: hide ? -140 : 0, duration: 0.7, ease: "power3.out", overwrite: true });
          }
        },
      });
      return () => st.kill();
    },
    { scope: ref },
  );

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-cream-100 px-5 py-3 text-forest-900 transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header ref={ref} data-scrolled="false" className="group/header fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-8 lg:pt-5">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 rounded-full border border-transparent py-1.5 pl-4 pr-1.5 transition-[background-color,border-color,box-shadow] duration-500 group-data-[scrolled=true]/header:border-cream-100/10 group-data-[scrolled=true]/header:bg-forest-950/75 group-data-[scrolled=true]/header:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] group-data-[scrolled=true]/header:backdrop-blur-xl sm:pl-5">
          <TransitionLink href="/" aria-label="Club House Fort Kochi — home" className="block text-cream-100" onClick={closeMenu}>
            <Logo className="h-9 w-auto sm:h-10 lg:h-11" decorative />
          </TransitionLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href} className="group/roll eyebrow block text-cream-100/85 hover:text-cream-100">
                    <RollText>{link.label}</RollText>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Display toggles live on wrappers: the components set their own inline display. */}
            <span className="hidden xl:block">
              <OpenStatus className="eyebrow text-[0.625rem] text-cream-100/70" />
            </span>
            <span className="hidden sm:block">
              <Magnetic>
                <a
                  href={SITE.phone.href}
                  className="group/roll eyebrow flex items-center gap-2 rounded-full bg-cream-100 px-5 py-3 text-forest-900 transition-colors hover:bg-brass"
                >
                  <RollText>Book a table</RollText>
                </a>
              </Magnetic>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid size-12 place-items-center rounded-full bg-cream-100/10 text-cream-100 backdrop-blur-md transition-colors hover:bg-cream-100/20 lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${menuOpen ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${menuOpen ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
