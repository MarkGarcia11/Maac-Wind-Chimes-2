"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Minus,
  Plus,
  Bell,
  Share2,
  Heart,
  MessageCircleQuestion,
  Gift,
  Volume2,
  X,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  Check,
} from "lucide-react";
import { useStore } from "@/components/store";
import { site } from "@/lib/site";
import { EASE, DUR } from "@/lib/motion";

type Props = {
  product: {
    slug: string;
    name: string;
    priceCents: number;
    image: string;
    availability: string;
  };
};

export default function ProductActions({ product }: Props) {
  const { add, chime, toggleWish, wished, soundOn, toggleSound } = useStore();
  const [qty, setQtyLocal] = useState(1);
  const [ring, setRing] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hintSent, setHintSent] = useState(false);
  const [hintEmail, setHintEmail] = useState("");
  const [hintFrom, setHintFrom] = useState("");
  const isWished = wished(product.slug);

  const url = typeof window !== "undefined" ? window.location.href : `https://maacwindchimes.com/shop/${product.slug}`;

  const doAdd = () => {
    add({ slug: product.slug, name: product.name, priceCents: product.priceCents, image: product.image }, qty);
    chime(1.1);
    setRing((r) => r + 1);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const sendHint = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/hint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: hintEmail, from: hintFrom, productSlug: product.slug, productName: product.name, url }),
    }).catch(() => {});
    setHintSent(true);
  };

  return (
    <div className="mt-9">
      <div className="flex flex-wrap items-stretch gap-3">
        <div className="flex items-center border border-espresso">
          <button aria-label="Decrease quantity" onClick={() => setQtyLocal((q) => Math.max(1, q - 1))} className="min-h-14 min-w-12 p-3 text-espresso-2 hover:text-brass">
            <Minus size={15} />
          </button>
          <span className="w-8 text-center text-lg" aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQtyLocal((q) => Math.min(9, q + 1))} className="min-h-14 min-w-12 p-3 text-espresso-2 hover:text-brass">
            <Plus size={15} />
          </button>
        </div>

        <motion.button
          key={ring}
          onClick={doAdd}
          className="group relative min-h-14 flex-1 overflow-hidden bg-espresso px-8 text-[13px] uppercase tracking-[0.25em] text-ivory"
          animate={ring ? { rotate: [0, -1.2, 1.2, -0.6, 0] } : undefined}
          transition={{ duration: 0.6 }}
        >
          <span className="absolute inset-0 origin-left scale-x-0 bg-brass transition-transform duration-500 ease-out group-hover:scale-x-100" />
          <span className="relative flex items-center justify-center gap-2.5">
            <motion.span
              key={`bell-${ring}`}
              animate={ring ? { rotate: [0, -18, 14, -8, 0] } : undefined}
              transition={{ duration: 0.7 }}
              className="origin-top"
            >
              <Bell size={15} />
            </motion.span>
            Add to cart
          </span>
        </motion.button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={() => setShareOpen(true)}
          className="flex min-h-12 items-center justify-center gap-2 border border-hairline text-[12px] uppercase tracking-[0.14em] text-espresso-2 transition-colors hover:border-brass hover:text-brass"
        >
          <Share2 size={14} /> Share
        </button>
        <button
          onClick={() => toggleWish(product.slug)}
          aria-pressed={isWished}
          className={`flex min-h-12 items-center justify-center gap-2 border text-[12px] uppercase tracking-[0.14em] transition-colors ${
            isWished ? "border-rust bg-rust/5 text-rust" : "border-hairline text-espresso-2 hover:border-brass hover:text-brass"
          }`}
        >
          <Heart size={14} fill={isWished ? "currentColor" : "none"} /> {isWished ? "Saved" : "Save"}
        </button>
        <button
          onClick={() => setHintOpen(true)}
          className="flex min-h-12 items-center justify-center gap-2 border border-hairline text-[12px] uppercase tracking-[0.14em] text-espresso-2 transition-colors hover:border-brass hover:text-brass"
        >
          <Gift size={14} /> Drop a hint
        </button>
        <button
          onClick={() => {
            if (!soundOn) toggleSound();
            setTimeout(() => chime(0.9), soundOn ? 0 : 150);
          }}
          className="flex min-h-12 items-center justify-center gap-2 border border-hairline text-[12px] uppercase tracking-[0.14em] text-espresso-2 transition-colors hover:border-brass hover:text-brass"
        >
          <Volume2 size={14} /> Hear it
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
        <Link
          href={`/contact?subject=Question about ${encodeURIComponent(product.name)}`}
          className="flex items-center gap-2 text-espresso-2 underline-offset-4 hover:text-brass hover:underline"
        >
          <MessageCircleQuestion size={15} /> Ask a question
        </Link>
        <a href={site.phoneHref} className="flex items-center gap-2 text-espresso-2 underline-offset-4 hover:text-brass hover:underline">
          <Phone size={15} /> Prefer to talk? {site.phoneDisplay}
        </a>
      </div>

      {/* ------------------------- Share panel ------------------------- */}
      <AnimatePresence>
        {shareOpen && (
          <Overlay onClose={() => setShareOpen(false)} label="Share this chime">
            <h3 className="font-display text-3xl text-espresso">Share with someone</h3>
            <p className="mt-2 text-[15px] text-espresso-2/75">
              Deciding together is half the fun. Send them this chime.
            </p>
            <div className="mt-7 space-y-3">
              <button onClick={copyLink} className="flex min-h-14 w-full items-center gap-4 border border-hairline px-5 text-left text-[16px] text-espresso-2 hover:border-brass">
                {copied ? <Check size={17} className="text-sage" /> : <Copy size={17} className="text-brass" />}
                {copied ? "Link copied!" : "Copy a link"}
              </button>
              <a
                href={`sms:?&body=${encodeURIComponent(`Look what I found — the ${product.name} wind chime from Maac: ${url}`)}`}
                className="flex min-h-14 w-full items-center gap-4 border border-hairline px-5 text-[16px] text-espresso-2 hover:border-brass"
              >
                <MessageCircle size={17} className="text-brass" /> Send a text
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(`The ${product.name} wind chime`)}&body=${encodeURIComponent(`I found something I think you'd love: ${url}`)}`}
                className="flex min-h-14 w-full items-center gap-4 border border-hairline px-5 text-[16px] text-espresso-2 hover:border-brass"
              >
                <Mail size={17} className="text-brass" /> Send an email
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`I found something I think you'd love — the ${product.name} wind chime: ${url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 w-full items-center gap-4 border border-hairline px-5 text-[16px] text-espresso-2 hover:border-brass"
              >
                <Share2 size={17} className="text-brass" /> WhatsApp
              </a>
            </div>
          </Overlay>
        )}
      </AnimatePresence>

      {/* ------------------------- Drop a hint ------------------------- */}
      <AnimatePresence>
        {hintOpen && (
          <Overlay onClose={() => setHintOpen(false)} label="Drop a hint">
            {hintSent ? (
              <div className="py-10 text-center">
                <Gift size={30} className="mx-auto text-brass" />
                <h3 className="font-display mt-4 text-3xl text-espresso">Hint dropped gently.</h3>
                <p className="mx-auto mt-3 max-w-xs text-[15px] text-espresso-2/75">
                  We saved your hint. No pressure, no spam — just a soft nudge with your name on it.
                </p>
                <button onClick={() => setHintOpen(false)} className="mt-7 border border-espresso px-8 py-3 text-[12px] uppercase tracking-[0.2em] hover:bg-espresso hover:text-ivory">
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-3xl text-espresso">Drop a hint</h3>
                <p className="mt-2 text-[15px] text-espresso-2/75">
                  We’ll prepare a gentle note they’ll love: <em className="italic">“I found something I think you’d love…”</em>
                </p>
                <form onSubmit={sendHint} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="hint-to" className="eyebrow">Their email</label>
                    <input id="hint-to" type="email" required value={hintEmail} onChange={(e) => setHintEmail(e.target.value)} className="field mt-2" placeholder="someone-you-love@example.com" />
                  </div>
                  <div>
                    <label htmlFor="hint-from" className="eyebrow">Your first name</label>
                    <input id="hint-from" required value={hintFrom} onChange={(e) => setHintFrom(e.target.value)} className="field mt-2" placeholder="So they know who’s hinting" />
                  </div>
                  <button className="min-h-14 w-full bg-espresso text-[13px] uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-brass">
                    Send the hint
                  </button>
                </form>
              </>
            )}
          </Overlay>
        )}
      </AnimatePresence>
    </div>
  );
}

function Overlay({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[85] flex items-end justify-center bg-espresso/45 p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-label={label}
      aria-modal="true"
    >
      <motion.div
        className="w-full max-w-md bg-ivory p-7 shadow-2xl sm:p-9"
        initial={{ y: 46, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 46, opacity: 0 }}
        transition={{ duration: DUR.med, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex justify-end">
          <button aria-label="Close" onClick={onClose} className="p-2 text-espresso-2/60 hover:text-espresso">
            <X size={19} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
