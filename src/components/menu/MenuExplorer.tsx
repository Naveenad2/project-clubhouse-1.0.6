"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { photos } from "@/data/images";
import { MENU, formatPrice, lowestPrice, type MenuCategory, type MenuItem } from "@/data/menu";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SwissCross } from "@/components/brand/SwissCross";
import { DietMark } from "./DietMark";
import { MenuPreview } from "./MenuPreview";
import { previewStore } from "./preview-store";

function ItemRow({ item }: { item: MenuItem }) {
  const photo = item.photo ? photos[item.photo] : null;
  const variants = typeof item.price === "number" ? null : item.price;

  return (
    <li
      data-menu-item
      className="group/item relative grid grid-cols-[1fr] gap-4 border-b border-forest-900/12 py-6 sm:py-7"
      onPointerEnter={() => item.photo && previewStore.set(item.photo)}
      onPointerLeave={() => previewStore.set(null)}
    >
      <div className={cn("flex gap-4", photo && "items-start")}>
        {photo && (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-cream-200 sm:size-20 lg:hidden">
            <Image src={photo.src} alt={photo.alt} fill sizes="80px" quality={70} className="object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <DietMark diet={item.diet} className="size-3.5 shrink-0 translate-y-[0.1em]" />
            <h3 className="font-display text-[1.35rem] leading-tight transition-colors duration-300 group-hover/item:text-forest-600 sm:text-[1.6rem]">
              {item.name}
            </h3>
            <span aria-hidden="true" className="dotted-leader hidden h-2 min-w-6 flex-1 self-center sm:block" />
            <p className="ml-auto shrink-0 font-display text-lg tabular-nums sm:ml-0 sm:text-xl">
              {variants ? (
                <>
                  <span className="text-sm text-forest-900/55">from </span>₹{lowestPrice(item.price)}
                </>
              ) : (
                formatPrice(item.price)
              )}
            </p>
          </div>
          <p className="mt-2 max-w-[56ch] text-[0.95rem] leading-relaxed text-forest-900/65">{item.description}</p>
          {(variants || item.tags) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {variants?.map((v) => (
                <span key={v.label} className="rounded-full border border-forest-900/15 px-3 py-1 text-xs tabular-nums">
                  {v.label} · ₹{v.price}
                </span>
              ))}
              {item.tags?.map((tag) => (
                <span key={tag} className="eyebrow rounded-full bg-forest-900 px-3 py-1.5 text-[0.58rem] text-cream-100">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function CategorySection({ category, index, items }: { category: MenuCategory; index: number; items: MenuItem[] }) {
  return (
    <section id={category.id} aria-labelledby={`${category.id}-title`} data-menu-section className="scroll-mt-28 py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow flex items-center gap-3 text-forest-900/55">
              <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-forest-900/25" />
              {category.kicker}
            </p>
            <h2 id={`${category.id}-title`} className="display mt-5 text-[clamp(2.75rem,5vw,5.25rem)]">
              {category.title}
            </h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-forest-900/65">{category.description}</p>
            <ParallaxImage
              photo={photos[category.cover]}
              sizes="(min-width: 1024px) 34vw, 92vw"
              className="mt-8 aspect-[16/11] rounded-t-[12rem] sm:aspect-[16/9] lg:aspect-[4/3.4] lg:rounded-t-full"
              speed={7}
            />
          </div>
        </header>
        <ul className="lg:col-span-7 lg:pt-2">
          {items.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MenuExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const dockList = useRef<HTMLUListElement>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [active, setActive] = useState<string>(MENU[0].id);
  const [dockVisible, setDockVisible] = useState(false);

  const categories = useMemo(
    () =>
      MENU.map((category) => ({ category, items: vegOnly ? category.items.filter((i) => i.diet === "veg") : category.items })).filter(
        (c) => c.items.length > 0,
      ),
    [vegOnly],
  );

  // Scroll-spy + dock visibility.
  useEffect(() => {
    const root = ref.current!;
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    root.querySelectorAll("[data-menu-section]").forEach((s) => spy.observe(s));
    const dock = new IntersectionObserver(([entry]) => setDockVisible(entry.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    dock.observe(root);
    return () => {
      spy.disconnect();
      dock.disconnect();
    };
  }, [categories]);

  // Keep the active chip in view inside the dock without moving the page.
  useEffect(() => {
    const list = dockList.current;
    const chip = list?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!list || !chip) return;
    const offset = chip.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
    list.scrollTo({ left: offset - list.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-menu-item]").forEach((row) => {
          gsap.from(row, { y: 36, autoAlpha: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: row, start: "top 92%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [vegOnly], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className="relative bg-cream-50 text-forest-900">
      <div className="mx-auto max-w-[1680px] px-5 pb-24 sm:px-8 lg:px-12">
        {categories.map(({ category, items }) => (
          <CategorySection key={category.id} category={category} index={MENU.indexOf(category)} items={items} />
        ))}

        <aside className="mt-8 grid gap-6 rounded-[2rem] bg-forest-900 p-8 text-cream-100 sm:p-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4 flex items-center gap-3 text-cream-100/60">
              <SwissCross className="size-3" /> Good to know
            </p>
            <p className="display text-[clamp(1.8rem,3vw,2.75rem)]">Allergies or preferences? Tell us — our kitchen is open, literally.</p>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-cream-100/70 lg:col-span-4">
            <li className="flex items-center gap-3">
              <DietMark diet="veg" /> Vegetarian
            </li>
            <li className="flex items-center gap-3">
              <DietMark diet="egg" /> Contains egg
            </li>
            <li className="flex items-center gap-3">
              <DietMark diet="nonveg" /> Non-vegetarian
            </li>
            <li>Prices in Indian Rupees (₹). Menu and prices may change with the seasons.</li>
          </ul>
        </aside>
      </div>

      {/* floating category dock */}
      <nav
        aria-label="Menu categories"
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-fit items-center gap-1 rounded-full border border-cream-100/10 bg-forest-950/90 p-1.5 text-cream-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] sm:bottom-5",
          dockVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setVegOnly((v) => !v)}
          aria-pressed={vegOnly}
          className={cn(
            "eyebrow flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2.5 text-[0.6rem] transition-colors",
            vegOnly ? "bg-[#2f8f46] text-white" : "bg-cream-100/10 hover:bg-cream-100/20",
          )}
        >
          <span className={cn("grid size-3 place-items-center rounded-[3px] border", vegOnly ? "border-white" : "border-[#5fbf72]")}>
            <span className={cn("size-1.5 rounded-full", vegOnly ? "bg-white" : "bg-[#5fbf72]")} />
          </span>
          Veg
        </button>
        <ul ref={dockList} className="no-scrollbar flex max-w-[calc(100vw-9rem)] items-center gap-1 overflow-x-auto scroll-smooth lg:max-w-none">
          {categories.map(({ category }) => (
            <li key={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                data-chip={category.id}
                aria-current={active === category.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(`#${category.id}`, { offset: -96 });
                  window.history.replaceState(window.history.state, "", `#${category.id}`);
                }}
                className={cn(
                  "eyebrow block whitespace-nowrap rounded-full px-3.5 py-2.5 text-[0.6rem] transition-colors",
                  active === category.id ? "bg-cream-100 text-forest-900" : "text-cream-100/70 hover:text-cream-100",
                )}
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <MenuPreview />
    </div>
  );
}
