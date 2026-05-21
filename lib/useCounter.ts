"use client";

import { useEffect, useRef, useState } from "react";

/** Ease-out cubic — fast start, gentle settle. */
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** True when the user has asked the OS to minimise motion. */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface UseCounterOptions {
  /** Final value to count up to. */
  target: number;
  /** Animation duration in milliseconds. */
  durationMs?: number;
  /** Decimal places to keep in the displayed value (e.g. 1 for "4.8"). */
  decimals?: number;
  /** IntersectionObserver visibility threshold that triggers the count. */
  threshold?: number;
}

interface UseCounterResult<T extends HTMLElement> {
  /** Attach to the element whose visibility starts the animation. */
  ref: React.RefObject<T | null>;
  /** Current value, formatted with thousands separators. */
  value: string;
}

/**
 * Counts a number up from 0 to `target` once its element scrolls into view.
 *
 * - Uses `requestAnimationFrame` with an ease-out-cubic curve.
 * - Fires exactly once (observer disconnects after the first intersection).
 * - Respects `prefers-reduced-motion`: starts already at the target so no
 *   `setState` is needed inside the effect for that branch.
 * - Cleans up both the rAF loop and the observer on unmount.
 */
export function useCounter<T extends HTMLElement = HTMLDivElement>({
  target,
  durationMs = 2000,
  decimals = 0,
  threshold = 0.4,
}: UseCounterOptions): UseCounterResult<T> {
  const ref = useRef<T | null>(null);
  // Lazy initialiser: if motion is reduced, render the final value from the
  // very first frame and skip the animation entirely.
  const [current, setCurrent] = useState<number>(() =>
    prefersReducedMotion() ? target : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;
    let startTime = 0;
    let started = false;

    const tick = (now: number) => {
      if (startTime === 0) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      setCurrent(target * easeOutCubic(progress));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, durationMs, threshold]);

  const rounded =
    decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();

  // Apply thousands separators (e.g. 10000 -> "10,000"); preserves the
  // configured fraction digits for the decimal case.
  const value = Number(rounded).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, value };
}
