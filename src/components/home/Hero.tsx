"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { photos } from "@/data/images";
import { SITE } from "@/data/site";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onSiteReady } from "@/lib/ready";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { RotatingBadge } from "@/components/ui/RotatingBadge";

const archVars = {
  "--aw": "min(clamp(240px, 23vw, 440px), calc(66svh / 1.36))",
  "--ah": "calc(var(--aw) * 1.36)",
} as CSSProperties;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const q = gsap.utils.selector(section);
      const lines = q("[data-hero-line]");
      const reduce = window.matchMedia(MQ.reduce).matches;

      // ── Intro (waits for the preloader) ──
      const split = SplitText.create(lines, { type: "words,chars" });
      gsap.set(lines, { visibility: "visible" });

      if (reduce) {
        gsap.set(q("[data-hero-fade], [data-hero-float]"), { autoAlpha: 1 });
        gsap.set(q("[data-hero-shutter]"), { display: "none" });
      } else {
        gsap.set(split.chars, { yPercent: 118 });
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .to(q("[data-hero-shutter]"), { scaleY: 0, duration: 1.5, ease: "expo.inOut" }, 0)
          .fromTo(q("[data-hero-img]"), { scale: 1.45 }, { scale: 1, duration: 2.4 }, 0)
          .to(split.chars, { yPercent: 0, duration: 1.4, stagger: 0.024 }, 0.3)
          .fromTo(q("[data-hero-float]"), { autoAlpha: 0, scale: 0.6, y: 80 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1.6, stagger: 0.12 }, 0.7)
          .fromTo(q("[data-hero-fade]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.06 }, 0.9);
        const off = onSiteReady(() => intro.play());

        // ── Pointer parallax on the floating plates ──
        let removePointer = () => {};
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const movers = q("[data-float-mouse]").map((el) => ({
            depth: Number(el.dataset.depth ?? 20),
            x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
            y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            movers.forEach((m) => {
              m.x(nx * m.depth);
              m.y(ny * m.depth);
            });
          };
          section.addEventListener("pointermove", onMove);
          removePointer = () => section.removeEventListener("pointermove", onMove);
        }

        const mm = gsap.matchMedia();

        // ── Desktop: the arched window opens into a full-bleed photograph ──
        mm.add(MQ.desktop, () => {
          const arch = q("[data-hero-arch]")[0];
          gsap
            .timeline({
              scrollTrigger: { trigger: section, start: "top top", end: "+=140%", scrub: 0.9, pin: true, invalidateOnRefresh: true },
            })
            .to(
              arch,
              {
                width: () => section.offsetWidth,
                height: () => section.offsetHeight,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                ease: "power2.inOut",
                duration: 1,
              },
              0,
            )
            .to(lines[0], { xPercent: -55, autoAlpha: 0, ease: "power2.in", duration: 0.6 }, 0)
            .to(lines[1], { scale: 0.85, autoAlpha: 0, ease: "power2.in", duration: 0.5 }, 0)
            .to(lines[2], { xPercent: 55, autoAlpha: 0, ease: "power2.in", duration: 0.6 }, 0)
            .to(q("[data-float-scroll]"), { y: (i) => -260 - i * 140, autoAlpha: 0, ease: "power2.in", duration: 0.6 }, 0)
            .to(q("[data-hero-bottom], [data-hero-meta]"), { autoAlpha: 0, y: 30, duration: 0.35 }, 0)
            .to(q("[data-hero-dim]"), { opacity: 0.55, duration: 0.4 }, 0.55)
            .fromTo(
              q("[data-hero-overlay] > *"),
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.35, ease: "power3.out" },
              0.65,
            );
        });

        // ── Mobile: gentle depth on scroll ──
        mm.add(MQ.mobile, () => {
          gsap.to(q("[data-hero-img-wrap]"), {
            yPercent: 14,
            ease: "none",
            scrollTrigger: { trigger: q("[data-hero-arch]")[0], start: "top 60%", end: "bottom top", scrub: true },
          });
        });

        return () => {
          off();
          removePointer();
          mm.revert();
        };
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-heading"
      style={archVars}
      className="relative isolate overflow-hidden bg-forest-900 pt-28 text-cream-100 lg:h-svh lg:min-h-[640px] lg:pt-0"
    >
      {/* warm glow behind the arch */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_52%,rgba(201,164,92,0.24),transparent_72%)]"
      />

      {/* meta row */}
      <div
        data-hero-meta
        className="relative z-20 flex items-center justify-between gap-6 px-5 sm:px-8 lg:absolute lg:inset-x-0 lg:top-28 lg:px-12"
      >
        <h1 id="hero-heading" className="eyebrow text-cream-100/85">
          Club House — Café &amp; Restaurant, Fort Kochi
        </h1>
        <p className="eyebrow hidden text-cream-100/50 md:block">
          {SITE.address.building} · {SITE.address.street}
        </p>
        <p className="eyebrow hidden text-cream-100/50 lg:block">{SITE.geoLabel}</p>
      </div>

      {/* headline */}
      <p className="display pointer-events-none relative z-10 mt-8 px-5 text-[12.4vw] sm:px-8 lg:absolute lg:inset-x-0 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:px-0 lg:text-[clamp(4rem,9.2vw,11.5rem)]">
        <span data-hero-line className="block overflow-hidden pb-[0.2em] text-left lg:pl-[5vw]">
          Where the
        </span>
        <span data-hero-line className="-mt-[0.2em] block overflow-hidden pb-[0.2em] pl-[0.08em] text-center">
          <em className="pr-[0.06em] text-brass">glow</em> meets
        </span>
        <span data-hero-line className="-mt-[0.2em] block overflow-hidden pb-[0.2em] text-right lg:pr-[5vw]">
          the gathering
        </span>
      </p>

      {/* arch + mobile companions (the wrapper dissolves on desktop) */}
      <div className="relative mx-auto -mt-[7vw] w-[min(80vw,440px)] lg:contents">
        <div
          data-hero-arch
          className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full bg-forest-800 lg:absolute lg:left-1/2 lg:top-1/2 lg:aspect-auto lg:h-[var(--ah)] lg:w-[var(--aw)] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-t-[calc(var(--aw)/2)]"
        >
          <div data-hero-img-wrap className="absolute -inset-y-[8%] inset-x-0 lg:inset-0">
            <div data-hero-img className="absolute inset-0">
              <Image
                src={photos.heroBurger.src}
                alt={photos.heroBurger.alt}
                fill
                preload
                quality={80}
                placeholder="blur"
                sizes="(min-width: 1024px) 100vw, 80vw"
                className="object-cover"
              />
            </div>
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-forest-950/5 via-transparent to-forest-950/45" />
          <div data-hero-dim aria-hidden="true" className="absolute inset-0 bg-forest-950 opacity-0" />
          <div data-hero-shutter aria-hidden="true" className="absolute inset-0 hidden origin-top bg-forest-900" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-t-[inherit] ring-1 ring-inset ring-cream-100/15" />
        </div>

        {/* rotating badge (mobile position) */}
        <div data-hero-float className="absolute -bottom-6 -right-3 lg:hidden">
          <RotatingBadge id="hero-badge-m" text="Café & Restaurant • Fort Kochi • Princess Street • " className="size-24 text-cream-100" />
        </div>
      </div>

      {/* desktop floating plates */}
      <div data-hero-float className="absolute bottom-[22%] left-[6vw] hidden w-[11vw] max-w-[210px] lg:block">
        <div data-float-scroll>
          <div data-float-mouse data-depth="34" className="-rotate-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image src={photos.croissant.src} alt={photos.croissant.alt} fill sizes="12vw" quality={70} className="object-cover" />
            </div>
            <p className="mt-3 font-hand text-xl text-cream-100/70">butter croissants, warm by 7:30</p>
          </div>
        </div>
      </div>

      <div data-hero-float className="absolute right-[7vw] top-[19%] hidden w-[9.5vw] max-w-[180px] lg:block">
        <div data-float-scroll>
          <div data-float-mouse data-depth="-26">
            <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <Image src={photos.latteArt.src} alt={photos.latteArt.alt} fill sizes="10vw" quality={70} className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* handwritten note + badge pinned to the arch (desktop) */}
      <div
        data-hero-float
        className="absolute hidden lg:block"
        style={{ left: "calc(50% + var(--aw) / 2 + 2vw)", top: "calc(50% - var(--ah) / 2 + 0.5rem)" }}
      >
        <div data-float-scroll className="relative">
          <p className="max-w-[12ch] -rotate-6 font-hand text-[1.7rem] leading-none text-cream-100/85">pure joy, smashed to order</p>
          <svg viewBox="0 0 120 90" className="absolute -left-20 top-10 w-24 text-cream-100/70" fill="none" aria-hidden="true">
            <path d="M112 6 C 90 8, 46 14, 14 70" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
            <path d="M6 58 L 14 72 L 26 62" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div
        data-hero-float
        className="absolute hidden lg:block"
        style={{ left: "calc(50% - var(--aw) / 2 - 64px)", top: "calc(50% + var(--ah) / 2 - 100px)" }}
      >
        <div data-float-scroll>
          <RotatingBadge id="hero-badge-d" text="Café & Restaurant • Fort Kochi • Princess Street • " className="size-32 text-cream-100" />
        </div>
      </div>

      {/* bottom bar */}
      <div
        data-hero-bottom
        className="relative z-10 mt-14 grid gap-8 px-5 pb-16 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:px-12 lg:pb-10"
      >
        <p data-hero-fade className="max-w-[36ch] text-[0.95rem] leading-relaxed text-cream-100/75">
          A heritage house at the mouth of Princess Street — rotisserie on the turn, smash burgers off the flat-top and the first
          flat white poured at 7:30 AM.
        </p>
        <div data-hero-fade className="eyebrow hidden flex-col items-center gap-3 text-cream-100/50 lg:flex">
          Scroll
          <span className="block h-12 w-px overflow-hidden bg-cream-100/15">
            <span className="block size-full animate-scroll-cue bg-cream-100" />
          </span>
        </div>
        <div data-hero-fade className="flex flex-wrap gap-3 lg:justify-end">
          <Magnetic>
            <TransitionLink
              href="/menu"
              className="eyebrow inline-flex items-center gap-3 rounded-full bg-cream-100 px-7 py-4 text-forest-900 transition-colors hover:bg-brass"
            >
              Explore the menu <span aria-hidden="true">→</span>
            </TransitionLink>
          </Magnetic>
          <Magnetic>
            <TransitionLink
              href="/#visit"
              className="eyebrow inline-flex items-center rounded-full border border-cream-100/25 px-7 py-4 transition-colors hover:border-cream-100"
            >
              Find us
            </TransitionLink>
          </Magnetic>
        </div>
      </div>

      {/* revealed once the arch has opened (desktop) */}
      <div data-hero-overlay className="pointer-events-none absolute inset-0 z-20 hidden flex-col items-center justify-center gap-6 px-12 text-center lg:flex">
        <p className="eyebrow invisible text-cream-100/80 opacity-0">Fort Kochi · Since the first espresso</p>
        <p className="display invisible max-w-[14ch] text-[clamp(3.5rem,7.5vw,9rem)] opacity-0">
          Warm hearts, <em className="text-brass">full plates.</em>
        </p>
        <div className="pointer-events-auto invisible opacity-0">
          <TransitionLink
            href="/menu"
            data-cursor="Menu"
            className="eyebrow inline-flex items-center gap-3 rounded-full bg-cream-100 px-8 py-5 text-forest-900 transition-colors hover:bg-brass"
          >
            See what&apos;s cooking <span aria-hidden="true">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
