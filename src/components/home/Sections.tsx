"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Hammer,
  Sparkles,
  MapPin,
  Phone,
  CalendarPlus,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";
import { Reveal, PendulumTitle, WaveDivider, Magnetic, Sway, WindOrnament } from "@/components/motion";
import ProductCard from "@/components/ProductCard";
import { site } from "@/lib/site";
import type { Product, Category, EventRow, Review } from "@/lib/data";

/* ------------------------------ Trust strip ------------------------------ */
export function TrustStrip() {
  const items = ["Handmade since 1998", "Every chime unique", "Made in Nebraska", "Real people on the phone"];
  return (
    <section aria-label="Why Maac" className="border-y border-hairline bg-ivory">
      <ul className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-6 px-5 py-6 text-center md:grid-cols-4 lg:px-10">
        {items.map((t, i) => (
          <Reveal key={t} delay={i * 0.08} y={14}>
            <li className="flex items-center justify-center gap-2.5 py-2 text-[13px] uppercase tracking-[0.18em] text-espresso-2/80">
              <span aria-hidden className="h-1 w-1 rounded-full bg-brass" />
              {t}
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* --------------------- Featured editorial collection grid --------------------- */
export function Featured({ products }: { products: Product[] }) {
  const reduce = useReducedMotion();
  const featured = products.slice(0, 7);
  if (!featured.length) return null;
  const [hero, ...rest] = featured;

  return (
    <section aria-labelledby="featured" className="relative mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
      <WindOrnament className="absolute right-16 top-4 hidden lg:block" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal><p className="eyebrow">This week on the workbench</p></Reveal>
          <PendulumTitle
            text="A few favorites."
            className="font-display mt-3 text-5xl leading-none text-espresso lg:text-7xl"
            italicWords={["favorites."]}
          />
        </div>
        <Reveal delay={0.2}>
          <Link href="/collection" className="btn-line flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-espresso-2">
            Explore the full catalog <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>

      {/* asymmetric editorial composition */}
      <div className="mt-14 grid gap-6 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6 lg:col-span-5"
        >
          <Link href={`/shop/${hero.slug}`} className="group block">
            <div className="card-zoom relative overflow-hidden border border-hairline">
              <Image
                src={hero.image}
                alt={`${hero.name} — handmade wind chime`}
                width={900}
                height={1100}
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-ivory/90 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-espresso backdrop-blur-sm">
                The one everyone asks about
              </span>
            </div>
            <div className="mt-5 flex items-baseline justify-between">
              <h3 className="font-display text-3xl text-espresso">{hero.name}</h3>
              <p className="text-lg text-espresso-2">$25.00</p>
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:col-span-6 md:mt-16 lg:col-span-7 lg:gap-x-8 lg:gap-y-12">
          {rest.slice(0, 6).map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>

      <Reveal className="mt-16 text-center" delay={0.1}>
        <Magnetic>
          <Link
            href="/collection"
            className="inline-flex min-h-14 items-center gap-3 border border-espresso px-12 text-[13px] uppercase tracking-[0.25em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
          >
            Explore More <ArrowRight size={15} />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Shop by memory ------------------------------ */
export function ShopByMemory({ categories }: { categories: Category[] }) {
  const tiles = categories.slice(0, 7);
  return (
    <section aria-labelledby="by-memory" className="border-y border-hairline bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal><p className="eyebrow">Shop by memory</p></Reveal>
        <PendulumTitle
          text="Which one was yours?"
          className="font-display mt-3 max-w-2xl text-5xl leading-[1.02] text-espresso lg:text-7xl"
          italicWords={["yours?"]}
        />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-xl text-espresso-2/80">
            Most people don’t shop for a wind chime. They shop for the ’57, the Bug,
            the truck Grandpa kept behind the barn. Start with the memory.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
              <Link
                href={`/collection?category=${c.slug}`}
                className="group relative block h-full overflow-hidden"
                aria-label={`Shop ${c.name}`}
              >
                <div className={`card-zoom relative w-full ${i === 0 ? "aspect-square lg:aspect-auto lg:h-full lg:min-h-[420px]" : "aspect-[4/3]"}`}>
                  <Image
                    src={c.image}
                    alt={`${c.name} wind chimes`}
                    fill
                    sizes={i === 0 ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/75 via-espresso/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-ivory">{c.name}</h3>
                      <p className="btn-line mt-1 inline-block text-[12px] uppercase tracking-[0.2em] text-brass-2">
                        Shop the shelf
                      </p>
                    </div>
                    <ArrowRight size={17} className="mb-1 text-ivory/70 transition-transform duration-500 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Custom chime invitation --------------------------- */
export function CustomInvite() {
  return (
    <section aria-labelledby="custom-invite" className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <div className="relative order-2 lg:order-1">
          <Reveal>
            <div className="card-zoom relative ml-auto aspect-[4/5] w-[78%] overflow-hidden">
              <Image
                src="/images/lifestyle/workshop-hands.jpg"
                alt="Hands assembling a wind chime with a die-cast car on a workbench"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 80vw, 40vw"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card-zoom absolute -bottom-8 left-0 aspect-square w-[46%] overflow-hidden border-4 border-ivory shadow-xl">
              <Image
                src="/images/products/57-chevy-taxi.jpg"
                alt="Custom 57 Chevy taxi wind chime detail"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 40vw, 20vw"
              />
            </div>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2">
          <Reveal><p className="eyebrow">Custom chimes</p></Reveal>
          <PendulumTitle
            text="Have an idea? Tell us about it."
            className="font-display mt-3 text-5xl leading-[1.04] text-espresso lg:text-6xl"
            italicWords={["idea?"]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-espresso-2/85">
              If it means something to you, we can probably hang it from a chime. Send us a
              note — a photo helps, a story helps more. We’ll sketch it, make it, and ship it.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                [Hammer, "Tell us the car, truck, critter, or team"],
                [Sparkles, "We build it by hand — each one a little different"],
                [Phone, "We call if we have questions, then it ships"],
              ].map(([Icon, text], i) => {
                const I = Icon as typeof Hammer;
                return (
                  <li key={i} className="flex items-center gap-4 text-[16px] text-espresso-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass">
                      <I size={17} />
                    </span>
                    {text as string}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <Magnetic className="mt-10">
              <Link
                href="/custom"
                className="inline-flex min-h-14 items-center border border-espresso px-10 text-[13px] uppercase tracking-[0.25em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
              >
                Start a custom request
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
      <WaveDivider className="mt-24 opacity-60" />
    </section>
  );
}

/* ------------------------------ Story preview ------------------------------ */
export function StoryPreview() {
  return (
    <section aria-labelledby="story" className="bg-espresso py-24 text-ivory lg:py-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <div>
          <Reveal><p className="eyebrow !text-brass-2">Our story</p></Reveal>
          <PendulumTitle
            text="Two people, one workbench, since 1998."
            className="font-display mt-3 text-5xl leading-[1.05] lg:text-6xl"
            italicWords={["1998."]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-ivory/75">
              We started making wind chimes at the kitchen table in 1998, and we
              never really stopped. Every chime still passes through our hands —
              strung, tuned, and tied one at a time in our Elkhorn workshop.
            </p>
            <p className="font-signature mt-8 text-4xl text-brass-2">— Mike &amp; family</p>
            <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-ivory/40">
              [placeholder signature — names from client call]
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/our-story"
              className="btn-line mt-8 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.22em] text-brass-2"
            >
              Read our story <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="card-zoom relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/lifestyle/makers.jpg"
              alt="The makers of Maac Wind Chimes in their Elkhorn workshop surrounded by handmade wind chimes"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Next event ------------------------------ */
export function NextEvent({ event }: { event: EventRow }) {
  const start = new Date(event.startAt);
  const end = new Date(event.endAt);
  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-US", { timeZone: "America/Chicago", ...opts });
  return (
    <section aria-labelledby="find-us" className="mx-auto max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="card-zoom relative aspect-[16/10] overflow-hidden border border-hairline">
            <Image
              src="/images/lifestyle/craft-fair.jpg"
              alt="Maac Wind Chimes craft fair booth with dozens of chimes swaying under a white tent"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
        <div>
          <Reveal><p className="eyebrow">Find us at craft fairs</p></Reveal>
          <PendulumTitle
            text="Come hear them in person."
            className="font-display mt-3 text-5xl leading-[1.05] text-espresso lg:text-6xl"
            italicWords={["hear"]}
          />
          <Reveal delay={0.15}>
            <div className="mt-8 border border-hairline bg-linen p-7">
              <p className="text-[11px] uppercase tracking-[0.25em] text-rust">Next show</p>
              <h3 className="font-display mt-2 text-3xl leading-snug text-espresso">{event.title}</h3>
              <dl className="mt-4 space-y-2.5 text-[15px] text-espresso-2">
                <div className="flex items-center gap-3">
                  <CalendarPlus size={16} className="text-brass" />
                  <span>
                    {fmt(start, { weekday: "long", month: "long", day: "numeric", year: "numeric" })} ·{" "}
                    {start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" })}–
                    {end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-brass" />
                  <span>
                    {event.venue} — {event.address}{event.space ? ` · ${event.space}` : ""}
                  </span>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`/api/events/${event.slug}/ics`}
                  className="inline-flex min-h-12 items-center gap-2 border border-espresso px-6 text-[12px] uppercase tracking-[0.2em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
                >
                  <CalendarPlus size={15} /> Add to calendar (.ics)
                </a>
                <Link href="/events" className="btn-line inline-flex min-h-12 items-center text-[12px] uppercase tracking-[0.2em] text-espresso-2">
                  All events
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */
export function Stories({ reviews }: { reviews: Review[] }) {
  return (
    <section aria-labelledby="stories" className="border-t border-hairline bg-linen py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal><p className="eyebrow">Customer stories</p></Reveal>
        <PendulumTitle
          text="Hung on porches, kept for years."
          className="font-display mt-3 max-w-3xl text-5xl leading-[1.04] text-espresso lg:text-6xl"
          italicWords={["years."]}
        />
        <p className="mt-4 text-[13px] uppercase tracking-[0.2em] text-espresso-2/50">
          [placeholder stories — real testimonials to be supplied by the client]
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-hairline bg-ivory p-8">
                <div className="flex gap-1 text-brass" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="font-display mt-5 flex-1 text-[22px] leading-snug text-espresso">
                  “{r.text.replace(/^Placeholder review — /, "")}”
                </blockquote>
                <figcaption className="mt-6 text-[13px] uppercase tracking-[0.18em] text-espresso-2/60">
                  {r.author} · {r.location}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Where else to buy --------------------------- */
export function WhereElse() {
  const stores = [
    { name: "eBay Store", href: site.stores.ebay, img: "/images/brand/store-ebay.png" },
    { name: "Amazon Store", href: site.stores.amazon, img: "/images/brand/store-amazon.png" },
    { name: "Grow Nebraska", href: site.stores.growNebraska, img: "/images/brand/store-nebraska.png" },
  ];
  return (
    <section aria-labelledby="also-at" className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10">
      <div className="flex flex-col items-center border border-hairline bg-ivory px-6 py-12 text-center">
        <Reveal>
          <p className="eyebrow">Also find us at</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
            {stores.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-espresso-2 transition-colors hover:text-brass"
              >
                <Image src={s.img} alt={`${s.name} logo`} width={34} height={34} />
                <span className="text-[15px] tracking-wide">{s.name}</span>
                <ExternalLink size={13} className="opacity-50" />
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-[14px] text-espresso-2/65">
            Buying here directly is kindest — but we’re happy to see you wherever you shop.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
