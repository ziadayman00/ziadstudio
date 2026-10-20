import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { LocalTime } from "@/components/LocalTime";
import { MotionImageReveal } from "@/components/MotionImageReveal";

export const metadata: Metadata = {
  title: "About & Practice",
  description:
    "About Ziad Ayman — Creative Developer & Designer. Philosophy, engineering stack, and approach to digital experience.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Top Header */}
      <div className="pb-12 mb-16">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
          <div className="hero-entrance flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] mb-3">
            <span>ABOUT & PRACTICE</span>
            <span>•</span>
            <LocalTime />
          </div>
          <h1 className="hero-entrance hero-entrance-delay-1 text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-foreground)] max-w-4xl leading-tight">
            I design and engineer digital experiences where visual direction is inseparable from code.
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait & Snapshot Card */}
          <div className="lg:col-span-5 space-y-8">
            <MotionImageReveal direction="up" delay={0.15}>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src="/assets/me.png"
                  alt="Ziad Ayman Portrait"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale contrast-105"
                />
                <div className="absolute bottom-3 left-3 bg-[#FBFBF9]/95 px-3 py-1 font-mono text-xs text-[var(--color-foreground)]">
                  ZIAD AYMAN • CREATIVE DEVELOPER
                </div>
              </div>
            </MotionImageReveal>

            <div className="p-8 bg-[var(--color-surface)]/40 space-y-4 font-mono text-xs">
              <div className="flex justify-between pb-2">
                <span className="text-[var(--color-muted)]">LOCATION</span>
                <span className="text-[var(--color-foreground)]">Egypt (UTC+3)</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-[var(--color-muted)]">PRIMARY ROLES</span>
                <span className="text-[var(--color-foreground)]">Frontend, Creative Dev</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-[var(--color-muted)]">AVAILABILITY</span>
                <span className="text-emerald-600 font-semibold">Q4 2026 Open</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">DIRECT CONTACT</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[var(--color-foreground)] underline underline-offset-2"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Extended Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-12 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed font-light">
            <div className="space-y-6 text-lg sm:text-xl text-[var(--color-foreground)] font-normal leading-relaxed">
              <p>
                My name is Ziad Ayman. As a Creative Developer & Designer, I bridge the gap between design sensibility and frontend engineering. I build software that feels intentional in both its aesthetics and its technical implementation.
              </p>
            </div>

            <div className="space-y-4 text-base text-[var(--color-muted)]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
                The Philosophy: Quiet Craft
              </h3>
              <p>
                The contemporary web is too often flooded with decorative noise: floating shapes that serve no communicative purpose, gratuitous scroll hijacking, and repetitive card layouts. My work aims for the restraint of an editorial monograph.
              </p>
              <p>
                I believe that digital craftsmanship reveals itself in the details: typographic hierarchy, balanced proportions, instantaneous page loads, accessible contrast, and motion that clarifies spatial relationships rather than demanding applause.
              </p>
            </div>

            <div className="space-y-6 text-base text-[var(--color-muted)]">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
                Technical Stack & Disciplines
              </h3>
              <p>
                My stack centers around React 19, Next.js App Router, TypeScript, and Tailwind CSS for the frontend, paired with PostgreSQL, Prisma ORM, and NestJS for backend and data architecture. In the mobile domain, I engineer cross-platform apps using React Native and Expo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[var(--color-foreground)] pt-2">
                <div className="p-5 bg-[var(--color-surface)]/30">
                  <span className="text-[var(--color-accent-terracotta)] block mb-1">
                    [ LANGUAGES & CORE ]
                  </span>
                  TypeScript, JavaScript (ESNext), HTML5 Semantic, CSS3 Architecture, SQL.
                </div>
                <div className="p-5 bg-[var(--color-surface)]/30">
                  <span className="text-[var(--color-accent-terracotta)] block mb-1">
                    [ FRAMEWORKS ]
                  </span>
                  Next.js (App Router, Turbopack), React 19, React Native, Expo, NestJS.
                </div>
                <div className="p-5 bg-[var(--color-surface)]/30">
                  <span className="text-[var(--color-accent-terracotta)] block mb-1">
                    [ DATA & BACKEND ]
                  </span>
                  PostgreSQL, Prisma ORM, Supabase, Decimal.js, Docker, REST & Server Actions.
                </div>
                <div className="p-5 bg-[var(--color-surface)]/30">
                  <span className="text-[var(--color-accent-terracotta)] block mb-1">
                    [ MOTION & DESIGN ]
                  </span>
                  Figma, Design Tokens, CSS Transitions, Accessible Motion, UI Systems.
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center space-x-6 font-mono text-xs">
              <Link
                href="/contact"
                className="px-5 py-3 bg-[var(--color-foreground)] text-[#FBFBF9] hover:bg-neutral-800 transition-colors"
              >
                Start a Conversation →
              </Link>
              <Link
                href="/work"
                className="text-[var(--color-foreground)] underline underline-offset-4 hover:text-[var(--color-accent-terracotta)] transition-colors"
              >
                View Project Index
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
