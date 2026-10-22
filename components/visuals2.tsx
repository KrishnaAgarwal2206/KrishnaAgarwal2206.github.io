"use client";
import { useEffect, useState } from "react";
import { seg } from "../lib/motion";

/* ============ 2. CSAO: interactive mock cart (conceptual) ============ */
const carts = [
  { name: "Biryani night", items: ["Chicken Biryani", "Gulab Jamun"], rec: "Raita", why: "Pairs with rice mains" },
  { name: "Pizza night", items: ["Margherita Pizza", "Pepsi"], rec: "Garlic Bread", why: "Frequent complement to pizza" },
  { name: "Burger run", items: ["Veg Burger"], rec: "Peri-peri Fries", why: "Usual side to a burger" },
];
const stages = ["Cart context", "Candidate generation", "Hybrid model", "Ranking", "Recommendation"];

export function CsaoVisual({ p }: { p: number }) {
  const [sel, setSel] = useState(0);
  const [manual, setManual] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (manual === null) return;
    if (manual >= stages.length - 1) return;
    const t = setTimeout(() => setManual((m) => (m === null ? m : m + 1)), 520);
    return () => clearTimeout(t);
  }, [manual]);

  const auto = Math.min(4, Math.floor(seg(p, 0.1, 0.85) * 5));
  const stage = manual ?? auto;
  const cart = carts[sel];
  const pick = (i: number) => { setSel(i); setAdded(false); setManual(0); };

  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "auto 1fr auto", padding: "clamp(12px,2vw,22px)", gap: 12 }}>
      <div className="mono mute" style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <span>Concept demo · tap a cart</span><span className="orange">~65 ms P99 · 3× below SLA</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)", gap: 14, minHeight: 0 }}>
        {/* cart */}
        <div style={{ background: "#0b0b0c", border: "1px solid var(--line)", padding: 12, display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {carts.map((c, i) => (
              <button key={c.name} onClick={() => pick(i)} aria-pressed={sel === i} className="mono"
                style={{ padding: "5px 8px", border: "1px solid " + (sel === i ? "var(--orange)" : "var(--line)"), color: sel === i ? "var(--orange)" : "var(--mute)", fontSize: 10 }}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="mono mute" style={{ fontSize: 10, marginTop: 4 }}>Your cart</div>
          {cart.items.map((it) => (
            <div key={it} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--line)", fontSize: 14 }}>
              <span>{it}</span><span className="mute">×1</span>
            </div>
          ))}
          {added && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--orange)", fontSize: 14, color: "var(--orange)" }}>
              <span>{cart.rec}</span><span>×1</span>
            </div>
          )}
          <div style={{ marginTop: "auto", borderTop: "1px dashed var(--line)", paddingTop: 10, opacity: stage >= 4 ? 1 : 0.18, transition: "opacity .4s" }}>
            <div className="mono orange" style={{ fontSize: 10 }}>Complete your meal</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6, gap: 8 }}>
              <div><div style={{ fontWeight: 700 }}>{cart.rec}</div><div className="mute" style={{ fontSize: 12 }}>{cart.why}</div></div>
              <button onClick={() => setAdded(true)} disabled={stage < 4 || added} style={{ background: "var(--orange)", color: "#000", padding: "6px 12px", fontWeight: 700, fontSize: 13, opacity: added ? 0.4 : 1 }}>
                {added ? "Added" : "Add"}
              </button>
            </div>
          </div>
        </div>
        {/* architecture */}
        <ol style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 6 }} aria-label="Recommendation pipeline">
          {stages.map((s, i) => (
            <li key={s} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, padding: "0 10px", border: "1px solid " + (i <= stage ? "var(--orange)" : "var(--line)"), background: i === stage ? "rgba(255,90,20,.12)" : "transparent", transition: "all .35s" }}>
              <span className="mono" style={{ color: i <= stage ? "var(--orange)" : "var(--mute)", fontSize: 10 }}>0{i + 1}</span>
              <span style={{ fontSize: 13.5, color: i <= stage ? "#f3f2ef" : "var(--mute)" }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mono mute" style={{ fontSize: 10 }}>Set Transformer + GRU4Rec · cross-attention · LightGBM. Educational illustration, not the competition model.</div>
    </div>
  );
}

/* ============ 4. Investment teaser: six agents -> editable deck (synthetic) ============ */
const agents = ["Research", "Evidence extraction", "Financial synthesis", "Narrative planning", "Slide generation", "Editable deck"];
const slides = [
  { t: "Company snapshot", kind: "text" },
  { t: "Financial summary", kind: "chart" },
  { t: "Investment highlights", kind: "list" },
];

export function TeaserVisual({ p }: { p: number }) {
  const [tab, setTab] = useState(1);
  const on = Math.min(6, Math.floor(seg(p, 0.05, 0.9) * 6.99));
  const bars = [38, 52, 61, 74, 90];
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "minmax(0,.8fr) minmax(0,1.2fr)", gap: 14, padding: "clamp(12px,2vw,22px)" }}>
      <ol aria-label="Conceptual agent stages" style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "space-between" }}>
        {agents.map((a, i) => (
          <li key={a} style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, padding: "0 10px", border: "1px solid " + (i < on ? "var(--orange)" : "var(--line)"), color: i < on ? "#f3f2ef" : "var(--mute)", transition: "all .35s", fontSize: 13 }}>
            <span className="mono" style={{ fontSize: 10, color: i < on ? "var(--orange)" : "var(--mute)" }}>{i < 5 ? `A${i + 1}` : "OUT"}</span>{a}
          </li>
        ))}
      </ol>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
        <div role="tablist" aria-label="Sample slides" style={{ display: "flex", gap: 6 }}>
          {slides.map((s, i) => (
            <button key={s.t} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className="mono"
              style={{ padding: "5px 8px", fontSize: 10, border: "1px solid " + (tab === i ? "var(--orange)" : "var(--line)"), color: tab === i ? "var(--orange)" : "var(--mute)" }}>
              {i + 1}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, background: "#f3f2ef", color: "#111", padding: "14px 16px", position: "relative", opacity: 0.25 + 0.75 * seg(p, 0.5, 0.8), transition: "opacity .2s", minHeight: 0, overflow: "hidden" }}>
          <div className="mono" style={{ fontSize: 9, color: "#c93d00" }}>PROJECT NORTHSTAR · SYNTHETIC DEMO</div>
          <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", margin: "4px 0 10px", fontStretch: "108%" }}>{slides[tab].t}</div>
          {slides[tab].kind === "chart" && (
            <svg viewBox="0 0 200 90" style={{ width: "100%", height: "70%" }} aria-label="Illustrative bar chart">
              {bars.map((b, i) => <rect key={i} x={12 + i * 36} y={80 - b * 0.8} width="24" height={b * 0.8} fill={i === 4 ? "#ff5a14" : "#17191c"} />)}
              <line x1="6" y1="80" x2="196" y2="80" stroke="#111" />
            </svg>
          )}
          {slides[tab].kind === "text" && <p style={{ fontSize: 12.5, lineHeight: 1.45, color: "#333" }}>Fictional mid-market manufacturer. Placeholder text showing where evidence extracted from public sources would be structured into a narrative.</p>}
          {slides[tab].kind === "list" && <ul style={{ fontSize: 12.5, lineHeight: 1.8, color: "#333" }}>{["Placeholder highlight one", "Placeholder highlight two", "Placeholder highlight three"].map((x) => <li key={x} style={{ borderBottom: "1px solid #ddd" }}>{x}</li>)}</ul>}
          <div className="mono" style={{ position: "absolute", right: 12, bottom: 8, fontSize: 9, color: "#555" }}>.PPTX · EDITABLE · &lt; 5 MIN</div>
        </div>
      </div>
    </div>
  );
}
