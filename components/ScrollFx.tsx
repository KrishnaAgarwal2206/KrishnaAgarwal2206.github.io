"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { registerGsap, prefersReducedMotion } from "../lib/motion";

/**
 * Scroll-linked fade system.
 * Any element with [data-fade] fades + rises in as it enters the viewport and
 * fades + lifts away as it leaves, tied directly to scroll position (scrubbed).
 * Content is fully visible without JS or with prefers-reduced-motion.
 */
export default function ScrollFx() {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = registerGsap();
    document.documentElement.classList.add("js-fade");
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        const kind = window.innerWidth < 1000 && (el.dataset.fade === "left" || el.dataset.fade === "right") ? "up" : el.dataset.fade;
        const x = kind === "left" ? -50 : kind === "right" ? 50 : 0;
        const y = kind === "left" || kind === "right" ? 0 : 56;
        const scale = kind === "scale" ? 0.94 : 1;
        // fade in
        gsap.fromTo(
          el,
          { opacity: 0, y, x, scale },
          {
            opacity: 1, y: 0, x: 0, scale: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top 94%", end: "top 64%", scrub: 0.4 },
          }
        );
        // fade out (only once the element is in the upper part of the screen)
        if (el.dataset.keep === undefined) {
          gsap.fromTo(
            el,
            { opacity: 1 },
            {
              opacity: 0, ease: "none", immediateRender: false,
              scrollTrigger: { trigger: el, start: "bottom 26%", end: "bottom 2%", scrub: 0.4 },
            }
          );
        }
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      document.documentElement.classList.remove("js-fade");
    };
  }, []);
  return null;
}

/** Fixed vertical "signal line": fills with orange as you read, nodes mark chapters. */
export function SignalRail() {
  const [ticks, setTicks] = useState<{ y: number; id: string }[]>([]);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      setTicks(els.map((e) => ({ id: e.id, y: Math.min(1, Math.max(0, e.getBoundingClientRect().top + window.scrollY) / Math.max(1, total)) })));
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        setProg(Math.min(1, window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)));
      });
    };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);
  const H = 1000;
  return (
    <div className="rail" aria-hidden="true">
      <svg viewBox={`0 0 14 ${H}`} preserveAspectRatio="none">
        <line x1="7" y1="0" x2="7" y2={H} stroke="rgba(255,255,255,.14)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="7" y1="0" x2="7" y2={H * prog} stroke="#ff5a14" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {ticks.map((t) => (
        <span
          key={t.id}
          style={{
            position: "absolute", left: 3, top: `calc(${t.y * 100}% - ${t.y * 8}px)`, width: 8, height: 8,
            background: prog >= t.y - 0.002 ? "#ff5a14" : "#0b0b0c",
            border: "1px solid " + (prog >= t.y - 0.002 ? "#ff5a14" : "#6b6b70"), transform: "rotate(45deg)",
          }}
        />
      ))}
    </div>
  );
}
