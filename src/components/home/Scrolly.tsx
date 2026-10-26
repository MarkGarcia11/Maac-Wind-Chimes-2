"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion";

const CHAPTERS = [
  {
    k: "idea",
    line: "It starts with an idea.",
    sub: "A note, a phone call, a “could you make…?” — most of our chimes began as somebody’s memory.",
    img: null as string | null,
  },
  {
    k: "hands",
    line: "Built by hand, one at a time.",
    sub: "Cut, strung, tuned and tied at a workbench in Elkhorn. No line, no molds, no hurry.",
    img: "/images/lifestyle/workshop-hands.jpg",
  },
  {
    k: "car",
    line: "Every one is different.",
    sub: "A die-cast classic slots into the center — the car, the truck, the bug that means something to you.",
    img: "/images/products/1957-chevy.jpg",
  },
  {
    k: "porch",
    line: "Made to be heard.",
    sub: "Then it hangs on a porch at golden hour and waits for the wind to do the rest.",
    img: "/images/lifestyle/hero-porch.jpg",
  },
  {
    k: "since",
    line: "Since 1998.",
    sub: "Nearly thirty years of small orders, craft fairs, and chimes that outlast the cars that inspired them.",
    img: null,
  },
];

export default function Scrolly() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (window.innerWidth < 768) return; // mobile gets stacked chapters
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-chapter]");
      const thread = root.current?.querySelector<HTMLElement>("[data-thread]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 0.8,
        },
      });

      if (thread) {
        tl.fromTo(thread, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 }, 0);
      }

      items.forEach((el, i) => {
        const at = i;
        tl.fromTo(
          el,
          { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
          at
        );
        const img = el.querySelector("[data-chapter-img]");
        if (img) {
          tl.fromTo(img, { clipPath: "inset(20% 20% 20% 20%)", scale: 1.15 }, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.5, ease: "power2.out" }, at);
        }
        if (i < items.length - 1) {
          tl.to(el, { autoAlpha: 0, y: -50, duration: 0.4, ease: "power2.in" }, at + 0.62);
        }
      });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  /* ---------- mobile / reduced-motion: stacked chapters ---------- */
  if (reduce) {
    return (
      <section aria-label="From our workshop to your porch" className="bg-ivory py-20">
        <ChaptersStacked />
      </section>
    );
  }

  return (
    <>
      {/* stacked on small screens */}
      <section aria-label="From our workshop to your porch" className="bg-linen py-20 md:hidden">
        <ChaptersStacked />
      </section>

      {/* pinned sequence on desktop */}
      <section
        ref={root}
        aria-label="From our workshop to your porch — a scroll story"
        className="relative hidden h-screen overflow-hidden bg-linen md:block"
      >
        {/* the thread that descends through the whole story */}
        <div
          data-thread
          aria-hidden
          className="absolute left-1/2 top-0 h-full w-px origin-top bg-gradient-to-b from-brass/70 via-brass/40 to-brass/0"
        />
        <p className="eyebrow absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap">
          From our workshop to your porch
        </p>

        {CHAPTERS.map((c, i) => (
          <div
            key={c.k}
            data-chapter
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className={`flex max-w-5xl items-center gap-16 px-10 ${i % 2 ? "flex-row-reverse" : ""}`}>
              <div className="w-[420px] shrink-0">
                <span className="font-display block text-[11px] uppercase tracking-[0.3em] text-brass">
                  Chapter {i + 1} of 5
                </span>
                <h3 className="font-display mt-4 text-5xl leading-[1.05] text-espresso xl:text-6xl">
                  {i === 4 ? (
                    <>
                      <em className="italic text-brass">Since</em> 1998.
                    </>
                  ) : (
                    c.line
                  )}
                </h3>
                <p className="mt-6 text-[17px] leading-relaxed text-espresso-2/85">{c.sub}</p>
                {c.k === "since" && (
                  <Link
                    href="/collection"
                    className="mt-8 inline-block border border-espresso px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
                  >
                    Explore the collection
                  </Link>
                )}
              </div>
              <div data-chapter-img className="relative aspect-[4/5] w-[380px] overflow-hidden">
                {c.img ? (
                  <Image src={c.img} alt="" fill className="object-cover" sizes="380px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-hairline bg-ivory">
                    {c.k === "idea" ? (
                      <div className="text-center">
                        <div className="mx-auto h-32 w-px bg-brass/50" />
                        <p className="font-signature mt-6 text-4xl text-brass">could you make…?</p>
                      </div>
                    ) : (
                      <div className="p-10 text-center">
                        <p className="font-display text-8xl text-brass">28</p>
                        <p className="eyebrow mt-3">Years of chimes</p>
                        <div className="mx-auto mt-8 h-px w-24 bg-brass/40" />
                        <p className="font-signature mt-8 text-3xl text-espresso-2">— the Maac family</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

function ChaptersStacked() {
  return (
    <div className="mx-auto max-w-2xl space-y-20 px-6">
      <p className="eyebrow text-center">From our workshop to your porch</p>
      {CHAPTERS.map((c, i) => (
        <Reveal key={c.k} delay={0.05}>
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-[0.3em] text-brass">Chapter {i + 1}</span>
            <h3 className="font-display mt-3 text-4xl leading-tight text-espresso">{c.line}</h3>
            {c.img && (
              <div className="relative mx-auto mt-7 aspect-[16/10] w-full overflow-hidden">
                <Image src={c.img} alt="" fill className="object-cover" sizes="(max-width:768px) 90vw, 640px" />
              </div>
            )}
            <p className="mx-auto mt-5 max-w-md leading-relaxed text-espresso-2/85">{c.sub}</p>
            {c.k === "since" && (
              <Link
                href="/collection"
                className="mt-7 inline-block border border-espresso px-8 py-4 text-[12px] uppercase tracking-[0.25em] text-espresso"
              >
                Explore the collection
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
