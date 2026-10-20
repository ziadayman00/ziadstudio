import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectIndex } from "@/components/ProjectIndex";

export const metadata: Metadata = {
  title: "Complete Project Archive",
  description:
    "Curated index of all digital products, interactive web experiences, and engineering case studies by Ziad Ayman.",
};

export default function WorkArchivePage() {
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32 pt-12 pb-4">
        <span className="hero-entrance font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] block mb-2">
          ARCHIVE & REPOSITORY
        </span>
        <h1 className="hero-entrance hero-entrance-delay-1 text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-foreground)]">
          Complete Work Index
        </h1>
        <p className="text-lg text-[var(--color-muted)] max-w-2xl mt-4 font-light">
          A comprehensive catalogue of web applications, mobile architectures, and editorial design projects spanning 2024 to 2026.
        </p>
      </div>

      <ProjectIndex projects={projects} />
    </div>
  );
}
