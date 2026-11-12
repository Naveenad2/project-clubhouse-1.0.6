import { Marquee } from "@/components/ui/Marquee";

const ROW_ONE = ["Rotisserie Chicken", "Smash Burgers", "Butter Croissants", "French Omelettes", "Flat Whites"] as const;
const ROW_TWO = ["Party Nights", "Open Kitchen", "Princess Street", "Since 7:30 AM", "Fort Kochi"] as const;

export function MarqueeBand() {
  return (
    <section aria-label="What we're known for" className="relative overflow-hidden bg-forest-900 py-10 text-cream-100 lg:py-14">
      <Marquee items={ROW_ONE} className="display text-[clamp(2.75rem,7vw,7rem)]" />
      <Marquee
        items={ROW_TWO}
        direction={-1}
        duration={46}
        className="mt-2 font-display text-[clamp(2.75rem,7vw,7rem)] font-light italic tracking-tight text-brass"
      />
    </section>
  );
}
