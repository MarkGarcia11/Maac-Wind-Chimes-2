"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  qty: number;
};

type StoreCtx = {
  cart: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  lastAddedAt: number;

  wishlist: string[];
  toggleWish: (slug: string) => void;
  wished: (slug: string) => boolean;

  soundOn: boolean;
  toggleSound: () => void;
  chime: (pitch?: number) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside provider");
  return v;
}

/* -- soft chime synth (WebAudio; no audio files needed) -- */
function playTone(pitch = 1) {
  try {
    const AC: typeof AudioContext =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AC();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const base = notes[Math.floor(Math.random() * notes.length)] * pitch;
    [0, 0.011, 0.023].forEach((dt, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = base * [1, 2.01, 2.74][i];
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + dt);
      gain.gain.exponentialRampToValueAtTime(0.12 / (i + 1), ctx.currentTime + dt + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dt + 2.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + dt);
      osc.stop(ctx.currentTime + dt + 2.5);
    });
    setTimeout(() => void ctx.close(), 3000);
  } catch {
    /* audio unavailable */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("maac-cart");
      const w = localStorage.getItem("maac-wish");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {
      /* ignore */
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (loaded.current) localStorage.setItem("maac-cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (loaded.current) localStorage.setItem("maac-wish", JSON.stringify(wishlist));
  }, [wishlist]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.slug === item.slug);
      if (found) return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...item, qty }];
    });
    setLastAddedAt(Date.now());
    setCartOpen(true);
  }, []);

  const remove = useCallback((slug: string) => setCart((p) => p.filter((i) => i.slug !== slug)), []);
  const setQty = useCallback(
    (slug: string, qty: number) =>
      setCart((p) =>
        qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i))
      ),
    []
  );
  const clear = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (slug: string) =>
      setWishlist((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug])),
    []
  );
  const wished = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const toggleSound = useCallback(() => setSoundOn((s) => !s), []);
  const chime = useCallback(
    (pitch = 1) => {
      if (soundOn) playTone(pitch);
    },
    [soundOn]
  );

  const value = useMemo<StoreCtx>(() => {
    const subtotal = cart.reduce((a, i) => a + i.priceCents * i.qty, 0);
    const count = cart.reduce((a, i) => a + i.qty, 0);
    return {
      cart,
      add,
      remove,
      setQty,
      clear,
      subtotal,
      count,
      cartOpen,
      setCartOpen,
      lastAddedAt,
      wishlist,
      toggleWish,
      wished,
      soundOn,
      toggleSound,
      chime,
    };
  }, [cart, add, remove, setQty, clear, cartOpen, lastAddedAt, wishlist, toggleWish, wished, soundOn, toggleSound, chime]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
