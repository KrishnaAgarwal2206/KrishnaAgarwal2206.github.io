"use client";
import { useRef } from "react";
import { useTrackProgress } from "../lib/motion";
import { ProjectStage } from "./SectionsA";
import { projects } from "../lib/content";

/** Case-study page version of the project visual: resolves as it scrolls into view. */
export default function CaseVisual({ slug }: { slug: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useTrackProgress(ref, 80);
  const pr = projects.find((x) => x.slug === slug)!;
  return (
    <div ref={ref} style={{ minHeight: "60vh", display: "grid", alignItems: "center", maxWidth: 1000, marginInline: "auto" }}>
      <ProjectStage pr={pr} p={Math.min(1, p * 1.15)} />
    </div>
  );
}
