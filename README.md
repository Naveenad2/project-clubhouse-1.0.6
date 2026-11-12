# Club House Fort Kochi — website

Next.js 16 (App Router, TypeScript, Tailwind CSS v4) with GSAP + ScrollTrigger + SplitText and Lenis smooth scrolling.
Every route is prerendered as static HTML.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Set the live domain before deploying (used for canonical URLs, sitemap, Open Graph and JSON-LD):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Where to edit content

| What | File |
| --- | --- |
| Address, phone, hours, Instagram link, rating, price range | `src/data/site.ts` |
| Menu categories, dishes, prices, veg/egg/non-veg, photos | `src/data/menu.ts` |
| Photo library + alt text | `src/data/images.ts` (files in `src/assets/images`) |
| Brand colours & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Share images | `src/app/opengraph-image.jpg`, `src/app/menu/opengraph-image.jpg` |

### Please verify before launch

- **Hours** (7:30 AM – 1 AM, closed Wednesdays), **phone** and **address** came from public listings — confirm in `src/data/site.ts`.
- **Instagram**: paste your profile URL into `instagramUrl` — the "Follow on Instagram" buttons and `sameAs` schema appear automatically.
- **Menu & prices** in `src/data/menu.ts` are sample content modelled on what guests mention (rotisserie chicken, burgers,
  French omelette, croissants, coffee). Replace them with the real menu.
- **Photos**: images in `src/assets/images/feed` were cropped from Instagram screenshots and are low resolution —
  drop in the original files with the same names for sharper results. Food photography in `src/assets/images/food`
  is from Unsplash (free licence); swap in your own dishes whenever you can.

## Structure

```
src/app            routes: / , /menu , 404, sitemap, robots, manifest, icons, share images
src/components
  home/            Hero (arched window → full-bleed), Manifesto, Signatures (horizontal), DayToNight, TheHouse, Feed, Visit
  menu/            MenuHero, MenuExplorer (dock, scroll-spy, veg filter, hover preview), DietMark
  layout/          Header, MobileMenu, Footer, OpenStatus (live open/closed in Fort Kochi time)
  providers/       SmoothScroll (Lenis), PageTransition (curtain + scroll handling), Preloader
  ui/              RevealText, ParallaxImage, Marquee, Magnetic, Cursor, RotatingBadge
src/lib            gsap setup, hours logic, structured data, scroll helpers
```

Animations respect `prefers-reduced-motion`. Desktop-only effects (pinned scenes, cursor, magnetic buttons, hover preview)
fall back to simpler, touch-friendly layouts on phones.
