import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../../components/SiteHeader";
import ScrollFx from "../../../components/ScrollFx";
import CaseVisual from "../../../components/CaseVisual";
import { Footer } from "../../../components/SectionsB";
import { projects } from "../../../lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Krishna Agarwal`, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const rows: [string, string, React.ReactNode][] = [
    ["01", "The problem", <p key="a">{p.problem}</p>],
    ["02", "My role", <p key="b">{p.role}</p>],
    ["03", "The approach", <ul key="c">{p.approach.map((x) => <li key={x}>{x}</li>)}</ul>],
    ["04", "The interesting decision", <p key="d">{p.decision}</p>],
    ["05", "The evidence", <ul key="e">{p.evidence.map((x) => <li key={x}>{x}</li>)}</ul>],
    ["06", "Limitations", <ul key="f">{p.limits.map((x) => <li key={x}>{x}</li>)}</ul>],
    ["07", "The outcome", <p key="g">{p.outcome}</p>],
  ];
  return (
    <>
      <SiteHeader home={false} />
      <main id="main">
        <header className="cs-hero wrap">
          <p className="mono"><Link href="/#work" className="tlink mute">← Selected work</Link></p>
          <p className="mono orange" style={{ marginTop: 28 }}>{p.index} / {p.title}</p>
          <h1 className="display" style={{ marginTop: 16 }}>{p.headline}</h1>
          <p className="lede" style={{ marginTop: 28 }}>{p.summary}</p>
          <div className="big"><b>{p.result.value}</b><span>{p.result.label}</span></div>
          <div className="cs-meta mono"><span>{p.org}</span><span>{p.period}</span><span>{p.tags.join(" · ")}</span></div>
        </header>
        <div className="wrap" data-fade="scale" data-keep><CaseVisual slug={p.slug} /></div>
        {p.disclaimer && <div className="wrap" style={{ marginTop: 18 }}><p className="notice">{p.disclaimer}</p></div>}
        <div className="wrap" style={{ marginTop: 56 }}>
          {rows.map(([n, h, body]) => (
            <section className="cs-grid" key={n} data-fade="up">
              <h2><span className="mono">{n}</span>{h}</h2>
              <div>{body}</div>
            </section>
          ))}
          <nav className="cs-nav" aria-label="Case studies">
            <Link className="btn ghost" href="/#work">← All work</Link>
            <Link className="btn" href={`/work/${next.slug}`}>Next: {next.title} <span className="arr">→</span></Link>
          </nav>
        </div>
      </main>
      <Footer />
      <ScrollFx />
    </>
  );
}
