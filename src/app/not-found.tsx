import Link from "next/link";
import { Reveal } from "@/components/motion";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[760px] flex-col items-center justify-center px-5 py-24 text-center">
      <Reveal>
        {/* a little swaying chime */}
        <div aria-hidden className="mx-auto origin-top motion-safe:animate-[sway_4s_ease-in-out_infinite]">
          <div className="mx-auto h-20 w-px bg-brass/60" />
          <div className="mx-auto flex gap-1.5">
            {[16, 22, 14, 20].map((h, i) => (
              <span key={i} className="w-[3px] rounded-b bg-espresso-2/70" style={{ height: h * 2.2 }} />
            ))}
          </div>
        </div>
        <style>{`@keyframes sway { 0%,100% { transform: rotate(3deg);} 50% { transform: rotate(-3deg);} }`}</style>
        <h1 className="font-display mt-10 text-5xl text-espresso lg:text-6xl">
          This page went <em className="italic text-brass">with the wind.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-espresso-2/80">
          The link may be old, or the page moved. The chimes are all still here though.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="border border-espresso px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-espresso hover:bg-espresso hover:text-ivory">
            Back home
          </Link>
          <Link href="/collection" className="btn-line px-2 py-4 text-[12px] uppercase tracking-[0.22em] text-espresso-2">
            Browse the collection
          </Link>
          <a href={site.phoneHref} className="flex items-center gap-2 px-2 py-4 text-[14px] text-espresso-2/75 hover:text-brass">
            <Phone size={14} /> {site.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
