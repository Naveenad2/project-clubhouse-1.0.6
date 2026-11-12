import type { Metadata } from "next";
import { menuJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { MenuHero } from "@/components/menu/MenuHero";
import { MenuExplorer } from "@/components/menu/MenuExplorer";

const title = "Menu — Rotisserie Chicken, Burgers, Breakfast & Coffee";
const description =
  "The Club House Fort Kochi menu: rotisserie chicken, smash burgers, all-day breakfast and French omelettes, pasta, Kerala coastal plates, desserts, coffee and coolers. Prices in ₹.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu", title: `${title} · Club House Fort Kochi`, description },
  twitter: { card: "summary_large_image", title: `${title} · Club House Fort Kochi`, description },
};

export default function MenuPage() {
  return (
    <div>
      <JsonLd data={menuJsonLd()} />
      <MenuHero />
      <MenuExplorer />
    </div>
  );
}
