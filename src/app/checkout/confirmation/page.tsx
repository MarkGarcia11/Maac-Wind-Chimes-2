import Link from "next/link";
import { getOrder } from "@/lib/data";
import { money, site } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { Bell, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  const result = code ? await getOrder(code) : undefined;

  return (
    <div className="mx-auto max-w-[760px] px-5 pb-28 pt-16 text-center lg:pt-24">
      <Reveal>
        <Bell size={34} className="mx-auto text-brass" />
        <p className="eyebrow mt-6">Order received</p>
        <h1 className="font-display mt-4 text-5xl leading-[1.05] text-espresso lg:text-6xl">
          Thank you. <em className="italic text-brass">Truly.</em>
        </h1>
        <p className="font-signature mt-6 text-4xl text-brass">— the Maac family</p>
      </Reveal>

      {result ? (
        <Reveal delay={0.15}>
          <div className="mt-10 border border-hairline bg-linen/60 p-8 text-left">
            <p className="text-center text-[13px] uppercase tracking-[0.25em] text-espresso-2/60">
              Order {result.order.code}
            </p>
            <ul className="mt-5 space-y-2 text-[15px]">
              {result.items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span>{i.qty} × {i.name}</span>
                  <span>{money(i.priceCents * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-hairline pt-4 text-lg">
              <span>Total (incl. shipping)</span>
              <span>{money(result.order.totalCents)}</span>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-espresso-2/75">
              We’ll email <strong className="font-medium">{result.order.email}</strong> shortly to confirm
              and arrange payment. Questions meanwhile? Call us — a real person answers.
            </p>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-md text-espresso-2/80">
            Your order is in. We’ll confirm by email and call if anything’s unclear.
          </p>
        </Reveal>
      )}

      <Reveal delay={0.25}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/collection" className="border border-espresso px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-espresso hover:bg-espresso hover:text-ivory">
            Keep browsing
          </Link>
          <a href={site.phoneHref} className="flex items-center gap-2 px-4 py-4 text-[14px] text-espresso-2 hover:text-brass">
            <Phone size={14} /> {site.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
