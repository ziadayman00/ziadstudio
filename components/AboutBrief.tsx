"use client";

import Link from "next/link";
import Image from "next/image";
import { MotionImageReveal } from "./MotionImageReveal";

export function AboutBrief() {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-surface)]/20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Portrait column */}
          <div className="lg:col-span-4 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-normal tracking-tight text-[var(--color-foreground)] leading-tight">
              I approach design and engineering as one practice, not two.
            </h2>

            {/* Verified Portrait of Ziad */}
            <MotionImageReveal direction="up" delay={0.2}>
              <div className="relative aspect-[4/5] max-w-[280px] overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src="/assets/me.png"
                  alt="Ziad Ayman"
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover grayscale contrast-105"
                />
                <div className="absolute bottom-2 left-2 bg-[#FBFBF9]/90 px-2.5 py-1 font-mono text-[10px] text-[var(--color-muted)]">
                  ZIAD AYMAN • 2026
                </div>
              </div>
            </MotionImageReveal>
          </div>

          {/* Text column */}
          <div className="lg:col-span-8 space-y-7 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light">
            <p className="text-lg sm:text-xl text-[var(--color-foreground)] font-normal leading-snug">
              Creative Developer &amp; Designer based in Egypt. I work on web applications, interfaces, and interactive experiences — from the architecture of a backend to the spacing of a headline.
            </p>

            <div className="space-y-4 text-sm text-[var(--color-muted)] font-light max-w-2xl">
              <p>
                My background spans full-stack engineering and interface design. I use React, Next.js, and TypeScript on most projects, and I care as much about how the database is structured as how the page feels when you scroll through it.
              </p>

              <p>
                Good digital products are quiet. They get out of the way and let the content and the person using them matter. I try to build things that reflect that: considered, functional, without excess.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] underline underline-offset-4"
              >
                More about my work →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
