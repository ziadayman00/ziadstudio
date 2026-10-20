"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

interface CurvedProjectGalleryProps {
  projects: Project[];
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const wrapIndex = (value: number, length: number) =>
  ((value % length) + length) % length;

const wrapOffset = (value: number, length: number) =>
  ((value + length / 2) % length + length) % length - length / 2;

export function CurvedProjectGallery({ projects }: CurvedProjectGalleryProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const goToPositionRef = useRef<(position: number) => void>(() => undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const projectKey = projects.map((project) => project.slug).join("|");
  const activeProject = projects.length
    ? projects[wrapIndex(activeIndex, projects.length)]
    : undefined;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const proxy = proxyRef.current;
    if (!stage || !track || !proxy || projects.length === 0) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-card]"));
    const artwork = Array.from(track.querySelectorAll<HTMLElement>("[data-gallery-art]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionPreference.matches;
    let cardStep = 0;
    let draggable: Draggable | null = null;
    let intro: gsap.core.Timeline | null = null;
    let introTrigger: ScrollTrigger | null = null;
    let geometryInitialized = false;

    const renderPosition = (position: number, velocity = 0) => {
      positionRef.current = position;
      const motion = clamp(velocity / 1500, -1, 1);

      cards.forEach((card, index) => {
        const offset = wrapOffset(index - position, projects.length);
        const distance = Math.abs(offset);
        const depthCurve = Math.pow(distance, 1.35);

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: offset * cardStep,
          y: -Math.pow(distance, 1.65) * 10,
          z: -depthCurve * 82 - Math.abs(motion) * 8,
          rotationY: clamp(-offset * 23 + motion * 1.6, -64, 64),
          scale: Math.max(0.52, 1 - distance * 0.09),
          opacity: Math.max(0.26, 1 - distance * 0.18),
          zIndex: Math.round(100 - distance * 10),
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });
    };

    const settlePosition = (position: number) => {
      const snappedIndex = wrapIndex(Math.round(position), projects.length);
      positionRef.current = snappedIndex;
      gsap.set(proxy, { x: -snappedIndex * cardStep });
      draggable?.update();
      renderPosition(snappedIndex);
      setActiveIndex(snappedIndex);
    };

    const clearIntro = () => {
      introTrigger?.kill();
      intro?.kill();
      introTrigger = null;
      intro = null;
      gsap.set(artwork, { clearProps: "transform,opacity,visibility" });
    };

    const setupIntro = () => {
      clearIntro();
      if (reduceMotion || artwork.length === 0) return;

      intro = gsap.timeline({ paused: true });
      intro.fromTo(
        artwork,
        { autoAlpha: 0, y: 16, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.045,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }
      );
      introTrigger = ScrollTrigger.create({
        trigger: stage,
        start: "top 82%",
        once: true,
        onEnter: () => intro?.play(0),
      });

    };

    const setupDraggable = () => {
      draggable?.kill();
      draggable = null;

      if (projects.length < 2 || cardStep === 0) return;

      draggable = Draggable.create(proxy, {
        type: "x",
        trigger: stage,
        dragClickables: true,
        allowNativeTouchScrolling: true,
        edgeResistance: 0.82,
        inertia: !reduceMotion,
        throwResistance: 1800,
        maxDuration: 0.78,
        minDuration: 0.18,
        snap: (value) => Math.round(value / cardStep) * cardStep,
        onPress() {
          gsap.killTweensOf(proxy);
        },
        onClick(event) {
          const pointer = event as MouseEvent;
          const hitTarget = Number.isFinite(pointer.clientX)
            ? document.elementFromPoint(pointer.clientX, pointer.clientY)
            : event.target;
          if (!(hitTarget instanceof Element)) return;

          const card = hitTarget.closest<HTMLElement>("[data-gallery-card]");
          if (!card) return;

          const index = cards.indexOf(card);
          const current = Math.round(positionRef.current);
          const currentIndex = wrapIndex(current, projects.length);
          if (index < 0 || index === currentIndex) return;

          goToPositionRef.current(current + wrapOffset(index - currentIndex, projects.length));
        },
        onDrag() {
          const velocity = InertiaPlugin.getVelocity(proxy, "x") || 0;
          renderPosition(-this.x / cardStep, velocity);
        },
        onThrowUpdate() {
          const velocity = InertiaPlugin.getVelocity(proxy, "x") || 0;
          renderPosition(-this.x / cardStep, velocity);
        },
        onDragEnd() {
          if (reduceMotion || !this.isThrowing) {
            settlePosition(-this.x / cardStep);
          }
        },
        onThrowComplete() {
          settlePosition(-this.x / cardStep);
        },
      })[0];
    };

    const updateGeometry = () => {
      const width = stage.clientWidth;
      if (!width) return;

      const compact = width < 700;
      const cardWidth = compact
        ? Math.min(width - 24, Math.max(248, width * 0.76))
        : Math.min(540, Math.max(300, width * 0.39));
      cardStep = cardWidth * (compact ? 0.78 : 0.89);
      stage.style.setProperty("--gallery-card-width", `${cardWidth}px`);
      track.style.pointerEvents = "none";
      cards.forEach((card) => {
        card.style.pointerEvents = "auto";
      });
      stage.classList.add("curved-gallery-stage--enhanced");
      stage.classList.toggle("curved-gallery-stage--reduced", reduceMotion);

      gsap.set(proxy, { x: -positionRef.current * cardStep });
      setupDraggable();
      renderPosition(positionRef.current);
      if (!geometryInitialized) {
        setupIntro();
        geometryInitialized = true;
      }
    };

    const goToPosition = (target: number) => {
      const targetIndex = wrapIndex(Math.round(target), projects.length);
      const snappedPosition = Math.round(target);

      if (reduceMotion) {
        settlePosition(snappedPosition);
        return;
      }

      draggable?.tween?.kill();
      gsap.killTweensOf(proxy);
      gsap.to(proxy, {
        x: -snappedPosition * cardStep,
        duration: 0.68,
        ease: "power3.inOut",
        onUpdate: () => {
          draggable?.update();
          renderPosition(-Number(gsap.getProperty(proxy, "x")) / cardStep);
        },
        onComplete: () => settlePosition(targetIndex),
      });
    };

    goToPositionRef.current = goToPosition;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        goToPosition(Math.round(positionRef.current) + direction);
      }
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      stage.classList.toggle("curved-gallery-stage--reduced", reduceMotion);
      setupDraggable();
      if (reduceMotion) {
        gsap.killTweensOf(proxy);
        settlePosition(positionRef.current);
      }
      setupIntro();
    };

    const context = gsap.context(() => {
      updateGeometry();
    }, stage);

    const resizeObserver = new ResizeObserver(updateGeometry);
    resizeObserver.observe(stage);
    stage.addEventListener("keydown", handleKeyDown);
    motionPreference.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      resizeObserver.disconnect();
      stage.removeEventListener("keydown", handleKeyDown);
      motionPreference.removeEventListener("change", handleMotionPreferenceChange);
      draggable?.kill();
      clearIntro();
      context.revert();
      gsap.set(cards, { clearProps: "transform,opacity,zIndex" });
      goToPositionRef.current = () => undefined;
      stage.classList.remove(
        "curved-gallery-stage--enhanced",
        "curved-gallery-stage--reduced"
      );
      stage.style.removeProperty("--gallery-card-width");
      track.style.removeProperty("pointer-events");
      cards.forEach((card) => card.style.removeProperty("pointer-events"));
    };
  }, [projectKey, projects.length]);

  if (projects.length === 0 || !activeProject) return null;

  const goToRelativeProject = (direction: number) => {
    goToPositionRef.current(Math.round(positionRef.current) + direction);
  };

  return (
    <div className="curved-project-gallery">
      <div
        ref={stageRef}
        className="curved-gallery-stage"
        role="region"
        aria-label="Selected project gallery"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        <div className="curved-gallery-track" ref={trackRef}>
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const content = (
              <span className="curved-gallery-art" data-gallery-art>
                <Image
                  src={project.heroImage}
                  alt={`${project.title} project artwork`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 699px) 76vw, 39vw"
                  className="curved-gallery-image"
                />
              </span>
            );
            const label = `${project.title}, ${index + 1} of ${projects.length}. ${isActive ? "Open case study." : "Select to center."}`;
            return (
              <div
                key={project.slug}
                className="curved-gallery-card"
                data-gallery-card
                aria-label={label}
                aria-current={isActive ? "true" : undefined}
                role="group"
              >
                {isActive ? (
                  <Link
                    href={`/work/${project.slug}`}
                    className="curved-gallery-card-action"
                    aria-label={label}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="curved-gallery-card-action curved-gallery-card--selectable"
                    aria-label={label}
                    tabIndex={-1}
                    onClick={(event: ReactMouseEvent<HTMLButtonElement>) => {
                      if (event.detail !== 0) return;
                      const current = Math.round(positionRef.current);
                      const currentIndex = wrapIndex(current, projects.length);
                      goToPositionRef.current(
                        current + wrapOffset(index - currentIndex, projects.length)
                      );
                    }}
                  >
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div ref={proxyRef} className="curved-gallery-drag-proxy" aria-hidden="true" />
      </div>

      <div className="curved-gallery-caption">
        <button
          type="button"
          className="curved-gallery-control"
          aria-label="Previous project"
          onClick={() => goToRelativeProject(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="curved-gallery-caption-copy" aria-live="polite" aria-atomic="true">
          <div className="curved-gallery-meta">
            <span>{activeProject.categoryShort}</span>
            <span aria-hidden="true">/</span>
            <span>{activeProject.year}</span>
            <span aria-hidden="true">/</span>
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <Link href={`/work/${activeProject.slug}`} className="curved-gallery-title-link">
            <h3>{activeProject.title}</h3>
            <span className="curved-gallery-open" aria-hidden="true">
              ↗
            </span>
          </Link>
          <p>{activeProject.subtitle}</p>
        </div>

        <button
          type="button"
          className="curved-gallery-control"
          aria-label="Next project"
          onClick={() => goToRelativeProject(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="curved-gallery-instructions">
        Drag to explore <span aria-hidden="true">·</span> Use ← and → keys
      </p>
      <span className="sr-only" aria-live="polite">
        {activeProject.title}, {activeIndex + 1} of {projects.length}
      </span>
    </div>
  );
}
