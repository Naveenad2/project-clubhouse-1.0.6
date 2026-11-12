import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Manrope } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SITE } from "@/data/site";
import { siteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { LogoSprite } from "@/components/brand/Logo";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageTransition } from "@/components/providers/PageTransition";
import { Preloader } from "@/components/providers/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Club House Fort Kochi — Café & Restaurant on Princess Street",
    template: "%s · Club House Fort Kochi",
  },
  description: SITE.description,
  applicationName: SITE.fullName,
  keywords: [
    "Club House Fort Kochi",
    "cafe in Fort Kochi",
    "restaurant in Fort Kochi",
    "Princess Street cafe",
    "best burger in Fort Kochi",
    "rotisserie chicken Kochi",
    "breakfast in Fort Kochi",
    "late night cafe Kochi",
    "continental restaurant Kochi",
    "coffee Fort Kochi",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "restaurant",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: false },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.fullName,
    title: "Club House Fort Kochi — Café & Restaurant on Princess Street",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Club House Fort Kochi — Café & Restaurant",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Fort Kochi, Kerala",
  },
};

export const viewport: Viewport = {
  themeColor: "#14221a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Runs before first paint: flags JS for progressive-enhancement CSS and skips the preloader on repeat visits.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('ch-visited'))d.setAttribute('data-visited','')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${manrope.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={siteJsonLd()} />
      </head>
      <body>
        <LogoSprite />
        <Preloader />
        <SmoothScroll />
        <PageTransition>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </PageTransition>
        <Cursor />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
