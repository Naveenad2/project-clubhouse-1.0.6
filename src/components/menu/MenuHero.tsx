"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type PhotoKey } from "@/data/images";
import { MENU } from "@/data/menu";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onSiteReady } from "@/lib/ready";
import { scrollToTarget } from "@/lib/scroll";
import { SwissCross } from "@/components/brand/SwissCross";
import { OpenStatus } from "@/components/layout/OpenStatus";

const SLIDES: PhotoKey[] = ["rotisserieChicken", "heroBurger", "croissant", "prawnPasta", "chocolateCake"];

export function MenuHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const reduce = window.matchMedia(MQ.reduce).matches;
      const word = q("[data-menu-word]")[0];
      const split = SplitText.create(word, { type: "chars" });
      gsap.set(word, { visibility: "visible" });
      if (reduce) {
        gsap.set(q("[data-menu-fade]"), { autoAlpha: 1 });
        return;
      }

      gsap.set(split.chars, { yPercent: 105 });
      const intro = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .to(split.chars, { yPercent: 0, duration: 1.4, stagger: 0.06 }, 0.1)
        .fromTo(q("[data-menu-arch]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0)
        .fromTo(q("[data-menu-fade]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.06 }, 0.6);
      const off = onSiteReady(() => intro.play());

      // Cycle the dishes inside the arch with an upward wipe.
      const slides = q("[data-slide]");
      gsap.set(slides.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      const cycle = gsap.timeline({ repeat: -1, delay: 2 });
      slides.forEach((slide, i) => {
        const next = slides[(i + 1) % slides.length];
        cycle
          .set(next, { zIndex: 2, clipPath: "inset(100% 0% 0% 0%)" }, `+=2.2`)
          .set(slide, { zIndex: 1 }, "<")
          .to(next, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut" }, "<")
          .fromTo(next.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, "<")
          .set(slide, { zIndex: 0 });
      });

      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap.to(q("[data-menu-word]"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => {
        off();
        mm.revert();
      };
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="menu-title" className="relative overflow-hidden bg-forest-900 pb-16 pt-28 text-cream-100 lg:min-h-svh lg:pb-12 lg:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_70%_45%,rgba(201,164,92,0.2),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <div data-menu-fade className="flex items-center justify-between gap-6 border-b border-cream-100/15 pb-5">
          <p className="eyebrow flex items-center gap-3 text-cream-100/70">
            <SwissCross className="size-3.5" /> Club House · Fort Kochi
          </p>
          <span className="hidden sm:block">
            <OpenStatus className="eyebrow text-cream-100/60" />
          </span>
        </div>

        <div className="relative mt-10 lg:mt-6">
          <h1 id="menu-title" className="relative z-10">
            <span data-menu-fade className="eyebrow block text-cream-100/60">
              The Club House
            </span>{" "}
            <span
              data-menu-word
              className="display block overflow-hidden pb-[0.06em] text-[34vw] leading-[0.82] tracking-[-0.06em] lg:text-[26vw]"
            >
              Menu
            </span>
          </h1>

          <div
            data-menu-arch
            className="relative z-0 mx-auto -mt-[9vw] aspect-[3/4] w-[min(62vw,340px)] overflow-hidden rounded-t-full bg-forest-800 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)] lg:absolute lg:bottom-[1vw] lg:right-[5vw] lg:mt-0 lg:w-[16vw] lg:max-w-[340px]"
          >
            {SLIDES.map((key, i) => (
              <div key={key} data-slide className="absolute inset-0" style={{ zIndex: i === 0 ? 1 : 0 }}>
                <Image
                  src={photos[key].src}
                  alt={photos[key].alt}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1024px) 22vw, 64vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-12 lg:items-end">
          <p data-menu-fade className="max-w-[44ch] text-[1.05rem] leading-relaxed text-cream-100/75 lg:col-span-5">
            Rotisserie chicken carved to order, smash burgers off the flat-top, all-day breakfast and coffee from 7:30 AM — plus a
            few nods to the Kerala coast.
          </p>
          <nav data-menu-fade aria-label="Jump to a section" className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {MENU.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(`#${c.id}`, { offset: -96 });
                    }}
                    className="eyebrow block rounded-full border border-cream-100/20 px-4 py-2.5 text-[0.62rem] transition-colors hover:border-cream-100 hover:bg-cream-100 hover:text-forest-900"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
