"use client";

import Image from "next/image";
import { useRef } from "react";
import { photos, type PhotoKey } from "@/data/images";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { SwissCross } from "@/components/brand/SwissCross";

type Act = {
  id: string;
  time: string;
  label: string;
  titleA: string;
  titleB: string;
  text: string;
  bg: string;
  fg: string;
  photos: [PhotoKey, PhotoKey, PhotoKey];
};

const ACTS: Act[] = [
  {
    id: "morning",
    time: "07:30",
    label: "First light",
    titleA: "Croissants, coffee",
    titleB: "& slow mornings.",
    text: "The oven's warm before the street wakes up. Butter croissants, soft French omelettes and the first flat white of the day — best taken by the arched windows.",
    bg: "#f1ead2",
    fg: "#14221a",
    photos: ["croissant", "frenchOmelette", "latteArt"],
  },
  {
    id: "afternoon",
    time: "13:00",
    label: "The long lunch",
    titleA: "Smash burgers &",
    titleB: "the rotisserie turning.",
    text: "Patties hit the flat-top, chickens turn on the spit and the fries never last long. Lunch here has a habit of becoming the whole afternoon.",
    bg: "#e3b27d",
    fg: "#1d150c",
    photos: ["burgerFries", "rotisserieChicken", "fries"],
  },
  {
    id: "night",
    time: "21:00",
    label: "After dark",
    titleA: "Fairy lights, playlists",
    titleB: "& party nights.",
    text: "The neon comes on, the music goes up and the long tables fill. Party nights, festive dinners and last orders around 1 AM.",
    bg: "#0f1a13",
    fg: "#eeedcf",
    photos: ["feedPartyNight", "feedChristmas", "icedTea"],
  },
];

const ARM_ANGLES = [-58, 0, 58];

// Deterministic star field (no Math.random → no hydration mismatch).
const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 23.3) % 55}%`,
  size: 1 + ((i * 7) % 3),
}));

export function DayToNight() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        const section = ref.current!;
        const acts = gsap.utils.toArray<HTMLElement>("[data-act]");
        gsap.set(acts.slice(1), { autoAlpha: 0 });
        gsap.set("[data-sun-arm]", { rotate: ARM_ANGLES[0] });
        gsap.set(section, { backgroundColor: ACTS[0].bg, color: ACTS[0].fg });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: section, start: "top top", end: "+=320%", scrub: 1, pin: true, invalidateOnRefresh: true },
        });
        tl.to({}, { duration: 0.6 });

        for (let i = 1; i < acts.length; i++) {
          const prev = acts[i - 1];
          const next = acts[i];
          const at = `act${i}`;
          tl.addLabel(at)
            .fromTo(
              section,
              { backgroundColor: ACTS[i - 1].bg, color: ACTS[i - 1].fg },
              { backgroundColor: ACTS[i].bg, color: ACTS[i].fg, duration: 1.2, ease: "none", immediateRender: false },
              at,
            )
            .to("[data-sun-arm]", { rotate: ARM_ANGLES[i], duration: 1.2, ease: "none" }, at)
            .to("[data-clock-reel]", { yPercent: (-100 / ACTS.length) * i, duration: 0.8 }, at)
            .to(prev.querySelectorAll("[data-act-text] > *"), { y: -70, autoAlpha: 0, stagger: 0.05, duration: 0.5, ease: "power2.in" }, at)
            .to(prev.querySelectorAll("[data-act-img]"), { y: -140, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power2.in" }, at)
            .set(prev, { autoAlpha: 0 }, `${at}+=0.7`)
            .set(next, { autoAlpha: 1 }, `${at}+=0.4`)
            .fromTo(
              next.querySelectorAll("[data-act-text] > *"),
              { y: 90, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.06, duration: 0.6, ease: "power3.out" },
              `${at}+=0.45`,
            )
            .fromTo(
              next.querySelectorAll("[data-act-img]"),
              { y: 180, autoAlpha: 0, rotate: 5 },
              { y: 0, autoAlpha: 1, rotate: 0, stagger: 0.08, duration: 0.75, ease: "power3.out" },
              `${at}+=0.45`,
            )
            .to({}, { duration: 0.6 });
        }

        // Sun becomes the moon, stars come out.
        tl.to("[data-sun]", { backgroundColor: "#eeedcf", boxShadow: "0 0 90px 30px rgba(238,237,207,0.18)", duration: 1 }, "act2")
          .to("[data-stars]", { autoAlpha: 1, duration: 1 }, "act2+=0.3");
      });

      mm.add(MQ.mobile, () => {
        gsap.utils.toArray<HTMLElement>("[data-act]").forEach((act) => {
          gsap.from(act.querySelectorAll("[data-act-text] > *, [data-act-img]"), {
            y: 50,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: act, start: "top 75%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="day-to-night"
      aria-labelledby="day-title"
      style={{ backgroundColor: ACTS[0].bg, color: ACTS[0].fg }}
      className="relative lg:h-svh lg:overflow-hidden"
    >
      {/* sky: dashed orbit, travelling sun/moon, stars (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div data-stars className="invisible absolute inset-0 opacity-0">
          {STARS.map((s, i) => (
            <span key={i} className="absolute rounded-full bg-cream-100/70" style={{ left: s.left, top: s.top, width: s.size, height: s.size }} />
          ))}
        </div>
        <div className="absolute left-[calc(50%-95vh)] top-[20vh] size-[190vh] rounded-full border border-dashed border-current opacity-20" />
        <div data-sun-arm className="absolute left-1/2 top-[20vh] h-[95vh] w-0 origin-bottom">
          <div
            data-sun
            className="absolute left-0 top-0 size-[13vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass shadow-[0_0_90px_30px_rgba(201,164,92,0.35)]"
          />
        </div>
      </div>

      {/* heading + rolling clock */}
      <div
        className="relative z-10 flex items-end justify-between gap-6 px-5 pb-4 pt-24 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:px-12 lg:pt-28"
      >
        <h2 id="day-title" className="eyebrow flex items-center gap-3">
          <SwissCross className="size-3.5" /> (03) A day at Club House
        </h2>
        <div className="display hidden h-[1em] overflow-hidden text-[clamp(2.5rem,4vw,4.5rem)] tabular-nums lg:block" aria-hidden="true">
          <div data-clock-reel>
            {ACTS.map((a) => (
              <div key={a.id} className="h-[1em] leading-none">
                {a.time}
              </div>
            ))}
          </div>
        </div>
      </div>

      {ACTS.map((act, i) => (
        <article
          key={act.id}
          data-act
          aria-labelledby={`act-${act.id}`}
          className="relative z-[5] lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent! lg:text-inherit!"
          style={{ background: act.bg, color: act.fg }}
        >
          <div className="mx-auto grid w-full max-w-[1680px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-12 lg:pb-0 lg:pt-24">
            <div data-act-text className="lg:col-span-5">
              <p className="eyebrow mb-6 opacity-70">
                <span className="tabular-nums">{act.time}</span> — {act.label}
              </p>
              <h3 id={`act-${act.id}`} className="display text-[clamp(2.6rem,5vw,5.75rem)]">
                {act.titleA} <em className={i === 2 ? "text-brass" : "text-forest-700"}>{act.titleB}</em>
              </h3>
              <p className="mt-8 max-w-[44ch] text-[1.02rem] leading-relaxed opacity-75">{act.text}</p>
            </div>

            <div className="relative aspect-[1/1.02] w-full lg:col-span-6 lg:col-start-7 lg:aspect-auto lg:h-[min(68vh,44vw)]">
              <div data-act-img className="absolute right-0 top-0 aspect-[3/4] w-[58%] overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] lg:h-full lg:w-auto">
                <Image src={photos[act.photos[0]].src} alt={photos[act.photos[0]].alt} fill sizes="(min-width: 1024px) 30vw, 60vw" quality={70} className="object-cover" />
              </div>
              <div data-act-img className="absolute bottom-0 left-0 aspect-[4/5] w-[44%] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] lg:w-[36%]">
                <Image src={photos[act.photos[1]].src} alt={photos[act.photos[1]].alt} fill sizes="(min-width: 1024px) 18vw, 45vw" quality={70} className="object-cover" />
              </div>
              <div data-act-img className="absolute left-[12%] top-[4%] aspect-square w-[28%] overflow-hidden rounded-full shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)] lg:left-[8%] lg:w-[24%]">
                <Image src={photos[act.photos[2]].src} alt={photos[act.photos[2]].alt} fill sizes="(min-width: 1024px) 12vw, 30vw" quality={70} className="object-cover" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
