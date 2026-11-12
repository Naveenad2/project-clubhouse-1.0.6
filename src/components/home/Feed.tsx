"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type PhotoKey } from "@/data/images";
import { SITE } from "@/data/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { RevealText } from "@/components/ui/RevealText";
import { SwissCross } from "@/components/brand/SwissCross";

const COLUMNS: PhotoKey[][] = [
  ["feedGuest", "feedChickenPlate", "feedOldHarbour"],
  ["feedSharingFries", "feedCroissant", "feedPartyNight"],
  ["feedBurger", "feedGoodFeel", "feedChristmas"],
  ["feedSignboard", "feedArches", "feedFacade", "feedDiningRoom"],
];

const SPEEDS = [-14, 8, -20, 4];

export function Feed() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col, i) => {
          gsap.fromTo(
            col,
            { yPercent: -SPEEDS[i] / 2 },
            {
              yPercent: SPEEDS[i],
              ease: "none",
              scrollTrigger: { trigger: "[data-cols]", start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="feed" aria-labelledby="feed-title" className="relative overflow-hidden bg-forest-950 py-24 text-cream-100 lg:py-40">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 flex items-center gap-3 text-cream-100/60">
              <SwissCross className="size-3.5" /> (05) From our feed
            </p>
            <RevealText as="h2" id="feed-title" className="display text-[clamp(3rem,7vw,8rem)]">
              Frames of <em className="text-brass">Fort Kochi.</em>
            </RevealText>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] leading-relaxed text-cream-100/65">
              Neon on Princess Street, guests by the arches, a croissant mid-flake. Little moments from the house and the old town
              around it.
            </p>
            {SITE.instagramUrl && (
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-8 inline-flex items-center gap-3 rounded-full border border-cream-100/25 px-6 py-4 transition-colors hover:border-cream-100"
              >
                Follow on Instagram ↗
              </a>
            )}
          </div>
        </div>

        <div data-cols className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-4 lg:gap-5">
          {COLUMNS.map((col, i) => (
            <div key={i} data-col className={`flex flex-col gap-3 sm:gap-4 lg:gap-5 ${i % 2 ? "lg:pt-24" : ""}`}>
              {col.map((key) => {
                const p = photos[key];
                return (
                  <figure key={key} className="group relative overflow-hidden rounded-xl bg-forest-800" data-cursor="Look">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      sizes="(min-width: 1024px) 22vw, 46vw"
                      quality={80}
                      placeholder="blur"
                      className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest-950/90 to-transparent p-4 pt-10 text-xs leading-snug text-cream-100/85 transition-transform duration-500 group-hover:translate-y-0">
                      {p.alt}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
