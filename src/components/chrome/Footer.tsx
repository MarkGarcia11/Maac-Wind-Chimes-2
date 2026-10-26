"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import { site } from "@/lib/site";
import { WindOrnament } from "@/components/motion";

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5Z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    setDone(true);
  }

  return (
    <footer className="border-t border-hairline bg-espresso text-ivory/85">
      <div className="relative mx-auto max-w-[1500px] px-5 pb-28 pt-16 lg:px-10 lg:pb-16">
        <WindOrnament className="absolute -top-2 right-10 hidden opacity-60 lg:block" />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl text-ivory">Maac Wind Chimes</p>
            <p className="font-signature mt-2 text-2xl text-brass-2">the sound of a memory</p>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ivory/65">
              A small, family-run Nebraska workshop making collectible wind chimes since 1998.
              Every chime is handmade — and might be one of a kind.
            </p>
            <form onSubmit={subscribe} className="mt-7 max-w-sm" aria-label="Newsletter signup">
              <label htmlFor="nl-email" className="eyebrow !text-brass-2">
                A gentle note now and then
              </label>
              <div className="mt-3 flex border border-ivory/25">
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent px-4 py-3 text-[15px] text-ivory placeholder:text-ivory/40 focus:outline-none"
                />
                <button className="min-h-12 min-w-12 px-5 text-[13px] uppercase tracking-[0.2em] text-brass-2 transition-colors hover:bg-brass hover:text-ivory">
                  Join
                </button>
              </div>
              {done && (
                <p className="mt-2 flex items-center gap-2 text-sm text-brass-2">
                  <Check size={14} /> Thank you — we write rarely, and only when it matters.
                </p>
              )}
            </form>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-5 !text-brass-2">Shop</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link className="hover:text-brass-2" href="/collection">Full Collection</Link></li>
              <li><Link className="hover:text-brass-2" href="/collection?category=classic-chevys">Classic Chevys</Link></li>
              <li><Link className="hover:text-brass-2" href="/collection?category=volkswagens">Volkswagens</Link></li>
              <li><Link className="hover:text-brass-2" href="/collection?category=movie-character">Movie & Character</Link></li>
              <li><Link className="hover:text-brass-2" href="/custom">Custom Chimes</Link></li>
              <li><Link className="hover:text-brass-2" href="/wishlist">Saved List</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-5 !text-brass-2">Visit</h3>
            <ul className="space-y-3 text-[15px]">
              <li><Link className="hover:text-brass-2" href="/our-story">Our Story</Link></li>
              <li><Link className="hover:text-brass-2" href="/events">Craft Fairs & Events</Link></li>
              <li><Link className="hover:text-brass-2" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-brass-2" href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-5 !text-brass-2">Our Online Stores</h3>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href={site.stores.ebay} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brass-2">
                  <Image src="/images/brand/store-ebay.png" alt="" width={20} height={20} /> eBay Store
                </a>
              </li>
              <li>
                <a href={site.stores.amazon} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brass-2">
                  <Image src="/images/brand/store-amazon.png" alt="" width={20} height={20} /> Amazon Store
                </a>
              </li>
              <li>
                <a href={site.stores.growNebraska} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brass-2">
                  <Image src="/images/brand/store-nebraska.png" alt="" width={20} height={20} /> Grow Nebraska
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brass-2">
                  <FacebookIcon size={18} /> Facebook
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="eyebrow mb-5 !text-brass-2">Find Us</h3>
            <ul className="space-y-3 text-[15px] text-ivory/75">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2 hover:text-brass-2">
                  <Phone size={15} /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all hover:text-brass-2">
                  <Mail size={15} /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} /> {site.city}, {site.state} {site.zip}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/15 pt-7 text-[13px] text-ivory/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Maac Wind Chimes · Handmade in Nebraska since {site.since}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brass-2">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brass-2">Terms of Use</Link>
            <Link href="/shipping-returns" className="hover:text-brass-2">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
