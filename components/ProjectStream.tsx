"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

function resetStreamMotion(stage: HTMLElement) {
  const targets = stage.querySelectorAll<HTMLElement>(
    "[data-project-card], [data-project-visual], [data-project-copy], [data-project-title], [data-project-details]"
  );

  targets.forEach((element) => {
    element.style.removeProperty("opacity");
    element.style.removeProperty("visibility");
    element.style.removeProperty("transform");
    element.style.removeProperty("clip-path");
  });

  const counter = stage.querySelector<HTMLElement>("[data-project-counter]");
  const progress = stage.querySelector<HTMLElement>("[data-project-progress]");
  if (counter) counter.textContent = "01";
  if (progress) progress.style.transform = "scaleX(0)";
}

interface ProjectStreamProps {
  projects: Project[];
}

export function ProjectStream({ projects }: ProjectStreamProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const projectKey = projects.map((project) => project.slug).join("|");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || projects.length === 0) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", stage);
      if (cards.length < 2) return;

      stage.classList.add("project-stream-stage--pinned");

      const context = gsap.context(() => {
        const getPart = (card: HTMLElement, selector: string) =>
          card.querySelector<HTMLElement>(selector);
        const counter = stage.querySelector<HTMLElement>("[data-project-counter]");
        const progress = stage.querySelector<HTMLElement>("[data-project-progress]");

        gsap.set(cards, { autoAlpha: 0, scale: 0.985 });
        gsap.set(cards[0], { autoAlpha: 1, scale: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            pin: stage,
            start: "top 16%",
            end: () => `+=${(cards.length - 1 + 0.55) * window.innerHeight}`,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const active = Math.min(cards.length, Math.floor(self.progress * (cards.length - 1)) + 1);

              if (counter) counter.textContent = String(active).padStart(2, "0");
              if (progress) progress.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        cards.slice(1).forEach((card, offset) => {
          const index = offset + 1;
          const previous = cards[index - 1];
          const at = index - 0.12;
          const copy = getPart(card, "[data-project-copy]");
          const title = getPart(card, "[data-project-title]");
          const details = card.querySelectorAll<HTMLElement>("[data-project-details]");
          const visual = getPart(card, "[data-project-visual]");

          timeline.to(previous, { autoAlpha: 0, scale: 0.98, duration: 0.46, ease: "power2.in" }, at);
          timeline.fromTo(
            card,
            { autoAlpha: 0, scale: 1.015 },
            { autoAlpha: 1, scale: 1, duration: 0.52, ease: "power3.out" },
            at
          );

          if (visual) {
            timeline.fromTo(
              visual,
              {
                clipPath: index % 2 === 0 ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)",
                scale: 1.08,
              },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.62, ease: "power2.out" },
              at
            );
          }
          if (copy) {
            timeline.fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" }, at + 0.1);
          }
          if (title) {
            timeline.fromTo(title, { yPercent: 110, rotateX: -9 }, { yPercent: 0, rotateX: 0, duration: 0.5, ease: "power3.out" }, at + 0.13);
          }
          if (details.length > 0) {
            timeline.fromTo(details, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.07, ease: "power2.out" }, at + 0.24);
          }
        });
      }, stage);

      return () => {
        context.revert();
        stage.classList.remove("project-stream-stage--pinned");
        resetStreamMotion(stage);
      };
    });

    media.add("(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", stage);
      const context = gsap.context(() => {
        cards.forEach((card) => {
          const visual = card.querySelector<HTMLElement>("[data-project-visual]");
          const copy = card.querySelector<HTMLElement>("[data-project-copy]");

          if (visual) {
            gsap.fromTo(
              visual,
              { clipPath: "inset(8% 5% 8% 0%)", scale: 1.04 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                ease: "none",
                scrollTrigger: { trigger: card, start: "top 88%", end: "center 58%", scrub: 0.5 },
              }
            );
          }
          if (copy) {
            gsap.fromTo(
              copy,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "none",
                scrollTrigger: { trigger: card, start: "top 86%", end: "center 62%", scrub: 0.45 },
              }
            );
          }
        });
      }, stage);

      return () => {
        context.revert();
        resetStreamMotion(stage);
      };
    });

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", stage);
      const context = gsap.context(() => {
        cards.forEach((card) => {
          const copy = card.querySelector<HTMLElement>("[data-project-copy]");

          if (copy) {
            gsap.from(copy, {
              autoAlpha: 0,
              y: 14,
              duration: 0.55,
              ease: "power2.out",
              immediateRender: false,
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      }, stage);

      return () => {
        context.revert();
        resetStreamMotion(stage);
      };
    });

    return () => media.revert();
  }, [projectKey, projects.length]);

  if (projects.length === 0) return null;

  return (
    <div className="project-stream" aria-label="Featured project sequence">
      <div ref={stageRef} className="project-stream-stage" data-project-stage>
        <div className="project-stream-readout font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
          <span>Selected sequence</span>
          <span className="project-stream-readout-count">
            <span data-project-counter>{String(1).padStart(2, "0")}</span>
            <span aria-hidden="true"> / </span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </span>
        </div>

        <div className="project-stream-cards">
          {projects.map((project, index) => (
            <article className="project-stream-card" data-project-card key={project.slug} aria-labelledby={`project-stream-title-${project.slug}`}>
              <div className="project-stream-copy" data-project-copy>
                <div className="project-stream-meta font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]" data-project-details>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.categoryShort}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.year}</span>
                </div>

                <div className="project-stream-heading-mask">
                  <h3 id={`project-stream-title-${project.slug}`} className="project-stream-title" data-project-title>
                    {project.title}
                  </h3>
                </div>

                <p className="project-stream-subtitle">{project.subtitle}</p>
                <p className="project-stream-summary" data-project-details>{project.summary}</p>

                <div className="project-stream-tags" data-project-details>
                  {project.tech.slice(0, 3).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <Link href={`/work/${project.slug}`} className="project-stream-link" data-project-details>
                  Explore project <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <Link href={`/work/${project.slug}`} className="project-stream-visual-link" aria-label={`Open ${project.title} case study`}>
                <div className="project-stream-visual" data-project-visual>
                  <Image
                    src={project.heroImage}
                    alt={`${project.title} project artwork`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) 100vw, (max-width: 1200px) 55vw, 760px"
                    className="project-stream-image"
                  />
                  <span className="project-stream-art-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-stream-art-caption font-mono text-[9px] uppercase tracking-[0.12em]">
                    {project.categoryShort}<span aria-hidden="true"> · </span>{project.year}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="project-stream-progress" aria-hidden="true">
          <div className="project-stream-progress-track">
            <span data-project-progress />
          </div>
          <span>SCROLL TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
}
