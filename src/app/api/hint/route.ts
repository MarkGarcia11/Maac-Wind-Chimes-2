import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/data";

/** "Drop a hint" — gentle gift hint stored in the database for follow-up. */
export async function POST(req: Request) {
  try {
    const { to, from, productSlug, productName, url } = await req.json();
    if (typeof to !== "string" || !to.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid recipient" }, { status: 400 });
    }
    await createInquiry({
      kind: "hint",
      name: String(from ?? "").slice(0, 120),
      email: String(to).slice(0, 200),
      subject: "A hint was dropped",
      message: `${from} found something they think you'd love: the ${productName} wind chime — ${url}`,
      payload: { productSlug, url },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
