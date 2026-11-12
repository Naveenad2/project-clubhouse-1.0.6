"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos } from "@/data/images";
import { SITE } from "@/data/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SwissCross } from "@/components/brand/SwissCross";

const FACTS = [
  { title: "Open kitchen", text: "Pull up close and watch the rotisserie turn and the burgers hit the flat-top." },
  { title: "Heritage arches", text: "White colonial arched windows, cane chairs and bottle-green tables." },
  { title: "Opposite Fort Kochi Park", text: "At the very start of Princess Street, a stroll from the old town's cafés and galleries." },
  { title: "Party nights", text: "DJs, playlists and festive dinners when the sun goes down." },
];

/** One colonial arched window: frame, fan light and glazing bars. Coordinates in a 100×180 box. */
function ArchWindow({ x }: { x: number }) {
  // Rounded so server and browser JS engines produce identical markup.
  const pt = (n: number) => n.toFixed(2);
  const fan = [30, 60, 90, 120, 150].map((deg) => {
    const r = (deg * Math.PI) / 180;
    return `M${pt(x + 50 + Math.cos(r) * 16)} ${pt(50 - Math.sin(r) * 16)} L${pt(x + 50 + Math.cos(r) * 46)} ${pt(50 - Math.sin(r) * 46)}`;
  });
  const paths = [
    `M${x} 180 V50 A50 50 0 0 1 ${x + 100} 50 V180 Z`,
    `M${x + 4} 180 V50 A46 46 0 0 1 ${x + 96} 50 V180`,
    `M${x + 34} 50 A16 16 0 0 1 ${x + 66} 50`,
    `M${x} 50 H${x + 100}`,
    `M${x + 50} 50 V180`,
    `M${x} 96 H${x + 100}`,
    `M${x} 140 H${x + 100}`,
    ...fan,
  ];
  return (
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} data-draw />
      ))}
    </>
  );
}

export function TheHouse() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-draw]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.012,
            scrollTrigger: { trigger: "[data-facade]", start: "top 85%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.from("[data-fact]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.09,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-facts]", start: "top 85%", once: true },
        });
        gsap.fromTo(
          "[data-polaroid]",
          { rotate: -14, y: 120 },
          { rotate: -5, y: 0, ease: "none", scrollTrigger: { trigger: "[data-whiskey]", start: "top bottom", end: "center center", scrub: 0.8 } },
        );
        gsap.utils.toArray<HTMLElement>("[data-float-card]").forEach((card, i) => {
          gsap.to(card, {
            yPercent: i % 2 ? -22 : -40,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="the-house" aria-labelledby="house-title" className="relative overflow-hidden bg-cream-50 py-24 text-forest-900 lg:py-40">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between gap-6 border-b border-forest-900/15 pb-5 lg:mb-24">
          <p className="eyebrow flex items-center gap-3">
            <SwissCross className="size-3.5" /> (04) The house
          </p>
          <p className="eyebrow hidden text-forest-900/50 sm:block">{SITE.address.landmark}</p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <RevealText as="h2" id="house-title" className="display text-[clamp(2.9rem,5.6vw,6.5rem)]">
              {SITE.address.building}, <em className="text-forest-600">Princess Street.</em>
            </RevealText>
            <p className="mt-8 max-w-[46ch] text-[1.05rem] leading-relaxed text-forest-900/75">
              Club House lives in a heritage building at the mouth of Fort Kochi&apos;s most storied street. Tall white arches pour light
              over cane chairs and green tables, the kitchen is open for all to see, and the door stays open from breakfast until
              well past dinner.
            </p>
            <ul data-facts className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {FACTS.map((f) => (
                <li key={f.title} data-fact className="border-t border-forest-900/15 pt-5">
                  <h3 className="flex items-center gap-2 font-display text-xl">
                    <SwissCross className="size-3" /> {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-900/65">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* collage: hi-res kitchen shot + the house's own photos */}
          <div className="relative min-h-[560px] lg:col-span-6 lg:col-start-7 lg:min-h-[760px]">
            <div className="absolute right-0 top-0 h-[78%] w-[72%]">
              <ParallaxImage
                photo={photos.openKitchen}
                sizes="(min-width: 1024px) 34vw, 75vw"
                className="size-full rounded-t-full"
                cursor="Open kitchen"
              />
            </div>
            <figure data-float-card className="absolute bottom-[4%] left-0 w-[46%] max-w-[300px] shadow-[0_40px_80px_-30px_rgba(20,34,26,0.5)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image src={photos.feedArches.src} alt={photos.feedArches.alt} fill sizes="300px" quality={80} className="object-cover" />
              </div>
            </figure>
            <figure data-float-card className="absolute bottom-[-6%] right-[6%] w-[44%] max-w-[330px] shadow-[0_40px_80px_-30px_rgba(20,34,26,0.5)] lg:bottom-[2%]">
              <div className="relative aspect-[349/245] overflow-hidden rounded-xl">
                <Image src={photos.feedDiningRoom.src} alt={photos.feedDiningRoom.alt} fill sizes="330px" quality={80} className="object-cover" />
              </div>
              <figcaption className="mt-3 font-hand text-xl text-forest-700">full house, full hearts</figcaption>
            </figure>
          </div>
        </div>

        {/* facade line drawing */}
        <div data-facade className="mt-32 lg:mt-44">
          <svg
            viewBox="-2 -2 584 186"
            className="h-auto w-full text-forest-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="1 1"
            role="img"
            aria-label="Line drawing of Club House's arched colonial windows"
          >
            {[0, 120, 240, 360, 480].map((x) => (
              <ArchWindow key={x} x={x} />
            ))}
          </svg>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-hand text-2xl text-forest-700">five arches, one very good feeling</p>
            <p className="eyebrow text-forest-900/50">{SITE.address.street} · Fort Kochi</p>
          </div>
        </div>

        {/* Whiskey */}
        <div data-whiskey className="mt-32 grid items-center gap-14 rounded-[2rem] bg-forest-900 px-6 py-14 text-cream-100 sm:px-10 lg:mt-44 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6 text-cream-100/60">Head of guest relations</p>
            <h2 className="display text-[clamp(2.75rem,5vw,5.5rem)]">
              Say hello to <em className="text-brass">Whiskey.</em>
            </h2>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-cream-100/70">
              Guests come for the burgers and stay for Whiskey, our four-legged regular. Whiskey doesn&apos;t take reservations, but never
              says no to a scratch behind the ears.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-5 lg:col-start-8">
            <figure data-polaroid className="relative w-[min(78vw,330px)] -rotate-[5deg] bg-[#fbfaf3] p-3 pb-16 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)] transition-transform duration-700 hover:rotate-0">
              <span aria-hidden="true" className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-2 bg-cream-200/80 shadow-sm" />
              <div className="relative aspect-[350/388] overflow-hidden">
                <Image src={photos.feedWhiskey.src} alt={photos.feedWhiskey.alt} fill sizes="330px" quality={80} className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-4 text-center font-hand text-2xl text-forest-900">Whiskey, on duty ✦</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
