"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { LocalTime } from "@/components/LocalTime";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function Hero() {
  const stageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let disposeMotion: (() => void) | undefined;
    const setupFrame = window.requestAnimationFrame(() => {
      if (stageRef.current !== stage) return;

      const motionMedia = gsap.matchMedia(stage);
      motionMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanupListeners: Array<() => void> = [];
        let split: SplitText | undefined;

        const context = gsap.context(() => {
          const headline = stage.querySelector<HTMLElement>(".hero-title");
          if (!headline) return;

          const masthead = stage.querySelector<HTMLElement>(".hero-masthead");
          const eyebrow = stage.querySelector<HTMLElement>(".hero-kicker");
          const marker = stage.querySelector<HTMLElement>(".hero-kicker-mark");
          const supportCopy = stage.querySelector<HTMLElement>("[data-hero-copy]");
          const statusLabel = stage.querySelector<HTMLElement>("[data-hero-status-label]");
          const status = stage.querySelector<HTMLElement>("[data-hero-status]");
          const actionGroup = stage.querySelector<HTMLElement>("[data-hero-actions]");
          const buttons = gsap.utils.toArray<HTMLAnchorElement>("[data-hero-cta]", stage);
          const headerContent = stage
            .closest("main")
            ?.previousElementSibling?.querySelector<HTMLElement>(".header-glass-content");
          const headerItems = headerContent ? Array.from(headerContent.children) : [];
          const entrance = gsap.timeline();

          // Keep the server-rendered copy visible. These short position-only moves
          // add rhythm without making the Hero disappear while hydration catches up.
          if (headerItems.length) {
            entrance.fromTo(
              headerItems,
              { y: -4 },
              { y: 0, duration: 0.38, stagger: 0.045, ease: "power3.out", clearProps: "transform" },
              0
            );
          }

          if (masthead) {
            entrance.fromTo(
              masthead,
              { y: 8 },
              { y: 0, duration: 0.48, ease: "power3.out", clearProps: "transform" },
              0.08
            );
          }

          if (eyebrow) {
            entrance.fromTo(
              eyebrow,
              { y: 8 },
              { y: 0, duration: 0.48, ease: "power3.out", clearProps: "transform" },
              0.16
            );
          }

          if (marker) {
            entrance
              .fromTo(
                marker,
                { scaleX: 0.7, scaleY: 0.8 },
                { scaleX: 3, scaleY: 0.72, duration: 0.22, ease: "power2.out" },
                0.18
              )
              .to(marker, { scaleX: 1, scaleY: 1, duration: 0.24, ease: "power3.out" }, 0.4);
          }

          if (supportCopy) {
            entrance.fromTo(
              supportCopy,
              { y: 12 },
              { y: 0, duration: 0.54, ease: "power3.out", clearProps: "transform" },
              0.84
            );
          }

          if (statusLabel) {
            entrance.fromTo(
              statusLabel,
              { y: 7 },
              { y: 0, duration: 0.4, ease: "power3.out", clearProps: "transform" },
              0.9
            );
          }

          if (status) {
            entrance.fromTo(
              status,
              { y: 7 },
              { y: 0, duration: 0.42, ease: "power3.out", clearProps: "transform" },
              0.96
            );
          }

          if (buttons.length) {
            entrance.fromTo(
              buttons,
              { y: 8 },
              {
                y: 0,
                duration: 0.42,
                stagger: 0.085,
                ease: "power3.out",
                clearProps: "transform",
              },
              1.02
            );
          }

          try {
            split = SplitText.create(headline, {
              type: "lines",
              linesClass: "hero-title-line",
              mask: "lines",
              autoSplit: true,
              onSplit: (instance) => {
                // SplitText may call onSplit again when fonts load or the line
                // wrapping changes. Return only this line animation so its playhead
                // is carried over without replaying the rest of the Hero.
                const lineEntrance = gsap.timeline({ delay: 0.24 });
                lineEntrance.fromTo(
                  instance.lines,
                  { yPercent: 68, filter: "blur(1.4px)" },
                  {
                    yPercent: 0,
                    filter: "blur(0px)",
                    duration: 0.82,
                    stagger: 0.085,
                    ease: "power4.out",
                    clearProps: "transform,filter",
                  }
                );
                return lineEntrance;
              },
            });
          } catch {
            // Keep the server-rendered headline intact if text splitting is unavailable.
            entrance.fromTo(
              headline,
              { y: 14, filter: "blur(1px)" },
              { y: 0, filter: "blur(0px)", duration: 0.82, ease: "power4.out", clearProps: "transform,filter" },
              0.24
            );
          }

          const exitTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "bottom top",
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          });

          if (masthead) exitTimeline.to(masthead, { y: -7, duration: 1, ease: "none" }, 0);
          if (eyebrow) exitTimeline.to(eyebrow, { y: -11, duration: 1, ease: "none" }, 0);
          exitTimeline.to(headline, { y: -28, duration: 1, ease: "none" }, 0);
          if (supportCopy) exitTimeline.to(supportCopy, { y: -18, duration: 1, ease: "none" }, 0);
          if (status) exitTimeline.to(status, { y: -20, duration: 1, ease: "none" }, 0);
          if (actionGroup) exitTimeline.to(actionGroup, { y: -16, duration: 1, ease: "none" }, 0);

          const finePointer = window.matchMedia("(pointer: fine)");
          if (finePointer.matches && supportCopy) {
            const moveHeadline = gsap.quickTo(headline, "x", {
              duration: 0.8,
              ease: "power3.out",
            });
            const moveCopy = gsap.quickTo(supportCopy, "x", {
              duration: 0.8,
              ease: "power3.out",
            });

            const handlePointerMove = (event: PointerEvent) => {
              if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
              const offset = event.clientX / window.innerWidth - 0.5;
              moveHeadline(offset * 5);
              moveCopy(offset * -2.5);
            };

            const resetPointer = () => {
              moveHeadline(0);
              moveCopy(0);
            };

            stage.addEventListener("pointermove", handlePointerMove, { passive: true });
            stage.addEventListener("pointerleave", resetPointer);
            cleanupListeners.push(() => {
              stage.removeEventListener("pointermove", handlePointerMove);
              stage.removeEventListener("pointerleave", resetPointer);
              gsap.killTweensOf([headline, supportCopy]);
            });
          }

          buttons.forEach((button) => {
            const arrow = button.querySelector<HTMLElement>("[data-hero-arrow]");
            if (!arrow) return;

            const moveX = gsap.quickTo(arrow, "x", { duration: 0.22, ease: "power3.out" });
            const moveY = gsap.quickTo(arrow, "y", { duration: 0.22, ease: "power3.out" });
            const isPrimary = button.hasAttribute("data-hero-cta-primary");
            const engage = () => {
              moveX(isPrimary ? 0 : 3);
              moveY(isPrimary ? 2 : 0);
            };
            const reset = () => {
              moveX(0);
              moveY(0);
            };

            button.addEventListener("focus", engage);
            button.addEventListener("blur", reset);
            if (finePointer.matches) {
              button.addEventListener("pointerenter", engage);
              button.addEventListener("pointerleave", reset);
            }

            cleanupListeners.push(() => {
              button.removeEventListener("focus", engage);
              button.removeEventListener("blur", reset);
              button.removeEventListener("pointerenter", engage);
              button.removeEventListener("pointerleave", reset);
              gsap.killTweensOf(arrow);
            });
          });
        }, stage);

        return () => {
          cleanupListeners.forEach((cleanup) => cleanup());
          split?.revert();
          context.revert();
        };
      });

      disposeMotion = () => motionMedia.revert();
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      disposeMotion?.();
    };
  }, []);

  return (
    <section
      ref={stageRef}
      id="top"
      className="hero-stage mx-auto flex min-h-svh w-full max-w-[1440px] flex-col justify-center px-6 py-32 sm:px-8 lg:px-32"
      aria-labelledby="hero-title"
    >
      <div className="hero-masthead mb-10 flex items-center justify-between gap-6 font-mono text-[10px] uppercase text-[var(--foreground-muted)]">
        <div className="flex items-center gap-3">
          <span className="hero-kicker-mark" aria-hidden="true" />
          <span>
            Portfolio &amp; archive <span className="mx-2 text-[var(--foreground-subtle)]">/</span> 2024 — 2026
          </span>
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          <span>Based in Egypt</span>
          <span aria-hidden="true">/</span>
          <LocalTime />
        </div>
      </div>

      <p className="hero-kicker mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--foreground)] sm:mb-5">
        CREATIVE DEVELOPER &amp; DESIGNER
      </p>

      <h1
        id="hero-title"
        className="hero-title max-w-[1200px] text-[clamp(2.35rem,3.25vw,4rem)] font-normal leading-[1.08] tracking-[-0.045em] text-[var(--foreground)]"
      >
        I design and build digital experiences that make an impression.
      </h1>

      <div className="hero-support mt-11 grid gap-8 border-t border-[var(--border-hairline)] pt-5 sm:mt-12 sm:grid-cols-[minmax(0,1fr)_320px] sm:gap-12">
        <p data-hero-copy className="max-w-[700px] text-sm leading-[1.65] text-[var(--foreground-muted)]">
          I’m Ziad Ayman. I turn ideas into thoughtful websites and digital products that look distinctive,
          feel intuitive to use, and work beautifully.
        </p>

        <div data-hero-actions className="flex flex-col items-start gap-2.5">
          <div
            data-hero-status-label
            className="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--foreground-muted)]"
          >
            Current status
          </div>
          <div
            data-hero-status
            className="mb-2 flex items-center gap-2 font-mono text-[11px] text-[var(--foreground)]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            AVAILABLE FOR SELECT PROJECTS
          </div>
          <Link
            href="#work"
            data-hero-cta
            data-hero-cta-primary
            className="hero-cta hero-cta-primary flex min-h-10 w-full items-center justify-between bg-[var(--foreground)] px-4 font-mono text-[11px] text-[var(--background)] hover:bg-neutral-800"
          >
            <span>Explore selected work</span>
            <span data-hero-arrow className="inline-block" aria-hidden="true">↓</span>
          </Link>
          <Link
            href="/contact"
            data-hero-cta
            className="hero-cta flex min-h-10 w-full items-center justify-between border border-[var(--border-strong)] px-4 font-mono text-[11px] text-[var(--foreground)]"
          >
            <span>Let’s discuss your project</span>
            <span data-hero-arrow className="inline-block" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
