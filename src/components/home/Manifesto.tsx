"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { photos, type PhotoKey } from "@/data/images";
import { SITE } from "@/data/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { SwissCross } from "@/components/brand/SwissCross";

type Token = string | { photo: PhotoKey };

const TEXT: Token[] = [
  "A little house at the start of Princess Street",
  { photo: "feedFacade" },
  "where the rotisserie keeps turning,",
  { photo: "rotisserieChicken" },
  "the coffee starts at 7:30",
  { photo: "latteArt" },
  "and the lamps stay lit till late.",
  { photo: "feedChristmas" },
  "Little place — such a good feel to it.",
];

const STATS = [
  { value: `${SITE.rating.value}★`, label: "Google rating from 500+ reviews" },
  { value: "7:30", label: "AM — first espresso of the day" },
  { value: "1 AM", label: "When the lamps finally go low" },
  { value: "6", label: "Days a week. Wednesdays, we rest." },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]");
        const pills = gsap.utils.toArray<HTMLElement>("[data-pill]");
        gsap.set(words, { opacity: 0.14 });
        gsap.set(pills, { scale: 0, rotate: -12 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-manifesto]", start: "top 78%", end: "bottom 42%", scrub: 0.6 },
        });
        // Walk through the tokens in reading order so pills pop exactly where they sit in the sentence.
        gsap.utils.toArray<HTMLElement>("[data-token]").forEach((el, i) => {
          if (el.hasAttribute("data-pill")) tl.to(el, { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" }, i * 0.35);
          else tl.to(el, { opacity: 1, duration: 0.6, ease: "none" }, i * 0.35);
        });
        gsap.from("[data-stat]", {
          y: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-stats]", start: "top 88%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="story" aria-labelledby="story-title" className="relative bg-cream-100 py-24 text-forest-900 lg:py-40">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex items-center justify-between gap-6 border-b border-forest-900/15 pb-5 lg:mb-20">
          <h2 id="story-title" className="eyebrow flex items-center gap-3">
            <SwissCross className="size-3.5" /> The house on Princess Street
          </h2>
          <span className="eyebrow hidden text-forest-900/50 sm:block">(01)</span>
        </div>

        <p data-manifesto className="display max-w-[22ch] text-[clamp(2.15rem,5.6vw,6.25rem)] leading-[1.04] lg:max-w-none">
          {TEXT.map((token, i) =>
            typeof token === "string" ? (
              <Fragment key={i}>
                {token.split(" ").map((word, j) => (
                  <Fragment key={j}>
                    <span data-token data-word className="inline-block">
                      {word}
                    </span>{" "}
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span
                  data-token
                  data-pill
                  aria-hidden="true"
                  className="relative mx-[0.06em] inline-block h-[0.78em] w-[1.7em] overflow-hidden rounded-full align-[-0.06em] shadow-[inset_0_0_0_1px_rgba(20,34,26,0.15)]"
                >
                  <Image src={photos[token.photo].src} alt="" fill sizes="160px" quality={70} className="object-cover" />
                </span>{" "}
              </Fragment>
            ),
          )}
        </p>

        <dl data-stats className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-forest-900/15 pt-10 lg:mt-32 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="flex flex-col gap-3">
              <dt className="order-2 max-w-[22ch] text-sm leading-snug text-forest-900/65">{s.label}</dt>
              <dd className="display order-1 text-[clamp(3rem,6vw,5.5rem)] text-forest-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
