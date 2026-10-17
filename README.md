# Nirmal Kandel — Website pitch platform

A portfolio site where small businesses open a **live demo website built for their industry**, then ask for one of their own.
Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · React Three Fiber · Lucide · Web3Forms · Vercel.

**Live site: https://webpitch.vercel.app** · Repository: https://github.com/NIRMALKANDEL/webpitch

| Page | Link |
|---|---|
| Home (dark/light theme, live demo cards) | https://webpitch.vercel.app |
| All demos | https://webpitch.vercel.app/demos |
| Pricing | https://webpitch.vercel.app/pricing |
| Contact (emails nirmalatlance@gmail.com) | https://webpitch.vercel.app/contact |
| Developer portfolio | https://nirmal-portfolio-eta.vercel.app |

The full specification is in [`docs/SITE-SPEC.md`](docs/SITE-SPEC.md).

## Live demos

| Demo | Industry | Highlights |
|---|---|---|
| [Tamarind & Smoke](https://webpitch.vercel.app/demos/restaurant) | Restaurant (London) | 4K video hero, menu tabs, WhatsApp order cart, table booking |
| [Kohl & Gold Studio](https://webpitch.vercel.app/demos/photography) | Wedding photography | 4K showreel, filterable portfolio, packages |
| [Studio Neem](https://webpitch.vercel.app/demos/interior) | Interior design | 3D room planner (3 styles, furniture drops in), project modals, before/after slider |
| [Velvet Rooms](https://webpitch.vercel.app/demos/salon) | Salon & spa | 3-step booking with running total |
| [Harbourline Estates](https://webpitch.vercel.app/demos/real-estate) | Real estate | Drone video, immersive 3D tower with day/night, pull-out floor plans, EMI calculator |
| [Apex Academy](https://webpitch.vercel.app/demos/coaching) | Coaching | Course filters, timetable, admission enquiry |
| [Woodgrain & Co.](https://webpitch.vercel.app/demos/furniture) | Furniture | Live 3D chair configurator, quote list, room hotspots |
| [Forgeline Industries](https://webpitch.vercel.app/demos/manufacturer) | Manufacturing (B2B) | 3D exploded part viewer, spec catalogue, bulk enquiry |
| [Maison Ira](https://webpitch.vercel.app/demos/fashion) | Fashion | Video lookbook, scroll-driven gallery, bag + WhatsApp checkout |
| [FixRight Home Services](https://webpitch.vercel.app/demos/home-services) | Home services (Toronto) | Postal code coverage checker, quote form |
| [Pearl & Pine Dental](https://webpitch.vercel.app/demos/dental) | Dental clinic | Appointment scheduler with live time slots, dentist profiles |
| [Kai Varma](https://webpitch.vercel.app/demos/portfolio) | Personal portfolio | Interactive 3D sculpture, tilt cards, scramble text, cursor glow |
| [FIZZBOLT Energy](https://webpitch.vercel.app/demos/energy-drink) | Energy drink brand | 3D can with floating ingredients, flavour repaint, scroll-spin can, pack ordering |

Every demo has a floating demo bar: **All demos**, previous/next demo, a demo switcher (with Main website link),
**Get a Website Like This**, and WhatsApp. It collapses to a small tab that keeps the **All demos** shortcut.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms key
npm run dev
```

`npm run build` creates the production build; `npm run lint` checks the code.

## What's inside

| Route | What it is |
|---|---|
| `/` | Homepage: 3D demo carousel, industries, featured demos, what's possible, about, pricing, process, FAQ, quick enquiry |
| `/industries`, `/industries/[slug]` | 13 industry pages from one template |
| `/demos` | All demos with an industry filter |
| `/demos/<slug>` | 13 separate demo websites (see the table above) |
| `/whats-possible` | Feature gallery with live 3D and video, "I want this" picker |
| `/pricing` | Packages, comparison, add-ons, care plans (no prices shown; pricing is quoted per project) |
| `/contact` | Enquiry form (prefilled from `?industry=&demo=&package=&features=`) |
| `/privacy` | Privacy note |

## Everyday edits

| To change… | Edit |
|---|---|
| Name, WhatsApp number, email, photo, tagline | `src/data/site.ts` |
| Packages, add-ons, care plans, payment notes | `src/data/pricing.ts` |
| Industry copy and images | `src/data/industries.ts` |
| Demo cards (names, tags, summaries) | `src/data/demos.ts` |
| FAQ | `src/data/faq.ts` |
| Features on /whats-possible | `src/data/features.ts` |

**Your photo:** save it as `public/me.jpg` and set `photo: "/me.jpg"` in `src/data/site.ts`.

## How currency works

`src/proxy.ts` reads Vercel's `x-vercel-ip-country` header on the first visit and sets a `cur` cookie
(IN→₹, US→$, GB→£, IE→€, AU→A$, CA→C$, NZ→NZ$, everywhere else→$). The site shows no prices; the cookie is used to
pre-fill the visitor's country on the enquiry form and is recorded with each enquiry. Locally there's no geo header, so the
timezone is used instead.

## SEO, sharing and analytics

- **Page metadata:** every page builds its title, description, canonical URL, Open Graph and Twitter card with
  `pageMeta()` from `src/lib/seo.ts`. Structured data (business, website, FAQ, service, breadcrumbs) lives in `src/lib/schema.ts`.
- **Social images:** `public/og/*.jpg` (1200×630), one per main page and per industry. Icons: `public/favicon.*`,
  `public/icon-*.png`, `public/apple-touch-icon.png`, with the web manifest in `src/app/manifest.ts`.
- **Analytics:** set `NEXT_PUBLIC_GA_ID` (GA4) to enable. Google Analytics loads only after the visitor accepts analytics
  in the cookie banner. Conversion events are listed in `src/lib/analytics.ts`; mark `generate_lead` as a key event in GA4.
- **Security headers:** set in `next.config.ts`. The full Content Security Policy runs in report-only mode first; once the
  browser console is clean on the live site, move it into the enforced policy.

## Enquiry form (Web3Forms)

The form posts from the browser to Web3Forms (the free plan doesn't allow server-side calls). It only shows "sent" when
Web3Forms returns `success: true`. On any error, or if the key is missing, it keeps the visitor's text and offers a
prefilled WhatsApp message instead. Free plan: 250 submissions/month.

## Deployment

Deployed on Vercel as project `webpitch` (team *nirmalkandel's projects*): https://webpitch.vercel.app.
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_KEY` are set (enquiries go to nirmalatlance@gmail.com).

The project is connected to this GitHub repository: every push to `master` deploys to production automatically.
To deploy by hand from this folder: `npx vercel deploy --prod`.

Packages, add-ons and care plans live in `src/data/pricing.ts`. The site deliberately shows no prices.

### Deploying a fresh copy

1. Push this folder to a GitHub repository.
2. On vercel.com: **Add New → Project →** import the repository (framework is detected automatically).
3. Add `NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` under Settings → Environment Variables (Production and Preview).
4. Deploy, then add your custom domain under Settings → Domains.
5. Smoke test on production: send a real enquiry, test WhatsApp on a phone, and open the site through a VPN to check currency detection.

Or with the CLI: `npm i -g vercel`, then `vercel` and `vercel --prod`.

## Adding a new demo

1. Add it to `src/data/demos.ts`.
2. Create `src/app/(demo-sites)/demos/<slug>/layout.tsx` (fonts + `DemoShell`) and `page.tsx`.
   Keep data that the server page reads in a plain `.ts` file, not in a `"use client"` module.
3. Add a screenshot at `public/previews/<slug>.jpg` (1440×900).

## Credits

Photos: Unsplash. Videos: Pexels. Full list and licences in [`docs/ASSETS.md`](docs/ASSETS.md).
All demo businesses are fictional, and every demo is labelled as a concept and set to `noindex`.
