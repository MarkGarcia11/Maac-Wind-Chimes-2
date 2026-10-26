"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from "react";
import { EASE, DUR, STAGGER, SPRING } from "@/lib/motion";

/* ---------------- Reveal: calm rise on scroll ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: DUR.med, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------- PendulumTitle: words swing in like chimes on threads ------- */
export function PendulumTitle({
  text,
  className,
  italicWords = [],
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  italicWords?: string[];
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");
  const Moto = motion.create(Tag);

  return (
    <Moto className={className} aria-label={text}>
      <span ref={ref} className="inline">
        {words.map((w, i) => {
          const italic = italicWords.includes(w.replace(/[.,—]/g, ""));
          return (
            <span key={i} className="relative inline-block overflow-visible whitespace-pre">
              <motion.span
                aria-hidden
                className={`inline-block origin-[50%_-40%] will-change-transform ${
                  italic ? "italic text-brass" : ""
                }`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: 8, y: -14 }}
                animate={
                  inView
                    ? reduce
                      ? { opacity: 1 }
                      : { opacity: 1, rotate: 0, y: 0 }
                    : undefined
                }
                transition={
                  reduce
                    ? { duration: 0.4, delay: i * 0.03 }
                    : { ...SPRING.pendulum, delay: i * STAGGER.word }
                }
              >
                {w}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </span>
    </Moto>
  );
}

/* ---- Sway: italic emotional words keep a gentle continuous sway ---- */
export function Sway({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={`inline-block origin-top ${className ?? ""}`}
      animate={{ rotate: [0, 1.4, 0, -1.4, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

/* -------------- WaveDivider: brass line that draws + ripples -------------- */
export function WaveDivider({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-8 w-full ${className ?? ""}`}
    >
      <motion.path
        d="M0 20 Q 75 6, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.8, ease: EASE }}
      />
    </svg>
  );
}

/* ------------- MagneticButton: leans toward cursor, brass sweep ------------- */
export function Magnetic({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 14 });
  const sy = useSpring(y, { stiffness: 120, damping: 14 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------- Tilt: card tilts like a hanging object -------------------- */
export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 80, damping: 12 });
  const sry = useSpring(ry, { stiffness: 80, damping: 12 });
  return (
    <motion.div
      className={`will-change-transform ${className ?? ""}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 4);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 4);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* --------- WindLine: a small hanging thread+bell that sways with scroll velocity --------- */
export function WindOrnament({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const vel = useMotionValue(0);
  const sway = useSpring(vel, { stiffness: 40, damping: 8 });
  const rotate = useTransform(sway, (v) => Math.max(-14, Math.min(14, v * 0.05)));
  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    let raf = 0;
    const loop = () => {
      const y = window.scrollY;
      vel.set((y - last) * 6);
      last = y;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, vel]);
  return (
    <motion.div aria-hidden className={`pointer-events-none origin-top ${className ?? ""}`} style={{ rotate }}>
      <div className="mx-auto h-16 w-px bg-brass/50" />
      <div className="mx-auto h-2.5 w-2.5 rounded-full border border-brass bg-ivory" />
      <div className="mx-auto mt-1 h-8 w-px bg-brass/30" />
      <div className="mx-auto h-5 w-1 rounded-b bg-brass/60" />
    </motion.div>
  );
}

/* ------------------- CursorRipple: subtle brass dot follows cursor ------------------- */
export function CursorRipple() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 250, damping: 25 });
  const sy = useSpring(y, { stiffness: 250, damping: 25 });
  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);
  if (reduce) return null;
  const style: CSSProperties = { transform: "translate(-50%, -50%)" };
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-3 w-3 rounded-full border border-brass/70 lg:block"
      style={{ x: sx, y: sy, ...style }}
    />
  );
}
