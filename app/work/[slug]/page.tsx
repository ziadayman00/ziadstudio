import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { projects, getProjectBySlug } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";
import { NextProjectNav } from "@/components/NextProjectNav";
import { MotionImageReveal } from "@/components/MotionImageReveal";
import { ScrollParallaxImage } from "@/components/ScrollParallaxImage";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Ziad Ayman`,
      description: project.summary,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  return (
    <Suspense
      fallback={
        <div
          className="mx-auto min-h-[70vh] max-w-[1440px] px-6 pt-28 sm:px-8 lg:px-32"
          role="status"
          aria-live="polite"
        >
          Opening project…
        </div>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectNumber = String(projects.findIndex((item) => item.slug === project.slug) + 1).padStart(2, "0");

  return (
    <article className={`case-study case-study-${project.slug} pt-28 pb-20`}>
      {/* Top Breadcrumb & Metadata */}
      <div className="pb-6 mb-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[var(--color-muted)]">
          <div className="flex items-center space-x-3">
            <Link
              href="/#work"
              className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
            >
              ← Back to Selected Work
            </Link>
            <span className="text-[var(--color-subtle)]">/</span>
            <span>{project.categoryShort}</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>YEAR: {project.year}</span>
            <span>STATUS: {project.status}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        {/* Project Header - Balanced Scale */}
        <header className="case-study-heading mb-12">
          <div>
            <div className="hero-entrance mb-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-accent-terracotta)]">
              Case Study / {project.category}
            </div>
            <h1 className="case-study-title hero-entrance hero-entrance-delay-1 font-normal text-[var(--color-foreground)]">
              {project.title}
            </h1>
            <p className="hero-entrance hero-entrance-delay-2 mt-4 max-w-2xl text-lg sm:text-xl text-[var(--color-muted)] font-light leading-relaxed">
              {project.subtitle}
            </p>
          </div>
          <div className="case-study-intro-copy hero-entrance hero-entrance-delay-3 pb-1">
            <div className="mb-3 flex items-center justify-between border-b border-[var(--color-border-strong)] pb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
              <span>Project {projectNumber} / {String(projects.length).padStart(2, "0")}</span>
              <span>{project.year}</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-muted)] font-light">
              {project.summary}
            </p>
          </div>
        </header>

        {/* Hero Visual Moment with Motion Reveal and subtle Scroll Parallax */}
        <MotionImageReveal direction="up" delay={0.15} className="case-study-hero-media mb-14">
            <ScrollParallaxImage
              src={project.heroImage}
              alt={project.slug === "flowsy" ? "Flowsy Safe-to-Spend system diagram" : `${project.title} interface preview`}
              aspectRatio="aspect-[16/10]"
              intensity="low"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full"
            />
        </MotionImageReveal>

        {/* Project Specification Data Strip */}
        <ScrollReveal variant="drift" className="case-study-specifications mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[var(--color-muted)] uppercase block text-[11px]">My Role</span>
            <span className="text-[var(--color-foreground)] font-medium block">
              {project.role}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--color-muted)] uppercase block text-[11px]">Timeline</span>
            <span className="text-[var(--color-foreground)] font-medium block">
              {project.year}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--color-muted)] uppercase block text-[11px]">Discipline</span>
            <span className="text-[var(--color-foreground)] font-medium block">
              {project.category}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--color-muted)] uppercase block text-[11px]">Live Access</span>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] underline underline-offset-4 font-semibold"
                >
                  Visit Live Site ↗
                </a>
              ) : (
                <span className="text-[var(--color-muted)]">Local / Internal</span>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] underline underline-offset-4"
                >
                  Repository ↗
                </a>
              )}
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Editorial Content Breakdown */}
        <ScrollReveal variant="soft" className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Context & Solution Story */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-2.5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                [ 01. CONTEXT & PROBLEM ]
              </h3>
              <p className="text-base sm:text-lg text-[var(--color-foreground)] leading-relaxed font-normal max-w-2xl">
                {project.context}
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                [ 02. ARCHITECTURE & STRATEGY ]
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light max-w-2xl">
                {project.approach}
              </p>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                [ 03. TECHNICAL CHALLENGE & RESOLUTION ]
              </h3>
              <div className="p-5 bg-[var(--color-surface)]/50 space-y-2 max-w-2xl">
                <p className="font-mono text-xs text-[var(--color-foreground)] font-semibold">
                  CHALLENGE: {project.challenge}
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-light">
                  SOLUTION: {project.solution}
                </p>
              </div>
            </div>

            {/* Feature Implementation Checklist */}
            <div className="space-y-3 pt-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
                [ 04. CORE DELIVERABLES & FEATURES ]
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[var(--color-foreground)]">
                {project.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start space-x-2.5 p-3 bg-[var(--color-surface)]/25 font-light"
                  >
                    <span className="text-[var(--color-accent-terracotta)] font-mono">
                      +
                    </span>
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Sidebar */}
          <div className="case-study-sidebar lg:sticky lg:top-28 lg:col-span-4 space-y-6">
            {/* Tech Stack */}
            <div className="p-5 bg-[var(--color-surface)]/30 space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 bg-[#FBFBF9] text-[var(--color-foreground)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="p-5 bg-[var(--color-surface)]/30 space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
                Responsibilities
              </h4>
              <ul className="space-y-1.5 text-xs text-[var(--color-muted)] font-light">
                {project.responsibilities.map((resp) => (
                  <li key={resp} className="flex items-start space-x-2">
                    <span className="text-[var(--color-foreground)] font-mono">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics if available */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-5 bg-[var(--color-surface)]/30 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
                  Project Indicators
                </h4>
                <div className="space-y-2.5 font-mono">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between text-xs pb-1"
                    >
                      <span className="text-[var(--color-muted)]">{m.label}</span>
                      <span className="text-[var(--color-foreground)] font-medium">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </ScrollReveal>

        {/* Gallery Sequences */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="pt-8 mb-20">
            <div className="max-w-2xl mb-6 space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)]">
                Visual Documentation
              </span>
              <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[var(--color-foreground)]">
                Interface Sequencing & Key Screens
              </h3>
            </div>
            <ProjectGallery images={project.galleryImages} title={project.title} />
          </div>
        )}
      </div>

      {/* Next / Previous Project Navigation */}
      <NextProjectNav currentProject={project} allProjects={projects} />
    </article>
  );
}
