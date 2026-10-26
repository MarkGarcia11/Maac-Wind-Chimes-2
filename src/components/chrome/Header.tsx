"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Phone,
  Menu,
  X,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import { useStore } from "@/components/store";
import { site } from "@/lib/site";
import { EASE, DUR } from "@/lib/motion";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection", mega: true },
  { href: "/custom", label: "Custom Chimes" },
  { href: "/our-story", label: "Our Story" },
  { href: "/events", label: "Find Us" },
  { href: "/contact", label: "Contact" },
];

const MEGA = [
  { slug: "classic-chevys", name: "Classic Chevys", img: "/images/products/1957-chevy.jpg" },
  { slug: "mustangs-corvettes", name: "Mustangs & Corvettes", img: "/images/products/1957-corvette.jpg" },
  { slug: "trucks-tow-trucks", name: "Trucks & Tow Trucks", img: "/images/products/1953-tow-trucks.jpg" },
  { slug: "volkswagens", name: "Volkswagens", img: "/images/products/1967-volkswagens.jpg" },
  { slug: "police-emergency", name: "Police & Emergency", img: "/images/products/1967-vw-police.jpg" },
  { slug: "movie-character", name: "Movie & Character", img: "/images/products/101-dalmatians.jpg" },
  { slug: "street-rods", name: "Street Rods", img: "/images/products/1934-street-rod.jpg" },
  { slug: "gifts-whimsy", name: "Gifts & Whimsy", img: "/images/products/acrylic-hearts.jpg" },
];

export default function Header() {
  const { count, setCartOpen, wishlist, soundOn, toggleSound, chime } = useStore();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [q, setQ] = useState("");
  const lastY = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!reduce) setHidden(y > lastY.current && y > 220 && !menuOpen);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, reduce]);

  return (
    <>
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            exit={{ height: 0, opacity: 0 }}
            className="relative z-50 overflow-hidden bg-espresso text-center text-ivory"
          >
            <p className="py-2 text-[13px] tracking-[0.18em] uppercase">
              {site.announcement}
            </p>
            <button
              aria-label="Dismiss announcement"
              onClick={() => setDismissed(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-ivory/70 hover:text-ivory"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: DUR.fast, ease: EASE }}
        className={`sticky top-0 z-40 border-b border-hairline/70 transition-colors duration-500 ${
          scrolled ? "bg-ivory/85 backdrop-blur-md" : "bg-ivory"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3 lg:px-10">
          <button
            className="p-3 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="group flex items-center gap-3" aria-label="Maac Wind Chimes home">
            <Image
              src="/images/brand/logo-no-chime.png"
              alt="Maac Wind Chimes logo"
              width={150}
              height={57}
              className="h-auto w-[118px] mix-blend-multiply lg:w-[150px]"
              priority
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) =>
              item.mega ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="btn-line flex items-center gap-1 py-2 text-[15px] tracking-wide text-espresso-2"
                  >
                    {item.label}
                    <ChevronDown size={13} className="text-brass" />
                  </Link>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: DUR.fast, ease: EASE }}
                        className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 border border-hairline bg-ivory p-6 shadow-[0_30px_60px_-30px_rgba(43,33,28,0.3)]"
                      >
                        <p className="eyebrow mb-4">Shop by memory</p>
                        <div className="grid grid-cols-4 gap-4">
                          {MEGA.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/collection?category=${c.slug}`}
                              onClick={() => setMegaOpen(false)}
                              className="group"
                            >
                              <span className="card-zoom block overflow-hidden">
                                <Image
                                  src={c.img}
                                  alt={c.name}
                                  width={120}
                                  height={120}
                                  className="aspect-square w-full object-cover"
                                />
                              </span>
                              <span className="mt-2 block text-[13px] leading-snug text-espresso-2 group-hover:text-brass">
                                {c.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="btn-line py-2 text-[15px] tracking-wide text-espresso-2"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <button
              aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
              onClick={() => {
                toggleSound();
              }}
              className="hidden min-h-12 min-w-12 items-center justify-center text-espresso-2 hover:text-brass sm:flex"
              title={soundOn ? "Sound on" : "Sound off"}
            >
              {soundOn ? <Volume2 size={19} /> : <VolumeX size={19} />}
            </button>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="flex min-h-12 min-w-12 items-center justify-center text-espresso-2 hover:text-brass"
            >
              <Search size={19} />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hidden min-h-12 min-w-12 items-center justify-center text-espresso-2 hover:text-brass sm:flex"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-ivory">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              aria-label="Open cart"
              onClick={() => {
                setCartOpen(true);
                chime(1.2);
              }}
              className="relative flex min-h-12 min-w-12 items-center justify-center text-espresso-2 hover:text-brass"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] text-ivory"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <a
              href={site.phoneHref}
              aria-label={`Call us at ${site.phoneDisplay}`}
              className="hidden min-h-12 items-center gap-2 border border-hairline px-4 text-[14px] tracking-wide text-espresso-2 transition-colors hover:border-brass hover:text-brass md:flex"
            >
              <Phone size={15} />
              <span>{site.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-espresso/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[90] flex w-[86%] max-w-sm flex-col bg-ivory p-7"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: DUR.med, ease: EASE }}
              aria-label="Menu"
            >
              <div className="mb-8 flex items-center justify-between">
                <Image
                  src="/images/brand/logo-no-chime.png"
                  alt="Maac Wind Chimes"
                  width={130}
                  height={49}
                  className="h-auto w-[130px] mix-blend-multiply"
                />
                <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-3">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: DUR.fast, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display block border-b border-hairline/70 py-4 text-[26px] text-espresso"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <a
                href={site.phoneHref}
                className="mt-auto flex min-h-12 items-center justify-center gap-2 border border-espresso py-3 text-espresso"
              >
                <Phone size={16} /> Prefer to talk? {site.phoneDisplay}
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-start justify-center bg-ivory/97 pt-[18vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="absolute right-6 top-6 p-3 text-espresso-2 hover:text-brass"
            >
              <X size={26} />
            </button>
            <motion.div
              className="w-full max-w-2xl px-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: DUR.med, ease: EASE }}
            >
              <p className="eyebrow mb-4">Search the collection</p>
              <form
                action="/search"
                onSubmit={() => setSearchOpen(false)}
                className="flex border-b-2 border-espresso"
              >
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  name="q"
                  placeholder="Try “1957 Chevy”, “Corvette”, “Volkswagen”…"
                  className="font-display w-full bg-transparent py-4 text-3xl text-espresso placeholder:text-espresso/30 focus:outline-none"
                  aria-label="Search products"
                />
                <button aria-label="Submit search" className="p-3 text-brass">
                  <Search size={26} />
                </button>
              </form>
              <p className="mt-4 text-sm text-espresso-2/70">
                Press enter to search. We make about 390 designs — if you don’t find yours,{" "}
                <Link href="/custom" className="text-brass underline" onClick={() => setSearchOpen(false)}>
                  ask us to make it
                </Link>
                .
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
