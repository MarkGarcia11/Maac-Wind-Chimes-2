# Maac Wind Chimes — Website Redesign

A complete redesign of [maacwindchimes.com](https://maacwindchimes.com) — a small,
family-run Nebraska maker of collectible, handmade wind chimes since 1998.

**Brand idea: "The sound of a memory."** Warm, calm, unhurried, elegant, nostalgic, human.

## What's inside

- **Next.js (App Router) + TypeScript + Tailwind CSS v4**
- **Framer Motion** (pendulum headlines, reveals, magnetic buttons, page transitions)
  and **GSAP ScrollTrigger** (pinned scrollytelling chapter sequence on the homepage)
- **react-three-fiber / three.js** — the interactive 3D "Meet a Chime" feature with
  procedural geometry (no heavy GLB downloads), drag-to-spin, tap-to-ring, car selector
- **PostgreSQL + Drizzle ORM** — scraped catalog content (37 real products with their
  original photos, names, prices, SKUs), events, orders, inquiries, newsletter
- **Cart, wishlist (shareable), "drop a hint", checkout, admin desk** at `/admin`
- WebAudio-synthesized chime tones (off by default, speaker toggle in the header)
- SEO: metadata, Open Graph, JSON-LD (LocalBusiness, Product, Event, Breadcrumb, FAQ),
  `sitemap.xml`, `robots.txt`, accessible markup, pinch-zoom enabled, reduced-motion support

## Content from the original site

All written content and images were scraped from the original site and included:

- `/public/images/products/` — 36 original product photos (DSCN series)
- `/public/images/brand/` — original logo and store badges
- `/src/db/seed-data.ts` — real product names, prices ($25.00, $30, $20, $10),
  SKUs, descriptions ("Cars are die cast 1:40th scale…", "+ $11.00 shipping",
  "Call 402-880-9981 for availability"), and the Papillion-LaVista South Arts &
  Crafts Festival event (Nov 14, 9 AM–3 PM, 10799 Hwy 370, Space #12)

Lifestyle imagery in `/public/images/lifestyle/` is AI-generated placeholder photography
matching the art direction — swap in the client's real photos without code changes.

## Running locally

```bash
npm install
npx drizzle-kit push   # create tables in your Postgres
npm run dev
```

The database **auto-seeds itself** on first request — the scraped catalog content
ships with the code, so any fresh Postgres (Vercel Postgres, Neon, Supabase…) is
populated automatically. To reseed manually: `npx tsx scripts/seed.ts`.

## Deploying to Vercel + GitHub

1. Push this repo to GitHub.
2. Import it in Vercel (no build settings needed — it's a standard Next.js app).
3. Add a Postgres database (Vercel Postgres / Neon / Supabase) and set one
   environment variable: `DATABASE_URL=postgresql://…`
4. Redeploy. Tables are created with `npx drizzle-kit push` (or your CI step) and
   the app seeds itself on first visit.

## Editable settings

Everything the client changes often lives in exactly one file — `src/lib/site.ts`:
phone number, email, shipping price, announcement bar, store links, hours.

## Placeholders awaiting client input (marked in the UI)

- Makers' names, signature, and the real workshop photos ("Our story")
- Real customer testimonials (clearly marked placeholder stories ship in seed data)
- Hours of operation, Stripe live keys (payment step is a labeled placeholder)
