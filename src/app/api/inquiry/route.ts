import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/data";

/** Contact + custom-chime requests. Honeypot field "company" blocks spam. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.company) {
      // honeypot filled by bots — pretend success
      return NextResponse.json({ ok: true });
    }
    const kind = body.kind === "custom" ? "custom" : "contact";
    const name = String(body.name ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().slice(0, 200);
    const message = String(body.message ?? "").trim().slice(0, 4000);
    if (!name || !email.includes("@") || (kind === "contact" && !message)) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    await createInquiry({
      kind,
      name,
      email,
      phone: String(body.phone ?? "").slice(0, 40),
      subject: String(body.subject ?? "").slice(0, 200),
      message: message || String(body.theme ?? "").slice(0, 2000),
      payload: {
        theme: body.theme,
        size: body.size,
        occasion: body.occasion,
        deadline: body.deadline,
        referenceNote: body.referenceNote,
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
