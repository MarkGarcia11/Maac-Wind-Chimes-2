"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, PencilRuler, Hammer, Package, Phone, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Reveal, PendulumTitle } from "@/components/motion";
import { EASE, DUR } from "@/lib/motion";
import { site } from "@/lib/site";

const STEPS = [
  { icon: Lightbulb, title: "Idea", text: "You tell us the car, the team, the character — or the whole memory. A photo helps; a story helps more." },
  { icon: PencilRuler, title: "Sketch", text: "We figure out the pieces — what we have, what we need to find, how it should hang and sing." },
  { icon: Hammer, title: "Craft", text: "Cut, strung, tuned, and tied by hand at the workbench. One at a time. Always." },
  { icon: Package, title: "Delivered", text: "Packed carefully with the car in its own little box, shipped flat-rate to your porch." },
];

const IDEAS = [
  "/images/products/batman-cars.jpg",
  "/images/products/alice-in-wonderland.jpg",
  "/images/products/55-56-57-chevy-gas-pump.jpg",
  "/images/products/67-peace-volkswagen.jpg",
  "/images/products/acrylic-cats.jpg",
  "/images/products/bambi-figures.jpg",
];

export default function CustomPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    theme: "",
    size: "Standard (24\u2033)",
    occasion: "",
    deadline: "",
    referenceNote: "",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit() {
    await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "custom", ...form, message: form.message || form.theme }),
    }).catch(() => {});
    setDone(true);
  }

  return (
    <div className="pb-28">
      {/* intro */}
      <section className="mx-auto max-w-[1500px] px-5 pt-14 lg:px-10 lg:pt-20">
        <Reveal><p className="eyebrow">Custom chimes</p></Reveal>
        <PendulumTitle
          text="If you can remember it, we can probably hang it."
          className="font-display mt-4 max-w-3xl text-5xl leading-[1.04] text-espresso lg:text-7xl"
          italicWords={["remember"]}
        />
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-lg text-espresso-2/85">
            Some of our favorite chimes started as a sentence that began with
            “this might sound strange, but…”. It doesn’t. Tell us.
          </p>
        </Reveal>
      </section>

      {/* process */}
      <section aria-labelledby="process" className="mt-20 border-y border-hairline bg-linen py-16">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative">
                <span className="font-display text-6xl text-brass/25">{i + 1}</span>
                <s.icon size={22} className="absolute left-1 top-6 text-brass" />
                <h3 className="font-display mt-4 text-2xl text-espresso">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-espresso-2/80">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* inspiration gallery */}
      <section aria-labelledby="ideas" className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10">
        <Reveal>
          <h2 id="ideas" className="font-display text-4xl text-espresso lg:text-5xl">
            Things people have <em className="italic text-brass">dreamed up</em> before
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {IDEAS.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="card-zoom relative aspect-square overflow-hidden border border-hairline">
                <Image src={src} alt="Custom wind chime inspiration — a previous handmade design" fill className="object-cover" sizes="(max-width:768px) 50vw, 16vw" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* multi-step form */}
      <section aria-labelledby="request" className="mx-auto max-w-[820px] px-5 lg:px-10">
        <Reveal>
          <h2 id="request" className="font-display text-4xl text-espresso lg:text-5xl">Start your request</h2>
          <p className="mt-3 text-espresso-2/75">Three short steps. No obligation — we reply in a day or two.</p>
        </Reveal>

        {done ? (
          <Reveal className="mt-10 border border-hairline bg-linen/60 p-10 text-center">
            <Check size={30} className="mx-auto text-sage" />
            <h3 className="font-display mt-4 text-3xl text-espresso">It’s in our inbox.</h3>
            <p className="mx-auto mt-3 max-w-md text-espresso-2/80">
              Thank you, {form.name.split(" ")[0] || "friend"}. We’ll read every word and reply from{" "}
              <a className="text-brass underline" href={`mailto:${site.email}`}>{site.email}</a>. Feeling
              impatient? <a className="text-brass underline" href={site.phoneHref}>{site.phoneDisplay}</a>
            </p>
            <Link href="/collection" className="mt-7 inline-block border border-espresso px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] hover:bg-espresso hover:text-ivory">
              Browse meanwhile
            </Link>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-10 border border-hairline bg-linen/50 p-6 sm:p-10">
              {/* progress */}
              <div className="mb-8 flex gap-2" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-[3px] flex-1 transition-colors duration-500 ${i <= step ? "bg-brass" : "bg-hairline"}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: DUR.fast, ease: EASE }}
                >
                  {step === 0 && (
                    <div className="space-y-5">
                      <p className="eyebrow">Step 1 · About you</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label htmlFor="c-name" className="eyebrow !text-espresso-2/70">Your name</label>
                          <input id="c-name" value={form.name} onChange={set("name")} className="field mt-2" required />
                        </div>
                        <div>
                          <label htmlFor="c-email" className="eyebrow !text-espresso-2/70">Email</label>
                          <input id="c-email" type="email" value={form.email} onChange={set("email")} className="field mt-2" required />
                        </div>
                        <div>
                          <label htmlFor="c-phone" className="eyebrow !text-espresso-2/70">Phone (optional)</label>
                          <input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} className="field mt-2" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-5">
                      <p className="eyebrow">Step 2 · The idea</p>
                      <div>
                        <label htmlFor="c-theme" className="eyebrow !text-espresso-2/70">Theme or vehicle</label>
                        <input id="c-theme" value={form.theme} onChange={set("theme")} className="field mt-2" placeholder="e.g. Dad’s old Ford tractor, my ’69 Camaro, Snoopy…" required />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="c-size" className="eyebrow !text-espresso-2/70">Size</label>
                          <select id="c-size" value={form.size} onChange={set("size")} className="field mt-2">
                            <option>Standard (24&#8243;)</option>
                            <option>Smaller / indoor</option>
                            <option>Bigger / statement piece</option>
                            <option>Not sure — you decide</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="c-occasion" className="eyebrow !text-espresso-2/70">Occasion (optional)</label>
                          <input id="c-occasion" value={form.occasion} onChange={set("occasion")} className="field mt-2" placeholder="Birthday, anniversary, just because…" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <p className="eyebrow">Step 3 · Details</p>
                      <div>
                        <label htmlFor="c-deadline" className="eyebrow !text-espresso-2/70">Needed by (optional)</label>
                        <input id="c-deadline" type="date" value={form.deadline} onChange={set("deadline")} className="field mt-2" />
                      </div>
                      <div>
                        <label htmlFor="c-ref" className="eyebrow !text-espresso-2/70">Reference photo (optional)</label>
                        <input
                          id="c-ref"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setForm((f) => ({ ...f, referenceNote: e.target.files?.[0]?.name ?? "" }))}
                          className="field mt-2 file:mr-4 file:border-0 file:bg-espresso file:px-4 file:py-2 file:text-[12px] file:uppercase file:tracking-[0.15em] file:text-ivory"
                        />
                        <p className="mt-1.5 text-[13px] text-espresso-2/55">
                          The photo attaches to your note; if it’s large, just mention it — we’ll email for it.
                        </p>
                      </div>
                      <div>
                        <label htmlFor="c-msg" className="eyebrow !text-espresso-2/70">Tell us the story</label>
                        <textarea id="c-msg" rows={4} value={form.message} onChange={set("message")} className="field mt-2" placeholder="The memory behind it helps us get it right." />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="flex min-h-12 items-center gap-2 px-4 text-[13px] uppercase tracking-[0.18em] text-espresso-2 disabled:opacity-30"
                >
                  <ArrowLeft size={15} /> Back
                </button>
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={(step === 0 && (!form.name || !form.email.includes("@"))) || (step === 1 && !form.theme)}
                    className="flex min-h-12 items-center gap-2 bg-espresso px-8 text-[13px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-brass disabled:opacity-40"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    className="min-h-12 bg-espresso px-8 text-[13px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-brass"
                  >
                    Send request
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.2}>
          <p className="mt-8 flex items-center justify-center gap-2 text-[15px] text-espresso-2/80">
            <Phone size={15} className="text-brass" /> Rather just describe it out loud? Call {" "}
            <a href={site.phoneHref} className="text-brass underline underline-offset-4">{site.phoneDisplay}</a>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
