import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !email.includes("@") || email.length > 200) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    await subscribeNewsletter(email.trim().toLowerCase());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
