"use client";

import { Phone, ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/components/store";
import { site } from "@/lib/site";

/** Bottom sticky Call / Wishlist / Cart bar — mobile only, thumb-friendly. */
export default function MobileBar() {
  const { count, setCartOpen, wishlist } = useStore();
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-hairline bg-ivory/95 backdrop-blur-md lg:hidden"
    >
      <a
        href={site.phoneHref}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-espresso-2"
      >
        <Phone size={19} />
        <span className="text-[11px] tracking-wide">Call us</span>
      </a>
      <Link
        href="/wishlist"
        className="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-espresso-2"
      >
        <Heart size={19} />
        {wishlist.length > 0 && (
          <span className="absolute right-[22%] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-ivory">
            {wishlist.length}
          </span>
        )}
        <span className="text-[11px] tracking-wide">Saved</span>
      </Link>
      <button
        onClick={() => setCartOpen(true)}
        className="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-espresso-2"
      >
        <ShoppingBag size={19} />
        {count > 0 && (
          <span className="absolute right-[22%] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] text-ivory">
            {count}
          </span>
        )}
        <span className="text-[11px] tracking-wide">Cart</span>
      </button>
    </nav>
  );
}
