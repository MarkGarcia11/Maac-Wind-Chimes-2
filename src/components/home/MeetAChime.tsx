"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VolumeX, RotateCw, MousePointerClick } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useStore } from "@/components/store";
import { Reveal, PendulumTitle } from "@/components/motion";
import type { CarChoice } from "./ChimeScene";

const ChimeScene = dynamic(() => import("./ChimeScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-px animate-pulse bg-brass/50" />
    </div>
  ),
});

const CARS: CarChoice[] = [
  { name: "'57 Chevy", color: "#a4322f", accent: "#cfd0d5" },
  { name: "'57 Corvette", color: "#e8e2d6", accent: "#b08d57" },
  { name: "'64½ Mustang", color: "#274c77", accent: "#cfd0d5" },
  { name: "'67 Beetle", color: "#7f8f86", accent: "#e8e2d6" },
  { name: "'53 Tow Truck", color: "#a4573a", accent: "#2b211c" },
];

export default function MeetAChime() {
  const reduce = useReducedMotion();
  const { soundOn, toggleSound, chime } = useStore();
  const [car, setCar] = useState(CARS[0]);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const hc = navigator.hardwareConcurrency ?? 8;
    const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    if (hc <= 2 || dm <= 2) setLowPower(true);
  }, []);

  const showFallback = reduce || lowPower;

  return (
    <section aria-labelledby="meet-a-chime" className="relative overflow-hidden bg-espresso py-24 text-ivory lg:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(176,141,87,0.5), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 px-5 lg:grid-cols-2 lg:px-10">
        <div>
          <Reveal>
            <p className="eyebrow !text-brass-2">Up close</p>
          </Reveal>
          <PendulumTitle
            text="Meet a chime. Give it a spin."
            className="font-display mt-4 text-5xl leading-[1.05] lg:text-6xl"
            italicWords={["chime."]}
          />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-ivory/75">
              This is roughly what hangs from our workshop ceiling right now. Drag it to
              turn it. Tap a rod — if you’ve turned the sound on, it will ring for you.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-8">
              {[
                ["Die-cast", "1:40 scale"],
                ["Chime length", "24 inches"],
                ["Made", "By hand"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-brass-2">{k}</dt>
                  <dd className="font-display mt-1 text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="eyebrow mt-10 !text-brass-2">Choose your car</p>
            <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label="Choose centerpiece car">
              {CARS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCar(c);
                    chime(1.4);
                  }}
                  aria-pressed={car.name === c.name}
                  className={`min-h-12 border px-4 py-2.5 text-[14px] transition-colors ${
                    car.name === c.name
                      ? "border-brass bg-brass/15 text-ivory"
                      : "border-ivory/25 text-ivory/70 hover:border-brass-2"
                  }`}
                >
                  <span
                    aria-hidden
                    className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-middle"
                    style={{ background: c.color }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {showFallback ? (
              <Image
                src="/images/products/1957-chevy.jpg"
                alt="A handmade Maac wind chime with a 1957 Chevy die-cast car centerpiece"
                fill
                className="object-cover"
              />
            ) : (
              <ChimeScene car={car} onRing={chime} />
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-[13px] text-ivory/55">
            <span className="flex items-center gap-2">
              <RotateCw size={14} /> drag to spin
            </span>
            <span className="flex items-center gap-2">
              <MousePointerClick size={14} /> tap a rod to ring
            </span>
            <button
              onClick={toggleSound}
              className="flex min-h-11 items-center gap-2 text-brass-2 underline-offset-4 hover:underline"
              aria-pressed={soundOn}
            >
              {soundOn ? "sound on" : (<><VolumeX size={14} /> sound off</>)}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
