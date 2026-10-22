"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion";

type Pt = { sx: number; sy: number; tx: number; ty: number; layer: number; delay: number; r: number };

/** Scattered points organise into a layered network with one resolved path. Plays once, then rests. */
export default function HeroSignal() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let start = 0;
    let pts: Pt[] = [];
    let path: number[] = [];
    let W = 0, H = 0;
    const DUR = 3400;
    const reduce = prefersReducedMotion();

    // deterministic pseudo-random so SSR/CSR and reloads look identical
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

    const build = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 7;
      const wide = W > 900;
      const x0 = wide ? W * 0.63 : W * 0.1, x1 = wide ? W * 0.95 : W * 0.9;
      const y0 = wide ? H * 0.14 : H * 0.1, y1 = wide ? H * 0.74 : H * 0.27;
      const layers = [3, 5, 6, 5, 3];
      pts = [];
      layers.forEach((n, li) => {
        for (let i = 0; i < n; i++) {
          const jx = (rnd() - 0.5) * 18, jy = (rnd() - 0.5) * 14;
          pts.push({
            sx: rnd() * W, sy: rnd() * H,
            tx: x0 + ((x1 - x0) * li) / (layers.length - 1) + jx,
            ty: y0 + ((y1 - y0) * (i + 0.5)) / n + jy,
            layer: li, delay: rnd() * 0.35, r: 2 + rnd() * 1.6,
          });
        }
      });
      // extra drifting noise points that fade away
      for (let i = 0; i < 46; i++) pts.push({ sx: rnd() * W, sy: rnd() * H, tx: rnd() * W, ty: rnd() * H, layer: -1, delay: 0, r: 1 + rnd() * 1.2 });
      // resolved path: pick one node per layer
      path = [];
      let idx = 0;
      layers.forEach((n, li) => { path.push(idx + Math.floor(n / 2 + (li % 2 ? 0 : -0.01))); idx += n; });
    };

    const e = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const net = pts.filter((p) => p.layer >= 0);
      const pos = (p: Pt) => {
        const k = p.layer < 0 ? 0 : e(Math.min(1, Math.max(0, (t - p.delay) / (1 - 0.4))));
        const wob = (1 - k) * (p.layer < 0 ? 1 : 0.7);
        return {
          x: p.sx + (p.tx - p.sx) * k + Math.sin(t * 9 + p.sx) * 5 * wob,
          y: p.sy + (p.ty - p.sy) * k + Math.cos(t * 8 + p.sy) * 5 * wob,
          k,
        };
      };
      const P = pts.map(pos);
      // noise points
      pts.forEach((p, i) => {
        if (p.layer >= 0) return;
        ctx.fillStyle = `rgba(243,242,239,${0.35 * (1 - t) + 0.04})`;
        ctx.fillRect(P[i].x, P[i].y, p.r, p.r);
      });
      // edges between consecutive layers
      const edgeA = Math.max(0, (t - 0.45) / 0.55);
      ctx.lineWidth = 1;
      for (let a = 0; a < net.length; a++) for (let b = a + 1; b < net.length; b++) {
        if (net[b].layer - net[a].layer !== 1) continue;
        // sparse deterministic connectivity
        if ((a * 7 + b * 3) % 3 === 0) continue;
        ctx.strokeStyle = `rgba(243,242,239,${0.13 * edgeA})`;
        ctx.beginPath(); ctx.moveTo(P[a].x, P[a].y); ctx.lineTo(P[b].x, P[b].y); ctx.stroke();
      }
      // resolved orange path
      const pathA = Math.max(0, Math.min(1, (t - 0.62) / 0.38));
      if (pathA > 0) {
        ctx.strokeStyle = "#ff5a14"; ctx.lineWidth = 2.2;
        ctx.beginPath();
        const segs = path.length - 1;
        const upto = pathA * segs;
        ctx.moveTo(P[path[0]].x, P[path[0]].y);
        for (let s = 0; s < segs; s++) {
          const f = Math.min(1, Math.max(0, upto - s));
          if (f <= 0) break;
          const a = P[path[s]], b = P[path[s + 1]];
          ctx.lineTo(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f);
        }
        ctx.stroke();
      }
      // nodes
      net.forEach((p, i) => {
        const onPath = path.includes(i);
        const lit = onPath && pathA * (path.length - 1) >= path.indexOf(i) - 0.01;
        ctx.fillStyle = lit ? "#ff5a14" : "rgba(243,242,239,0.8)";
        ctx.beginPath(); ctx.arc(P[i].x, P[i].y, lit ? p.r + 1.6 : p.r, 0, 6.2832); ctx.fill();
        if (lit && t > 0.98) { ctx.strokeStyle = "rgba(255,90,20,.35)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(P[i].x, P[i].y, p.r + 6, 0, 6.2832); ctx.stroke(); }
      });
      // annotations
      if (t > 0.9) {
        ctx.font = "11px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#8d8d92";
        const last = P[path[path.length - 1]], first = P[path[0]];
        ctx.fillText("INPUT / NOISE", first.x - 6, first.y - 18);
        ctx.fillStyle = "#ff5a14";
        ctx.fillText("DECISION", last.x - 56, last.y - 18);
      }
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / DUR);
      draw(t);
      if (t < 1) raf = requestAnimationFrame(frame);
    };

    const run = () => {
      cancelAnimationFrame(raf);
      build();
      if (reduce) draw(1);
      else { start = 0; raf = requestAnimationFrame(frame); }
    };
    run();
    let rt: ReturnType<typeof setTimeout>;
    let lastW = W;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (canvas.clientWidth === lastW && !reduce) return; // ignore mobile address-bar height changes
        lastW = canvas.clientWidth; build(); draw(1);
      }, 150);
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
