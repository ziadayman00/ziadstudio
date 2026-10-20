"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { Project } from "@/data/projects";

interface DraggableProjectReelProps {
  projects: Project[];
}

export function DraggableProjectReel({ projects }: DraggableProjectReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState<number>(0);
  const dragX = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const dragProgress = useTransform(dragX, (value) =>
    dragConstraint === 0 ? 0 : Math.min(1, Math.max(0, Math.abs(value) / Math.abs(dragConstraint)))
  );

  useEffect(() => {
    function calculateBounds() {
      if (trackRef.current && containerRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const maxScroll = Math.max(0, trackWidth - containerWidth);
        setDragConstraint(-maxScroll);
      }
    }

    const observer = new ResizeObserver(calculateBounds);
    if (trackRef.current) observer.observe(trackRef.current);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] block mb-1">
            EXPLORATORY STRIP
          </span>
          <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-[var(--color-foreground)]">
            Tactile Project Showcase
          </h3>
        </div>

        <div className="hidden sm:flex items-center space-x-2 font-mono text-xs text-[var(--color-muted)]">
          <span>DRAG HORIZONTALLY</span>
          <span className="w-6 h-[1px] bg-[var(--color-foreground)] inline-block" />
          <span>↔</span>
        </div>
      </div>

      {/* Draggable Viewport Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing pb-2 touch-pan-y"
        role="region"
        aria-label="Draggable project reel"
      >
        <motion.div
          ref={trackRef}
          style={{ x: dragX }}
          drag="x"
          dragDirectionLock
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={shouldReduceMotion ? 0 : 0.06}
          dragMomentum={!shouldReduceMotion}
          dragTransition={{ bounceStiffness: 420, bounceDamping: 34 }}
          className="flex space-x-6 w-max will-change-transform"
        >
          {projects.map((project, idx) => (
            <div
              key={project.slug}
              className="project-reel-item w-[260px] sm:w-[320px] lg:w-[360px] flex-shrink-0 group select-none"
            >
              <Link href={`/work/${project.slug}`} className="project-artwork-link block">
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface)]">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 260px, 360px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#FBFBF9]/90 px-2 py-0.5 font-mono text-[10px] text-[var(--color-foreground)]">
                    0{idx + 1} • {project.year}
                  </div>
                </div>

                <div className="pt-3 space-y-0.5">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-base sm:text-lg font-normal tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent-terracotta)] transition-colors">
                      {project.title}
                    </h4>
                    <span className="font-mono text-[11px] text-[var(--color-muted)]">
                      {project.categoryShort}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-1 font-light">
                    {project.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="project-reel-progress mt-4 flex items-center gap-3 font-mono text-[9px] text-[var(--color-muted)]" aria-hidden="true">
        <span>01</span>
        <div className="relative h-px flex-1 overflow-hidden bg-[var(--color-border-strong)]">
          <motion.span className="absolute inset-y-0 left-0 w-full origin-left bg-[var(--color-accent-blue)]" style={{ scaleX: dragProgress }} />
        </div>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </div>

      <div className="flex sm:hidden justify-end pt-2 font-mono text-[11px] text-[var(--color-muted)]">
        Swipe left or right to explore →
      </div>
    </div>
  );
}
