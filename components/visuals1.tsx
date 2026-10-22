"use client";
import { seg, lerp, ease } from "../lib/motion";

/* ============ 1. MILP: combinatorial tangle -> min-plus -> merge -> verify ============ */
const N = 8;
const aV = Array.from({ length: N }, (_, i) => Math.pow(i - 2.5, 2) + 1 + i * 0.3);
const bV = Array.from({ length: N }, (_, i) => Math.pow(i - 3.2, 2) * 1.1 + 0.5 + i * 0.2);
const all = [...aV.map((v, i) => ({ v, g: 0, i })), ...bV.map((v, i) => ({ v, g: 1, i }))];
const ranked = [...all].sort((x, y) => x.v - y.v);
const rank = (g: number, i: number) => ranked.findIndex((r) => r.g === g && r.i === i);
let sd = 11;
const rr = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
const scatter = all.map(() => ({ x: 90 + rr() * 620, y: 90 + rr() * 330 }));

export function MilpVisual({ p }: { p: number }) {
  const t1 = ease(seg(p, 0.18, 0.4)); // organise into two convex sequences
  const t2 = ease(seg(p, 0.45, 0.72)); // merge
  const tangle = 1 - seg(p, 0.15, 0.4);
  const mergeLines = seg(p, 0.45, 0.75);
  const pos = all.map((n, k) => {
    const row = n.g === 0 ? 150 : 300;
    const s = { x: 100 + n.i * 85, y: row + Math.pow(n.i - 3.5, 2) * 1.6 };
    const m = { x: 90 + rank(n.g, n.i) * 41, y: 440 };
    const a = { x: lerp(scatter[k].x, s.x, t1), y: lerp(scatter[k].y, s.y, t1) };
    return { x: lerp(a.x, m.x, t2), y: lerp(a.y, m.y, t2), m, n };
  });
  const verified = seg(p, 0.8, 1);
  return (
    <svg viewBox="0 0 800 550" role="img" aria-label="Conceptual animation: a tangle of candidate combinations organises into two sorted sequences that are merged in O(N log N) time.">
      {/* tangle edges */}
      {all.map((a, i) => all.map((b, j) => (a.g === 0 && b.g === 1 && (i + j) % 2 === 0 ? (
        <line key={`${i}-${j}`} x1={pos[i].x} y1={pos[i].y} x2={pos[j].x} y2={pos[j].y} stroke="#f3f2ef" strokeOpacity={0.16 * tangle} strokeWidth="1" />
      ) : null)))}
      {/* merge lines */}
      {pos.map((q, k) => (
        <line key={k} x1={q.x} y1={q.y} x2={q.m.x} y2={q.m.y} stroke="#ff5a14" strokeOpacity={0.5 * mergeLines * (1 - t2)} strokeWidth="1" />
      ))}
      {p > 0.7 && <line x1="90" y1="440" x2={90 + 15 * 41} y2="440" stroke="#ff5a14" strokeOpacity={seg(p, 0.7, 0.85)} strokeWidth="2" />}
      {pos.map((q, k) => (
        <circle key={k} cx={q.x} cy={q.y} r={4 + all[k].v * 0.28} fill={t2 > 0.9 ? "#ff5a14" : all[k].g ? "#f3f2ef" : "#ff5a14"} fillOpacity={t2 > 0.9 ? 1 : 0.9} />
      ))}
      <text className="svg-t" x="40" y="44">01 PROBLEM STRUCTURE</text>
      <text className="svg-t o" x="40" y="62" opacity={seg(p, 0.12, 0.2)}>{p > 0.45 ? "" : "2 sequences of weighted choices"}</text>
      {p > 0.3 && <text className="svg-t" x="40" y="118" opacity={seg(p, 0.3, 0.45)}>02 MIN-PLUS CONVOLUTION: (A ⊕ B)[k] = min_i A[i] + B[k−i]</text>}
      {p > 0.55 && <text className="svg-t o" x="40" y="500" opacity={seg(p, 0.55, 0.72)}>03 EFFICIENT MERGE · O(N log N) in the convex regime</text>}
      <g opacity={verified}>
        <text className="svg-t w" x="40" y="526">04 VERIFIED</text>
        <text className="svg-t" x="150" y="526">16/16 vs Gurobi · 12,000+ vs exhaustive truth · 5M+ instances mapped</text>
      </g>
    </svg>
  );
}

/* ============ 3. Agentic foundation: sources -> 3 layers -> output, with feedback ============ */
export function AgenticVisual({ p }: { p: number }) {
  const src = 6;
  const a = seg(p, 0.0, 0.2);
  const b = seg(p, 0.2, 0.45);
  const c = seg(p, 0.45, 0.7);
  const d = seg(p, 0.7, 0.9);
  const flow = seg(p, 0.15, 0.9);
  const layers = [
    { x: 250, t: "LAYER 1", s: "Ingest · 6 adapters", a: b },
    { x: 440, t: "LAYER 2", s: "Reason · 15 steps", a: c },
    { x: 630, t: "LAYER 3", s: "Serve · 7 routers", a: d },
  ];
  const sy = (i: number) => 100 + i * 66;
  // travelling packets along the middle
  const px = lerp(60, 730, flow);
  return (
    <svg viewBox="0 0 800 550" role="img" aria-label="Conceptual diagram: six interchangeable source adapters feed a three-layer pipeline that produces structured output and a feedback loop.">
      {Array.from({ length: src }).map((_, i) => (
        <g key={i} opacity={a}>
          <rect x="40" y={sy(i) - 16} width="64" height="32" fill="none" stroke="#6b6b70" />
          <text className="svg-t" x="50" y={sy(i) + 4} style={{ fontSize: 11 }}>src {i + 1}</text>
          <path d={`M104 ${sy(i)} C 140 ${sy(i)}, 150 275, 175 275`} fill="none" stroke="#ff5a14" strokeOpacity={0.5 * b} />
        </g>
      ))}
      {layers.map((l, i) => (
        <g key={i} opacity={l.a}>
          <rect x={l.x - 75} y="150" width="150" height="250" fill="#17171a" stroke={l.a > 0.9 ? "#ff5a14" : "#3a3a3e"} />
          <text className="svg-t o" x={l.x - 65} y="174">{l.t}</text>
          <text className="svg-t" x={l.x - 65} y="192" style={{ fontSize: 11 }}>{l.s}</text>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={l.x - 58} y={208 + k * 44} width="116" height="30" fill="none" stroke="#3a3a3e" strokeDasharray={k === 1 ? "3 3" : undefined} />
          ))}
          {i < 2 && <path d={`M${l.x + 75} 275 H ${l.x + 115}`} stroke="#ff5a14" strokeOpacity={0.7} />}
        </g>
      ))}
      <g opacity={d}>
        <rect x="716" y="236" width="56" height="78" fill="#ff5a14" />
        <text x="722" y="270" style={{ font: "700 10px var(--mono)" }} fill="#000">STRUCT-</text>
        <text x="722" y="283" style={{ font: "700 10px var(--mono)" }} fill="#000">URED</text>
        <text x="722" y="296" style={{ font: "700 10px var(--mono)" }} fill="#000">OUTPUT</text>
      </g>
      {/* feedback loop */}
      <path d="M744 314 C 744 470, 440 480, 440 404" fill="none" stroke="#ff5a14" strokeWidth="1.5" strokeDasharray="5 5" opacity={seg(p, 0.85, 1)} />
      <text className="svg-t o" x="500" y="470" opacity={seg(p, 0.88, 1)}>FEEDBACK LOOP · outputs are evaluated</text>
      {flow > 0 && flow < 1 && <circle cx={px} cy={275} r="4" fill="#f3f2ef" />}
      <text className="svg-t" x="40" y="44">3 LAYERS · 30+ STEPS · 40+ TABLES</text>
      <text className="svg-t" x="40" y="530">Abstract illustration of the concept. Not an internal architecture.</text>
    </svg>
  );
}

/* ============ 5. Trading: series -> state -> policy -> action -> risk ============ */
const series = Array.from({ length: 80 }, (_, i) => 260 - (i * 1.9) - Math.sin(i / 5) * 24 - Math.sin(i / 1.7) * 7 + Math.cos(i / 11) * 20 - i * 0.6);

export function TradingVisual({ p }: { p: number }) {
  const draw = seg(p, 0, 0.3);
  const feat = seg(p, 0.3, 0.5);
  const pol = seg(p, 0.5, 0.7);
  const act = seg(p, 0.7, 0.85);
  const risk = seg(p, 0.85, 1);
  const n = Math.max(2, Math.floor(draw * series.length));
  const pts = series.slice(0, n).map((y, i) => `${40 + i * 5.2},${y * 0.5 + 70}`).join(" ");
  const head = series[n - 1] * 0.5 + 70;
  const feats = ["RSI", "MACD", "MOMENTUM", "VOLATILITY"];
  const layerN = [4, 5, 3];
  return (
    <svg viewBox="0 0 800 550" role="img" aria-label="Conceptual animation: a market series is converted to features, passed to a PPO policy, producing an action that a risk layer monitors.">
      <polyline points={pts} fill="none" stroke="#f3f2ef" strokeWidth="1.6" />
      <circle cx={40 + (n - 1) * 5.2} cy={head} r="4" fill="#ff5a14" />
      <text className="svg-t" x="40" y="44">MARKET SERIES · ILLUSTRATIVE, NOT REAL DATA</text>
      {/* features */}
      <g opacity={feat}>
        {feats.map((f, i) => (
          <g key={f} transform={`translate(${40 + i * 98} 350)`}>
            <rect width="90" height="26" fill="none" stroke="#ff5a14" strokeOpacity="0.7" />
            <text className="svg-t o" x="8" y="17">{f}</text>
          </g>
        ))}
        <text className="svg-t" x="40" y="338">STATE VARIABLES</text>
      </g>
      {/* policy net */}
      <g opacity={pol} transform="translate(470 330)">
        {layerN.map((c, li) => Array.from({ length: c }).map((_, k) => (
          <g key={`${li}-${k}`}>
            {li < 2 && Array.from({ length: layerN[li + 1] }).map((__, m) => (
              <line key={m} x1={li * 70} y1={k * 22 - c * 11} x2={(li + 1) * 70} y2={m * 22 - layerN[li + 1] * 11} stroke="#f3f2ef" strokeOpacity="0.2" />
            ))}
            <circle cx={li * 70} cy={k * 22 - c * 11} r="5" fill={li === 2 ? "#ff5a14" : "#f3f2ef"} />
          </g>
        )))}
        <text className="svg-t" x="-6" y="-72">PPO POLICY (SIMPLIFIED)</text>
      </g>
      {/* action */}
      <g opacity={act}>
        <path d="M640 330 H 700" stroke="#ff5a14" strokeWidth="2" markerEnd="url(#ar)" />
        <rect x="704" y="310" width="68" height="40" fill="#ff5a14" />
        <text x="712" y="334" style={{ font: "700 11px var(--mono)" }} fill="#000">ACTION</text>
      </g>
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#ff5a14" /></marker></defs>
      {/* risk + scorecard */}
      <g opacity={risk}>
        <rect x="40" y="410" width="720" height="104" fill="none" stroke="#3a3a3e" />
        <text className="svg-t o" x="56" y="432">RISK MONITOR · REPORTED RESEARCH SCORECARD</text>
        {[["2.13", "Sharpe"], ["2.76", "Sortino"], ["−2.89%", "Max drawdown"], ["15.3%", "6-wk out-of-sample"]].map(([v, l], i) => (
          <g key={l} transform={`translate(${56 + i * 176} 484)`}>
            <text style={{ font: "800 30px var(--display)" }} fill="#f3f2ef">{v}</text>
            <text className="svg-t" y="16">{l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
