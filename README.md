# Nirmal Kandel — Website pitch platform

A portfolio site where small businesses open a **live demo website built for their industry**, then ask for one of their own.
Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · React Three Fiber · Lucide · Web3Forms · Vercel.

The full specification is in [`docs/SITE-SPEC.md`](docs/SITE-SPEC.md).

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
| `/industries`, `/industries/[slug]` | 10 industry pages from one template |
| `/demos` | All demos with an industry filter |
| `/demos/<slug>` | 10 separate demo websites (restaurant, photography, interior, salon, real-estate, coaching, furniture, manufacturer, fashion, home-services) |
| `/whats-possible` | Feature gallery with live 3D and video, "I want this" picker |
| `/pricing` | Packages, comparison, add-ons, care plans, in the visitor's currency |
| `/contact` | Enquiry form (prefilled from `?industry=&demo=&package=&features=`) |
| `/privacy` | Privacy note |

## Everyday edits

| To change… | Edit |
|---|---|
| Name, WhatsApp number, email, photo, tagline | `src/data/site.ts` |
| Prices (all 7 currencies), add-ons, care plans, payment notes | `src/data/pricing.ts` |
| Industry copy and images | `src/data/industries.ts` |
| Demo cards (names, tags, summaries) | `src/data/demos.ts` |
| FAQ | `src/data/faq.ts` |
| Features on /whats-possible | `src/data/features.ts` |

**Your photo:** save it as `public/me.jpg` and set `photo: "/me.jpg"` in `src/data/site.ts`.

## How currency works

`src/proxy.ts` reads Vercel's `x-vercel-ip-country` header on the first visit and sets a `cur` cookie
(IN→₹, US→$, GB→£, IE→€, AU→A$, CA→C$, NZ→NZ$, everywhere else→$). Pages stay static; prices render on the client
from the cookie. Locally there's no geo header, so the timezone is used instead. Visitors can switch currency in the footer
or on the pricing page.

## Enquiry form (Web3Forms)

The form posts from the browser to Web3Forms (the free plan doesn't allow server-side calls). It only shows "sent" when
Web3Forms returns `success: true`. On any error, or if the key is missing, it keeps the visitor's text and offers a
prefilled WhatsApp message instead. Free plan: 250 submissions/month.

## Deploy to Vercel

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
