"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, Check, ExternalLink } from "lucide-react";
import { Reveal, PendulumTitle } from "@/components/motion";
import { site } from "@/lib/site";

function ContactForm() {
  const params = useSearchParams();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: params.get("subject") ?? "",
    message: "",
    company: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "contact", ...form }),
    }).catch(() => {});
    setDone(true);
  }

  if (done) {
    return (
      <div className="border border-hairline bg-linen/60 p-10 text-center">
        <Check size={28} className="mx-auto text-sage" />
        <h2 className="font-display mt-4 text-3xl text-espresso">Your note is on its way.</h2>
        <p className="mx-auto mt-3 max-w-sm text-espresso-2/80">
          Thank you, {form.name.split(" ")[0] || "friend"}. We read everything ourselves and usually
          reply within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="eyebrow">Your name</label>
          <input id="ct-name" required value={form.name} onChange={set("name")} autoComplete="name" className="field mt-2" />
        </div>
        <div>
          <label htmlFor="ct-email" className="eyebrow">Email</label>
          <input id="ct-email" type="email" required value={form.email} onChange={set("email")} autoComplete="email" className="field mt-2" />
        </div>
      </div>
      <div>
        <label htmlFor="ct-subject" className="eyebrow">Subject</label>
        <input id="ct-subject" required value={form.subject} onChange={set("subject")} className="field mt-2" />
      </div>
      <div>
        <label htmlFor="ct-message" className="eyebrow">Message</label>
        <textarea id="ct-message" rows={6} required value={form.message} onChange={set("message")} className="field mt-2" />
      </div>
      {/* honeypot — invisible to humans, bots fill it */}
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={set("company")}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button className="min-h-14 w-full bg-espresso text-[13px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brass sm:w-auto sm:px-14">
        Send the note
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-14 lg:px-10 lg:pt-20">
      <Reveal><p className="eyebrow">Contact us</p></Reveal>
      <PendulumTitle
        text="We’d love to hear from you."
        className="font-display mt-4 max-w-2xl text-5xl leading-[1.04] text-espresso lg:text-7xl"
        italicWords={["you."]}
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-espresso-2/80">
          Questions about availability, a chime idea, an order — or just to say hello.
          A real person answers here.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_380px]">
        <Reveal delay={0.1}>
          <Suspense>
            <ContactForm />
          </Suspense>
        </Reveal>

        <Reveal delay={0.2}>
          <aside className="space-y-8 border border-hairline bg-linen/50 p-8">
            <div>
              <h2 className="eyebrow !text-espresso-2/60">Telephone</h2>
              <a href={site.phoneHref} className="font-display mt-2 flex items-center gap-3 text-2xl text-espresso hover:text-brass">
                <Phone size={20} className="text-brass" /> {site.phoneDisplay}
              </a>
            </div>
            <div>
              <h2 className="eyebrow !text-espresso-2/60">E-mail</h2>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-3 break-all text-[17px] text-espresso hover:text-brass">
                <Mail size={17} className="shrink-0 text-brass" /> {site.email}
              </a>
            </div>
            <div>
              <h2 className="eyebrow !text-espresso-2/60">Workshop</h2>
              <p className="mt-2 flex items-center gap-3 text-[17px] text-espresso">
                <MapPin size={17} className="shrink-0 text-brass" /> {site.city}, {site.state} {site.zip}
              </p>
              <p className="mt-2 flex items-center gap-3 text-[15px] text-espresso-2/75">
                <Clock size={15} className="shrink-0 text-brass" /> {site.hours} <span className="text-espresso-2/45">[confirm hours]</span>
              </p>
            </div>
            <div className="border-t border-hairline pt-6">
              <h2 className="eyebrow !text-espresso-2/60">Elsewhere</h2>
              <ul className="mt-3 space-y-2.5 text-[15px]">
                <li>
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-espresso-2 hover:text-brass">
                    Facebook <ExternalLink size={13} />
                  </a>
                </li>
                <li>
                  <a href={site.stores.growNebraskaOrg} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-espresso-2 hover:text-brass">
                    grownebraska.org <ExternalLink size={13} />
                  </a>
                </li>
              </ul>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`Elkhorn, NE ${site.zip}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-hairline bg-ivory p-5 text-center text-[14px] text-espresso-2 transition-colors hover:border-brass hover:text-brass"
            >
              Open map of Elkhorn, Nebraska <ExternalLink size={13} className="ml-1 inline" />
            </a>
          </aside>
        </Reveal>
      </div>

      <p className="mt-16 text-[14px] text-espresso-2/60">
        For availability or with any ideas you might have for a wind chime — that’s what we’re here for.
      </p>
    </div>
  );
}
