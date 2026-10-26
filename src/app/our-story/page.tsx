import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, PendulumTitle, WaveDivider, Sway } from "@/components/motion";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story — Since 1998",
  description:
    "A small, family-run Nebraska workshop. How Maac Wind Chimes started in 1998, and why every chime is still made by hand.",
};

export default function OurStoryPage() {
  return (
    <div className="pb-28">
      <section className="mx-auto max-w-[1500px] px-5 pt-14 lg:px-10 lg:pt-20">
        <Reveal><p className="eyebrow">Our story</p></Reveal>
        <PendulumTitle
          text="It started at the kitchen table in 1998."
          className="font-display mt-4 max-w-3xl text-5xl leading-[1.04] text-espresso lg:text-7xl"
          italicWords={["1998."]}
        />
      </section>

      <section className="mx-auto mt-16 grid max-w-[1500px] items-start gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <div className="card-zoom relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/lifestyle/makers.jpg"
              alt="The Maac Wind Chimes makers in their Elkhorn, Nebraska workshop"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>
          <p className="mt-3 text-[13px] text-espresso-2/55">
            [placeholder photo — workshop portrait from the client to replace this]
          </p>
        </Reveal>

        <div className="space-y-6 text-[17px] leading-relaxed text-espresso-2/90 lg:text-[18px]">
          <Reveal delay={0.1}>
            <p>
              We made our first wind chime in 1998, on the kitchen table, with a
              die-cast car and some aluminum tube and more optimism than plan.
              People liked how it sounded. People <em className="italic text-brass">really</em> liked
              how it reminded them of things.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Since then we’ve made something like 390 designs — classic Chevys,
              Corvettes, Mustangs, Bugs with surfboards, tow trucks, storybook
              characters, team helmets. <Sway className="italic text-brass">Every chime is unique
              and might be one-of-a-kind.</Sway> That isn’t a slogan; it’s just what
              happens when two hands make each one.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              We’re still small on purpose. You’ll find us at craft fairs around
              Nebraska, on the phone if you call, and in the workshop most
              mornings — cutting, stringing, tuning, and tying. When a chime
              leaves here, it’s been held. That matters to us.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="font-signature text-5xl text-brass">— Mike &amp; family</p>
            <p className="!mt-1 text-[13px] uppercase tracking-[0.2em] text-espresso-2/50">
              [placeholder signature — names and story details from client call]
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider className="mx-auto mt-24 max-w-[1500px] px-5 opacity-60 lg:px-10" />

      <section aria-labelledby="values" className="mx-auto mt-20 max-w-[1500px] px-5 lg:px-10">
        <Reveal>
          <h2 id="values" className="font-display text-4xl text-espresso lg:text-5xl">What we keep coming back to</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Made slowly",
              d: "One chime at a time, by hand, in Elkhorn. We’d rather make fewer and mean them all.",
            },
            {
              t: "Meant to last",
              d: "Die-cast 1:40 scale cars, sturdy line, honest materials. Chimes that hang for twenty years.",
            },
            {
              t: "Real to reach",
              d: `Call ${site.phoneDisplay} and a person answers. Email ${site.email} and a person writes back.`,
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <div className="h-full border border-hairline bg-linen/60 p-8">
                <h3 className="font-display text-2xl text-espresso">{v.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-espresso-2/85">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/collection"
            className="inline-block border border-espresso px-10 py-4 text-[13px] uppercase tracking-[0.25em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
          >
            See what we make
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
