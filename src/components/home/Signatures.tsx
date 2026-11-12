"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type PhotoKey } from "@/data/images";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { RevealText } from "@/components/ui/RevealText";
import { SwissCross } from "@/components/brand/SwissCross";

type Signature = { name: string; note: string; tag: string; photo: PhotoKey; href: string };

const SIGNATURES: Signature[] = [
  { name: "Rotisserie Chicken", note: "Herb-brined, slow-turned, carved to order with garlic dip.", tag: "The one people write about", photo: "rotisserieChicken", href: "/menu#rotisserie-grill" },
  { name: "Club House Smash", note: "Double patty, American cheese, pickles and house sauce.", tag: "Most ordered", photo: "burgerStack", href: "/menu#burgers-sandwiches" },
  { name: "French Omelette", note: "Soft-rolled, herby and buttery — breakfast royalty.", tag: "Guest favourite", photo: "frenchOmelette", href: "/menu#breakfast" },
  { name: "Butter Croissant", note: "Laminated in-house and out of the oven every morning.", tag: "Baked daily", photo: "croissant", href: "/menu#breakfast" },
  { name: "Prawn Aglio e Olio", note: "Garlic, chilli, olive oil and plump tiger prawns.", tag: "From the coast", photo: "prawnPasta", href: "/menu#pasta-pizza-bowls" },
  { name: "Malabar Prawn Curry", note: "Coconut, kokum and curry leaf with lacy appams.", tag: "Fort Kochi on a plate", photo: "prawnCurry", href: "/menu#from-the-coast" },
  { name: "Flat White", note: "Velvety microfoam over a double ristretto.", tag: "From 7:30 AM", photo: "cappuccinoPour", href: "/menu#coffee-tea" },
  { name: "Chocolate Fudge Cake", note: "Dark sponge, glossy ganache, zero regrets.", tag: "Save room", photo: "chocolateCake", href: "/menu#sweet-things" },
];

export function Signatures() {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const track = section.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-sig-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: scroll, start: "left right", end: "right left", scrub: true },
            },
          );
        });
        gsap.fromTo("[data-sig-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section
      ref={section}
      id="signatures"
      aria-labelledby="signatures-title"
      className="relative overflow-hidden bg-forest-900 py-24 text-cream-100 lg:flex lg:h-svh lg:items-center lg:py-0"
    >
      <div data-track className="flex flex-col gap-12 lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:will-change-transform">
        {/* intro panel */}
        <div className="shrink-0 px-5 sm:px-8 lg:w-[38vw] lg:pl-12 lg:pr-[6vw]">
          <p className="eyebrow mb-6 flex items-center gap-3 text-cream-100/60">
            <SwissCross className="size-3.5" /> (02) House signatures
          </p>
          <RevealText as="h2" id="signatures-title" className="display text-[clamp(3rem,6.2vw,7rem)]">
            Plates that bring <em className="text-brass">people back.</em>
          </RevealText>
          <p className="mt-8 max-w-[38ch] leading-relaxed text-cream-100/70">
            The rotisserie, the burgers and that French omelette are what guests talk about the most. Here&apos;s where to start.
          </p>
          <TransitionLink href="/menu" className="eyebrow group mt-10 inline-flex items-center gap-3 border-b border-cream-100/30 pb-2 hover:border-cream-100">
            Full menu <span className="transition-transform group-hover:translate-x-1">→</span>
          </TransitionLink>
        </div>

        {/* cards — native swipe on touch, pinned horizontal scroll on desktop */}
        <ol className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:snap-none lg:gap-[2.5vw] lg:overflow-visible lg:px-0 lg:pb-0 lg:pr-[8vw]">
          {SIGNATURES.map((s, i) => (
            <li key={s.name} className="w-[76vw] shrink-0 snap-start sm:w-[46vw] lg:w-[min(24vw,calc((88svh-210px)*0.75))] lg:even:mt-[8vh]">
              <TransitionLink href={s.href} className="group block" data-cursor="Order">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-forest-800">
                  <div data-sig-img className="absolute inset-y-0 -inset-x-[12%]">
                    <Image
                      src={photos[s.photo].src}
                      alt={photos[s.photo].alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 80vw"
                      quality={70}
                      placeholder="blur"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  <span className="eyebrow absolute bottom-5 left-5 rounded-full bg-cream-100/90 px-3 py-1.5 text-[0.6rem] text-forest-900 backdrop-blur">
                    {s.tag}
                  </span>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <span className="display pt-1 text-sm tabular-nums text-brass">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display text-[clamp(1.75rem,2.3vw,2.6rem)] leading-none transition-colors group-hover:text-brass">{s.name}</h3>
                    <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-cream-100/60">{s.note}</p>
                  </div>
                </div>
              </TransitionLink>
            </li>
          ))}
        </ol>
      </div>

      <div className="absolute inset-x-12 bottom-8 hidden h-px bg-cream-100/15 lg:block" aria-hidden="true">
        <div data-sig-progress className="h-full origin-left bg-brass" />
      </div>
    </section>
  );
}
