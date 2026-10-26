/**
 * Shared motion system — one easing, a small set of durations and stagger
 * values, reused across the entire site so every animation feels related.
 * Motion should feel like gentle wind: slow, soft, never snappy.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SOFT = [0.33, 1, 0.68, 1] as const;

export const DUR = {
  fast: 0.55,
  med: 0.85,
  slow: 1.15,
  breath: 1.6,
} as const;

export const STAGGER = {
  word: 0.07,
  card: 0.09,
  line: 0.12,
} as const;

export const SPRING = {
  pendulum: { type: "spring", stiffness: 42, damping: 9, mass: 1.1 },
  settle: { type: "spring", stiffness: 60, damping: 14 },
} as const;

export const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.med, ease: EASE, delay: i * STAGGER.card },
  }),
};

export const fade = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: DUR.slow, ease: EASE, delay: i * STAGGER.line },
  }),
};
