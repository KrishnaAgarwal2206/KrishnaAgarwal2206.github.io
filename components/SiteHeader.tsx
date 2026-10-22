"use client";
import { useEffect, useRef, useState } from "react";
import { nav } from "../lib/content";

export default function SiteHeader({ home = true }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!home) return;
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), openRef.current?.focus());
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const prefix = home ? "" : "/";
  return (
    <>
      <header className="header">
        <a href={home ? "#top" : "/"} className="brand" aria-label="Krishna Agarwal, home">
          Krishna Agarwal<b>.</b>
        </a>
        <nav className="nav mono" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={prefix + n.href} aria-current={active === n.href.slice(1) ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <button ref={openRef} className="menu-btn mono" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button>
      </header>
      <div className={"sheet" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button ref={closeRef} className="close mono" onClick={() => { setOpen(false); openRef.current?.focus(); }} tabIndex={open ? 0 : -1}>Close</button>
        {nav.map((n) => (
          <a key={n.href} href={prefix + n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
      </div>
    </>
  );
}
