# NirmalBuilds — web design for small businesses in Indore

A portfolio site where small businesses open a **live demo website built for their industry**, then ask for one of their own.
Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · Motion · React Three Fiber · Lucide · Web3Forms · Vercel.

**Live site:** set `NEXT_PUBLIC_SITE_URL` to your domain (e.g. https://nirmalbuilds.com) · Repository: https://github.com/NIRMALKANDEL/webpitch

| Page | What it's for |
|---|---|
| `/` | Homepage: static keyword H1, live demo cards, prices, about, process, FAQ, enquiry |
| `/web-design-indore` | Local landing page for "web designer in Indore" searches |
| `/pricing` | Starting prices in ₹ for every package, add-on and care plan |
| `/industries/<slug>` | One page per industry; focus industries have long-form copy + FAQ schema |
| `/about` | About Nirmal (Person schema, links to LinkedIn and GitHub) |
| `/blog`, `/blog/<slug>` | Articles for business owners (BlogPosting schema) |
| `/work` | Real client case studies (hidden from Google until the first one is added) |
| `/for/<slug>` | Private personalised sample sites for outreach (noindex) |
| `/demos`, `/demos/<slug>` | 14 fictional demo websites (noindex) |

The full original specification is in [`docs/SITE-SPEC.md`](docs/SITE-SPEC.md).

## Everyday edits

| To change… | Edit |
|---|---|
| Brand, city, WhatsApp, email, social links | `src/data/site.ts` |
| Prices, packages, add-ons, care plans, payment terms | `src/data/pricing.ts` |
| Real testimonials and case studies | `src/data/work.ts` |
| Blog posts | `src/data/blog.ts` |
| Personalised outreach demos | `src/data/prospects.ts` |
| Long copy + FAQ for focus industries | `src/data/industry-content.ts` |
| Industry cards and short copy | `src/data/industries.ts` |
| Demo cards (names, cities, tags) | `src/data/demos.ts` |
| Homepage FAQ | `src/data/faq.ts` |

Social share images in `public/og/` were regenerated for the NirmalBuilds brand. If you change the domain or prices,
regenerate them (or edit the text in any image editor) so link previews stay accurate.

## Live demos

All demo businesses are fictional and set in India.

| Demo | Industry (city) | Highlights |
|---|---|---|
| [Tamarind & Smoke](/demos/restaurant) | restaurants (Indore) | 4K video hero, WhatsApp cart, Table booking |
| [Velvet Rooms](/demos/salon) | salons (Indore) | 3-step booking, Price tabs, Offers |
| [Brightloop](https://creativewebsite-ten.vercel.app/) (own site) | agencies (Indore) | Animated reels hero, Swipeable reels, Discovery call |
| [FixRight Home Services](/demos/home-services) | home-services (Indore) | PIN code checker, Sticky call bar, Quote form |
| [Pearl & Pine Dental](/demos/dental) | clinics (Bhopal) | Appointment scheduler, Dentist profiles, Treatment prices |
| [Apex Academy](/demos/coaching) | coaching (Kota) | Course filters, Timetable, Admission form |
| [Harbourline Estates](/demos/real-estate) | real-estate (Kochi) | Drone video, 3D floor picker, EMI calculator |
| [Studio Neem](/demos/interior) | interiors (Pune) | Before/after slider, Project modals, Consultation booking |
| [Kohl & Gold Studio](/demos/photography) | photographers (Jaipur) | 4K showreel, Portfolio lightbox, Packages |
| [Maison Ira](/demos/fashion) | fashion (Delhi) | Video lookbook, Quick view, Bag checkout |
| [Woodgrain & Co.](/demos/furniture) | furniture (Jodhpur) | 3D configurator, Workshop film, Quote list |
| [Forgeline Industries](/demos/manufacturer) | manufacturing (Ludhiana) | 3D part viewer, Spec catalogue, Bulk enquiry |
| [Kai Varma](/demos/portfolio) | personal-brands (Bengaluru) | Interactive 3D hero, Tilt project cards, Scroll transitions |
| [FIZZBOLT Energy](/demos/energy-drink) | beverages (Mumbai) | 3D can, Flavour switcher, Floating ingredients |

Every demo has a floating demo bar: **All demos**, previous/next demo, a demo switcher (with Main website link),
**Get a Website Like This**, and WhatsApp. It collapses to a small tab that keeps the **All demos** shortcut.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms key
npm run dev
```

`npm run build` creates the production build; `npm run lint` checks the code.

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
- **Google Tag Manager (optional):** set `NEXT_PUBLIC_GTM_ID` (GTM-XXXXXXX). Tag Manager then loads after consent instead of the
  direct GA code (`NEXT_PUBLIC_GA_ID` is ignored, so nothing is counted twice). In the container add:
  1. a **Google tag** with your `G-` ID, trigger *Initialization – All Pages* (page views, including in-app navigation, come
     from GA4's enhanced measurement);
  2. a **Custom Event** trigger with event name `generate_lead|whatsapp_click|email_click|phone_click|cta_click|demo_open`
     and "Use regex matching" ticked;
  3. a **GA4 Event** tag with Event Name `{{Event}}`, fired by that trigger. Add the parameters you want (`page`, `label`,
     `destination`, `demo`, `industry`, `package`) as Data Layer Variables.
  The `<noscript>` part of Google's snippet is deliberately left out: visitors without JavaScript can't give consent.
- **Google Search Console:** for `webpitch.vercel.app` use the *URL prefix* property with the *HTML tag* method and put only the
  `content` value in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (redeploy, then click Verify). With a custom domain you can verify
  by DNS TXT record instead (no code). Then submit `sitemap.xml` under *Sitemaps*.
- **Security headers:** set in `next.config.ts`. The full Content Security Policy runs in report-only mode first; once the
  browser console is clean on the live site, move it into the enforced policy.

## Enquiry form (Web3Forms)

The form posts from the browser to Web3Forms (the free plan doesn't allow server-side calls). It only shows "sent" when
Web3Forms returns `success: true`. On any error, or if the key is missing, it keeps the visitor's text and offers a
prefilled WhatsApp message instead. Free plan: 250 submissions/month.

## Deployment

Deployed on Vercel as project `webpitch`. Note: Vercel's free Hobby plan is for non-commercial use only; a business site needs the Pro plan (or another host).
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
3. Add a screenshot at `public/previews/<slug>.jpg` (1440×900) and `.webp`, plus the tall one in `public/previews/tall/`.

A demo can have several pages: put them in sub-folders of its route (see `demos/agency`, whose own nav and footer live
in its `layout.tsx`).

## Credits

Photos: Unsplash. Videos: Pexels. Full list and licences in [`docs/ASSETS.md`](docs/ASSETS.md).
All demo businesses are fictional, and every demo is labelled as a concept and set to `noindex`.
