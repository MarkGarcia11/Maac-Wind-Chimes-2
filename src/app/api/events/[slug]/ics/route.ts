import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/data";

/** Downloadable .ics calendar file for an event. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await ensureSeeded();
  const [e] = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
  if (!e) return NextResponse.json({ ok: false }, { status: 404 });

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  const esc = (s: string) => s.replace(/[,;\\]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maac Wind Chimes//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@maacwindchimes.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(new Date(e.startAt))}`,
    `DTEND:${fmt(new Date(e.endAt))}`,
    `SUMMARY:${esc(e.title)}`,
    `DESCRIPTION:${esc(`${e.description}${e.space ? ` Look for us at ${e.space}.` : ""}`)}`,
    `LOCATION:${esc([e.venue, e.address].filter(Boolean).join(", "))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${e.slug}.ics"`,
    },
  });
}
