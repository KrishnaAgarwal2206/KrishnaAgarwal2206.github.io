"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll progress (0..1) of a tall track element, quantised so React only
 * re-renders ~50 times across the whole track. Reduced motion => fully resolved (1).
 */
export function useTrackProgress(ref: RefObject<HTMLElement | null>, steps = 60) {
  const [p, setP] = useState(0);
  const last = useRef(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setP(1);
      return;
    }
    const { ScrollTrigger } = registerGsap();
    const mobile = () => window.matchMedia("(max-width: 999px)").matches;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 60%",
      onUpdate: (self) => {
        // On small screens the track is not tall: resolve once visible.
        const raw = mobile() ? Math.min(1, self.progress * 3) : self.progress;
        const q = Math.round(raw * steps) / steps;
        if (q !== last.current) {
          last.current = q;
          setP(q);
        }
      },
    });
    return () => st.kill();
  }, [ref, steps]);
  return p;
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** map p from [a,b] to [0,1] */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => t * t * (3 - 2 * t);
