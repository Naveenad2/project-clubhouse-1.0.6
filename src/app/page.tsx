import { Hero } from "@/components/home/Hero";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { Manifesto } from "@/components/home/Manifesto";
import { Signatures } from "@/components/home/Signatures";
import { DayToNight } from "@/components/home/DayToNight";
import { TheHouse } from "@/components/home/TheHouse";
import { Feed } from "@/components/home/Feed";
import { Visit } from "@/components/home/Visit";

export default function HomePage() {
  // A single root element: GSAP pinning re-parents sections into pin-spacers, and React must
  // never need one of those sections as an insertion reference when routes swap.
  return (
    <div>
      <Hero />
      <MarqueeBand />
      <Manifesto />
      <Signatures />
      <DayToNight />
      <TheHouse />
      <Feed />
      <Visit />
    </div>
  );
}
