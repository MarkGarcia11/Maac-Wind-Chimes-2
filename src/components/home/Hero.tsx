"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Phone } from "lucide-react";
import { PendulumTitle, Magnetic, Sway } from "@/components/motion";
import { EASE, DUR } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <section ref={ref} aria-label="Welcome" className="relative min-h-[92svh] overflow-hidden">
      <motion.div style={reduce ? undefined : { y: imgY }} className="absolute inset-0 -z-10">
        <Image
          src="/images/lifestyle/hero-porch.jpg"
          alt="A handmade Maac wind chime with a red 1957 Chevy die-cast car swaying on a sunlit porch at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/35 to-ivory" />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: textY }}
        className="mx-auto flex min-h-[92svh] max-w-[1500px] flex-col justify-end px-5 pb-24 pt-24 lg:px-10"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: 0.3 }}
            className="eyebrow"
          >
            Maac Wind Chimes · Elkhorn, Nebraska · Est. {site.since}
          </motion.p>

          <PendulumTitle
            as="h1"
            text="The sound of a memory."
            className="font-display mt-6 text-[13vw] leading-[0.98] text-espresso sm:text-7xl lg:text-[92px]"
            italicWords={["memory."]}
          />

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.9 }}
            className="mt-7 max-w-xl text-lg text-espresso-2/85 lg:text-xl"
          >
            The 1957 Chevy your dad drove. The Corvette you dreamed of. Handmade wind
            chimes that hang on a porch for twenty years — <Sway className="italic text-brass">and sing a little</Sway>{" "}
            every time the wind remembers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link
                href="/collection"
                className="group relative inline-flex min-h-14 items-center overflow-hidden border border-espresso px-9 text-[13px] uppercase tracking-[0.25em] text-espresso"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-espresso transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative transition-colors duration-300 group-hover:text-ivory">
                  Explore the Collection
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/custom"
                className="btn-line inline-flex min-h-14 items-center px-2 text-[13px] uppercase tracking-[0.25em] text-espresso-2"
              >
                Design Your Own
              </Link>
            </Magnetic>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: DUR.slow }}
            href={site.phoneHref}
            className="mt-8 inline-flex items-center gap-2 text-[14px] text-espresso-2/75 hover:text-brass"
          >
            <Phone size={14} /> Prefer to talk? Call us — {site.phoneDisplay}
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 right-6 hidden text-espresso/50 lg:right-12 lg:block"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
