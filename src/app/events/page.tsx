import type { Metadata } from "next";
import Image from "next/image";
import { getEvents } from "@/lib/data";
import { Reveal, PendulumTitle } from "@/components/motion";
import { CalendarPlus, MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Us — Craft Fairs & Events",
  description:
    "Meet Maac Wind Chimes in person at Nebraska craft fairs and festivals. Dates, times, locations, and add-to-calendar links.",
};

export default async function EventsPage() {
  const evts = await getEvents();
  const now = new Date();
  const upcoming = evts.filter((e) => new Date(e.endAt) >= now);
  const past = evts.filter((e) => new Date(e.endAt) < now);

  const jsonLd = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: new Date(e.startAt).toISOString(),
    endDate: new Date(e.endAt).toISOString(),
    location: { "@type": "Place", name: e.venue, address: e.address },
    organizer: { "@type": "Organization", name: "Maac Wind Chimes" },
  }));

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
  const fmtTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" });

  const googleUrl = (e: (typeof evts)[number]) => {
    const f = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.title)}&dates=${f(new Date(e.startAt))}/${f(new Date(e.endAt))}&details=${encodeURIComponent(e.description)}&location=${encodeURIComponent(`${e.venue}, ${e.address}`)}`;
  };

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-14 lg:px-10 lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal><p className="eyebrow">Find us</p></Reveal>
      <PendulumTitle
        text="Craft fairs & festivals."
        className="font-display mt-4 max-w-2xl text-5xl leading-[1.04] text-espresso lg:text-7xl"
        italicWords={["festivals."]}
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-espresso-2/80">
          The best way to pick a chime is to hear one. Here’s where we’ll be —
          come find the booth by ear.
        </p>
      </Reveal>

      <section aria-label="Upcoming events" className="mt-14 space-y-8">
        {upcoming.length === 0 && (
          <p className="border border-hairline bg-linen/60 p-10 text-center text-espresso-2/75">
            No shows on the calendar right now — check back soon, or call us and we’ll tell you where we’re headed.
          </p>
        )}
        {upcoming.map((e, i) => (
          <Reveal key={e.slug} delay={i * 0.08}>
            <article className="grid gap-8 border border-hairline bg-linen/50 p-6 sm:p-9 lg:grid-cols-[320px_1fr]">
              <div className="card-zoom relative aspect-[16/10] overflow-hidden lg:aspect-square">
                <Image
                  src={e.image || "/images/lifestyle/craft-fair.jpg"}
                  alt={`${e.title} — Maac Wind Chimes booth`}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 320px"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-rust">Upcoming show</p>
                <h2 className="font-display mt-2 text-3xl leading-snug text-espresso lg:text-4xl">{e.title}</h2>
                <dl className="mt-5 space-y-2.5 text-[15px] text-espresso-2">
                  <div className="flex items-center gap-3">
                    <CalendarPlus size={16} className="shrink-0 text-brass" />
                    <span>{fmtDate(new Date(e.startAt))}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="shrink-0 text-brass" />
                    <span>{fmtTime(new Date(e.startAt))} – {fmtTime(new Date(e.endAt))}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="shrink-0 text-brass" />
                    <span>{e.venue} — {e.address}{e.space ? ` · Booth ${e.space.replace(/^Space\s*/i, "")}` : ""}</span>
                  </div>
                </dl>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-espresso-2/85">{e.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`/api/events/${e.slug}/ics`}
                    className="inline-flex min-h-12 items-center gap-2 border border-espresso px-6 text-[12px] uppercase tracking-[0.2em] text-espresso hover:bg-espresso hover:text-ivory"
                  >
                    <CalendarPlus size={15} /> Apple / Outlook (.ics)
                  </a>
                  <a
                    href={googleUrl(e)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 border border-hairline px-6 text-[12px] uppercase tracking-[0.2em] text-espresso-2 hover:border-brass hover:text-brass"
                  >
                    Google Calendar
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${e.venue} ${e.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 px-2 text-[12px] uppercase tracking-[0.2em] text-espresso-2 underline-offset-4 hover:text-brass"
                  >
                    <MapPin size={15} /> Map
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {past.length > 0 && (
        <section aria-label="Past events" className="mt-16">
          <h2 className="font-display text-2xl text-espresso-2/70">Past shows</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-espresso-2/60">
            {past.map((e) => (
              <li key={e.slug}>{e.title} — {fmtDate(new Date(e.startAt))}</li>
            ))}
          </ul>
        </section>
      )}

      <Reveal className="mt-20">
        <div className="card-zoom relative aspect-[21/9] overflow-hidden border border-hairline">
          <Image
            src="/images/lifestyle/craft-fair.jpg"
            alt="The Maac Wind Chimes booth at a Nebraska craft fair, chimes swaying in the morning light"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </Reveal>
    </div>
  );
}
