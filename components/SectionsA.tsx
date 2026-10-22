"use client";
import { useRef } from "react";
import Link from "next/link";
import HeroSignal from "./HeroSignal";
import { MilpVisual, AgenticVisual, TradingVisual } from "./visuals1";
import { CsaoVisual, TeaserVisual } from "./visuals2";
import { metrics, principles, projects, profile, type Project } from "../lib/content";
import { useTrackProgress, seg, lerp, ease } from "../lib/motion";

export function Hero() {
  return (
    <section className="hero" id="top" data-chapter aria-labelledby="h1">
      <HeroSignal />
      <div className="wrap">
        <p className="mono mute" data-fade="up" data-keep>Krishna Agarwal / IIT Bombay</p>
        <h1 id="h1" className="display" style={{ marginTop: 18 }}>
          I build systems that turn <em>complexity</em> into decisions.
        </h1>
        <div className="hero-meta">
          <div>
            <p className="lede">Industrial Engineering &amp; Operations Research at IIT Bombay. Working across optimization, AI systems and software engineering.</p>
            <p className="mono mute" style={{ marginTop: 14 }}>From mathematical models to systems that work in the real world.</p>
          </div>
          <div>
            <div className="hero-actions">
              <a className="btn" href="#work">Explore selected work <span className="arr">→</span></a>
              <a className="btn ghost" href="#contact">About / Get in touch</a>
            </div>
            <div className="hero-links mono">
              <a className="tlink" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="tlink" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
            </div>
          </div>
        </div>
      </div>
      <div className="cue mono" aria-hidden="true"><i />Scroll</div>
    </section>
  );
}

export function Metrics() {
  return (
    <section className="section orange-bg" aria-labelledby="proof" style={{ paddingBlock: "clamp(64px,10vh,120px)" }}>
      <div className="wrap">
        <h2 id="proof" className="label mono" data-fade="up"><span className="n">00</span> Proof, in five numbers</h2>
        <div className="metrics">
          {metrics.map((m) => {
            const body = (
              <>
                <span className="v">{m.value}</span>
                <span className="mono" style={{ display: "block", marginTop: 8 }}>{m.label}</span>
                <p className="c">{m.context}</p>
              </>
            );
            return m.href?.startsWith("/work") ? (
              <Link key={m.value} href={m.href} className="metric" data-fade="up" aria-label={`${m.value} ${m.label}. Open case study.`}>{body}</Link>
            ) : (
              <a key={m.value} href={m.href} className="metric" data-fade="up">{body}</a>
            );
          })}
        </div>
        <p className="mono" style={{ marginTop: 22, opacity: 0.7 }} data-fade="up">
          Different measures from different contexts: a ranking, a benchmark, an internship result, a user count, a research backtest.
        </p>
      </div>
    </section>
  );
}

/* tiny scroll-linked principle visuals */
function PrincipleVisual({ i }: { i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useTrackProgress(ref, 40);
  const t = ease(seg(p, 0.1, 0.9));
  if (i === 0) {
    const pts = Array.from({ length: 15 }, (_, k) => {
      const gx = 20 + (k % 5) * 48, gy = 24 + Math.floor(k / 5) * 40 + (k % 5 % 2) * 10;
      const sx = (k * 97) % 250 + 10, sy = (k * 53) % 110 + 8;
      return { x: lerp(sx, gx, t), y: lerp(sy, gy, t), k };
    });
    return (
      <div ref={ref}><svg viewBox="0 0 260 120" aria-hidden="true">
        {pts.map((a) => pts.filter((b) => b.k > a.k && Math.abs(b.k - a.k) === 1 && b.k % 5 !== 0).map((b) => (
          <line key={`${a.k}${b.k}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#ff5a14" strokeOpacity={t} />
        )))}
        {pts.map((a) => <circle key={a.k} cx={a.x} cy={a.y} r="3.4" fill={t > 0.9 ? "#ff5a14" : "#f3f2ef"} />)}
      </svg></div>
    );
  }
  if (i === 1) {
    const boxes = [0, 1, 2, 3];
    return (
      <div ref={ref}><svg viewBox="0 0 260 120" aria-hidden="true">
        {boxes.map((b) => {
          const a = seg(p, b * 0.2, b * 0.2 + 0.25);
          return (
            <g key={b} opacity={0.25 + 0.75 * a}>
              <rect x={6 + b * 64} y="40" width="46" height="40" fill="none" stroke={a > 0.9 ? "#ff5a14" : "#f3f2ef"} />
              {b < 3 && <line x1={52 + b * 64} y1="60" x2={52 + b * 64 + 18 * a} y2="60" stroke="#ff5a14" strokeWidth="2" />}
            </g>
          );
        })}
      </svg></div>
    );
  }
  return (
    <div ref={ref}><svg viewBox="0 0 260 120" aria-hidden="true">
      <rect x="20" y={100 - 50} width="50" height="50" fill="#3a3a3e" />
      <rect x="90" y={100 - 50 * 0.99 - 50 * 0.66 * t} width="50" height={50 + 50 * 0.66 * t} fill="#ff5a14" />
      <line x1="10" y1="100" x2="250" y2="100" stroke="#f3f2ef" strokeOpacity=".3" />
      <text className="svg-t" x="14" y="116" style={{ fontSize: 9.5 }}>BASELINE</text><text className="svg-t o" x="84" y="116" style={{ fontSize: 9.5 }}>MEASURED</text>
      <text className="svg-t w" x="152" y="56" opacity={t} style={{ fontSize: 10 }}>vs. a baseline,</text><text className="svg-t w" x="152" y="70" opacity={t} style={{ fontSize: 10 }}>not vs. nothing</text>
    </svg></div>
  );
}

export function Approach() {
  return (
    <section className="section" id="approach" data-chapter aria-labelledby="ap">
      <div className="wrap">
        <p className="label mono" data-fade="up"><span className="n">01</span> How I think</p>
        <h2 id="ap" className="display h2" style={{ maxWidth: "16ch" }} data-fade="up">The hard part is rarely just the answer.</h2>
        <p className="lede" style={{ marginTop: 32 }} data-fade="up">
          I like problems where the difficulty is finding the right model, building a reliable way to solve it, and understanding whether the result holds up.
        </p>
        <div className="approach-grid">
          {principles.map((pr, i) => (
            <div className="principle" key={pr.n} data-fade="up">
              <PrincipleVisual i={i} />
              <h3><span className="mono orange" style={{ display: "block", marginBottom: 10 }}>{pr.n}</span>{pr.title}</h3>
              <p>{pr.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stageNames: Record<string, string[]> = {
  "milp-solver": ["Problem structure", "Min-plus reduction", "Efficient merge", "Verification"],
  csao: ["Cart", "Candidates", "Hybrid model", "Ranking", "Recommend"],
  "agentic-intelligence": ["Sources", "Ingest", "Reason", "Serve", "Feedback"],
  "investment-teaser": ["Research", "Evidence", "Financials", "Narrative", "Slides", "Deck"],
  "rl-trading": ["Series", "State", "Policy", "Action", "Risk"],
};

function Visual({ slug, p }: { slug: string; p: number }) {
  switch (slug) {
    case "milp-solver": return <MilpVisual p={p} />;
    case "csao": return <CsaoVisual p={p} />;
    case "agentic-intelligence": return <AgenticVisual p={p} />;
    case "investment-teaser": return <TeaserVisual p={p} />;
    default: return <TradingVisual p={p} />;
  }
}

export function ProjectStage({ pr, p }: { pr: Project; p: number }) {
  const names = stageNames[pr.slug];
  const cur = Math.min(names.length - 1, Math.floor(p * names.length * 0.999));
  return (
    <div>
      <div className="stage"><Visual slug={pr.slug} p={p} />
      </div>
      <div className="steps mono" aria-hidden="true" style={{ fontSize: 10.5 }}>
        {names.map((n, i) => <span key={n} className={i <= cur ? "on" : ""}>{n}</span>)}
      </div>
    </div>
  );
}

function Project({ pr, flip }: { pr: Project; flip: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const p = useTrackProgress(track, 80);
  return (
    <article className={"proj" + (flip ? " flip" : "")} id={pr.slug} aria-labelledby={`t-${pr.slug}`}>
      <div className="proj-track" ref={track}>
        <div className="proj-sticky">
          <div className="wrap proj-grid">
            <div className="proj-copy">
              <p className="mono"><span className="proj-idx">{pr.index}</span> <span className="mute">/ {pr.period}</span></p>
              <h3 id={`t-${pr.slug}`} className="display">{pr.headline}</h3>
              <p className="org mono">{pr.title} · {pr.org}</p>
              <p className="sum">{pr.summary}</p>
              <div className="big"><b>{pr.result.value}</b><span>{pr.result.label}</span></div>
              <div className="proj-links">
                <Link className="btn" href={`/work/${pr.slug}`}>Read case study <span className="arr">→</span></Link>
              </div>
              {pr.disclaimer && <p className="mono mute" style={{ marginTop: 18, fontSize: 10.5, maxWidth: "46ch" }}>{pr.disclaimer}</p>}
            </div>
            <ProjectStage pr={pr} p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function SelectedWork() {
  return (
    <section id="work" data-chapter aria-labelledby="wk" style={{ paddingTop: "clamp(96px,14vh,190px)" }}>
      <div className="wrap work-head">
        <p className="label mono" data-fade="up"><span className="n">02</span> Selected work</p>
        <h2 id="wk" className="display h2" style={{ maxWidth: "14ch" }} data-fade="up">Five systems, each with a mechanism.</h2>
        <p className="lede" data-fade="up">Scroll through a project to watch its idea assemble. Everything is readable if you scroll past quickly.</p>
      </div>
      {projects.map((pr, i) => <Project key={pr.slug} pr={pr} flip={i % 2 === 1} />)}
    </section>
  );
}
