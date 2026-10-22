import { secondary, experience, leadership, beyond, education, skills, profile } from "../lib/content";

function MiniVisual({ k }: { k: string }) {
  const s = { width: "100%", maxWidth: 280, height: 70 } as const;
  const o = "#c93d00", d = "#111";
  if (k === "devops")
    return (
      <svg viewBox="0 0 280 70" style={s} aria-label="Relative illustration: tokens before and after prompt caching">
        <rect x="0" y="8" width="200" height="16" fill={d} /><rect x="0" y="40" width="60" height="16" fill={o} />
        <text x="206" y="21" fontSize="11" fill="#555" fontFamily="monospace">before</text>
        <text x="68" y="53" fontSize="11" fill={o} fontFamily="monospace">after: −70%</text>
      </svg>
    );
  if (k === "health")
    return (
      <svg viewBox="0 0 280 70" style={s} aria-hidden="true">
        {[0, 1, 2].map((i) => <rect key={i} x="0" y={6 + i * 20} width="70" height="14" fill="none" stroke={d} />)}
        <path d="M70 13 L110 35 M70 33 L110 35 M70 53 L110 35" stroke={o} /><rect x="110" y="18" width="80" height="34" fill={o} />
        <text x="116" y="39" fontSize="10" fill="#fff" fontFamily="monospace">REPORT</text>
      </svg>
    );
  if (k === "resobin")
    return (
      <svg viewBox="0 0 280 70" style={s} aria-label="Representative layout, not a screenshot">
        <rect x="0" y="2" width="90" height="66" fill="none" stroke={d} />
        {[0, 1, 2, 3].map((i) => <rect key={i} x="8" y={10 + i * 14} width={i === 1 ? 74 : 56} height="8" fill={i === 1 ? o : "#bbb"} />)}
        <text x="100" y="40" fontSize="10.5" fill="#555" fontFamily="monospace">representative UI</text>
      </svg>
    );
  if (k === "insti")
    return (
      <svg viewBox="0 0 280 70" style={s} aria-hidden="true">
        {[[10, 12], [10, 36], [10, 60], [60, 24], [60, 50]].map(([x, y], i) => <g key={i}><line x1={x} y1={y} x2="130" y2="35" stroke="#999" /><circle cx={x} cy={y} r="4" fill={d} /></g>)}
        <rect x="130" y="20" width="40" height="30" fill={o} /><rect x="180" y="26" width="30" height="18" fill="none" stroke={d} />
        <line x1="170" y1="35" x2="180" y2="35" stroke={d} />
      </svg>
    );
  return (
    <svg viewBox="0 0 280 70" style={s} aria-label="Illustrative Monte Carlo paths, not real data">
      {[0, 1, 2, 3, 4].map((i) => <polyline key={i} fill="none" stroke={i === 2 ? o : "#aaa"} points={Array.from({ length: 12 }, (_, x) => `${x * 18},${40 - x * (i - 2) * 2.4 + Math.sin(x + i * 2) * 6}`).join(" ")} />)}
    </svg>
  );
}

export function Secondary() {
  return (
    <section className="section light" id="secondary" data-chapter aria-labelledby="sec">
      <div className="wrap">
        <p className="label mono" data-fade="up"><span className="n">03</span> Also built</p>
        <h2 id="sec" className="display h2" style={{ maxWidth: "15ch" }} data-fade="up">Evidence of range, with a common habit.</h2>
        <p className="lede" style={{ marginTop: 28 }} data-fade="up">Software has impact through efficiency and usability, not only through algorithmic novelty.</p>
        <div className="sec-list" style={{ marginTop: "clamp(36px,5vw,72px)" }}>
          {secondary.map((s) => (
            <div className="sec-row" key={s.key} data-fade="up">
              <div>
                <p className="mono mute">{s.kicker}</p>
                <h3 style={{ margin: "8px 0 16px" }}>{s.title}</h3>
                <MiniVisual k={s.key} />
              </div>
              <div className="st">{s.stat}<small>{s.statLabel}</small></div>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PeopleViz() {
  // one node (mentor) connected to several (students): knowledge transfer
  return (
    <svg className="people" viewBox="0 0 260 150" aria-hidden="true">
      <circle cx="30" cy="75" r="9" fill="#ff5a14" />
      {[18, 48, 78, 108, 132].map((y, i) => (
        <g key={i}>
          <path d={`M39 75 C 120 75, 120 ${y}, 200 ${y}`} fill="none" stroke="#ff5a14" strokeOpacity=".5" />
          <circle cx="205" cy={y} r="5" fill="none" stroke="#f3f2ef" />
        </g>
      ))}
    </svg>
  );
}

export function Experience() {
  return (
    <section className="section" id="experience" data-chapter aria-labelledby="ex">
      <div className="wrap">
        <p className="label mono" data-fade="up"><span className="n">04</span> Experience &amp; people</p>
        <h2 id="ex" className="display h2" style={{ maxWidth: "15ch" }} data-fade="up">Real teams, real users, and other people&apos;s progress.</h2>
        <div className="tl">
          {experience.map((e) => (
            <div className="tl-row" key={e.role + e.org} data-fade="up">
              <p className="mono orange">{e.when}</p>
              <div><h3>{e.role}</h3><p className="mute" style={{ marginTop: 6 }}>{e.org}</p></div>
              <p>{e.body}</p>
            </div>
          ))}
          <hr className="rule" />
        </div>
        <p className="label mono" style={{ marginTop: "clamp(72px,10vw,140px)" }} data-fade="up"><span className="n">04.1</span> Leadership &amp; community</p>
        <div className="lead-grid">
          {leadership.map((l) => (
            <div className="lead" key={l.role} data-fade="up">
              <p className="mono mute">{l.when}</p>
              <h4>{l.role}</h4>
              <p className="mono orange" style={{ fontSize: 11 }}>{l.org}</p>
              <p className="plain" style={{ marginTop: 10 }}>{l.plain}</p>
              <ul>{l.points.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div data-fade="scale" style={{ marginTop: 28 }}><PeopleViz /></div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section light" id="about" data-chapter aria-labelledby="ab">
      <div className="wrap">
        <p className="label mono" data-fade="up"><span className="n">05</span> About</p>
        <h2 id="ab" className="display h2" data-fade="up">Beyond the systems.</h2>
        <div className="beyond-list">
          {beyond.map((b) => (
            <div className="b-row" key={b.k} data-fade="up">
              <p className="mono mute">{b.k}</p><p className="v">{b.v}</p><p className="d">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="edu">
          <div data-fade="left">
            <p className="mono mute">IIT Bombay · CPI</p>
            <p className="cpi">{education.cpi}<small> / 10</small></p>
            <h3 style={{ marginTop: 22, fontWeight: 800, fontStretch: "108%", letterSpacing: "-0.03em", fontSize: 24, lineHeight: 1.15 }}>{education.degree}</h3>
            <p className="mute">{education.school}</p>
            <ul style={{ marginTop: 22 }}>{education.items.map((x) => <li key={x}>{x}</li>)}</ul>
            <details className="more">
              <summary className="mono">Key courses</summary>
              <div className="chips" style={{ paddingBottom: 12 }}>{education.courses.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            </details>
          </div>
          <div data-fade="right">
            <p className="mono mute" style={{ marginBottom: 14 }}>Technical skills</p>
            {skills.map((s) => (
              <div className="skills-row" key={s.g}>
                <p className="mono" style={{ color: "#c93d00" }}>{s.g}</p>
                <div className="chips">{s.items.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section orange-bg contact" id="contact" data-chapter aria-labelledby="ct">
      <div className="wrap">
        <p className="label mono" data-fade="up"><span className="n">06</span> Contact</p>
        <h2 id="ct" className="display" data-fade="up">Have a problem worth thinking deeply about?</h2>
        <p className="quote" data-fade="up">I&apos;m interested in problems that reward both rigorous thinking and the ability to build.</p>
        <div className="contact-actions" data-fade="up">
          <a className="btn" href={`mailto:${profile.email}`}>Get in touch <span className="arr">→</span></a>
          <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">Download resume</a>
        </div>
        <a className="mail" href={`mailto:${profile.email}`} data-fade="up">{profile.email}</a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer mono">
      <svg viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="1" x2="100" y2="1" stroke="#ff5a14" strokeWidth="2" /></svg>
      <span>© {new Date().getFullYear()} Krishna Agarwal</span>
      <span>Signal in → decision out.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
