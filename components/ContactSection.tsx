"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/data/site-config";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] mb-3">
          <span>03 / CLIENT CONVERSION & INQUIRIES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Inquiry Pitch */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-normal tracking-tight text-[var(--color-foreground)] leading-snug">
              Have a product to build or an interactive experience to craft? Let’s collaborate.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light max-w-xl">
              I partner with founders, design studios, and engineering teams to design and build refined web experiences. Whether you need an end-to-end web application, an art-directed marketing presence, or complex frontend motion engineering, I am available for select commissions.
            </p>

            {/* Direct Email Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Project%20Inquiry%20via%20Portfolio`}
                className="group inline-flex items-center space-x-3 px-5 py-3.5 bg-[var(--color-foreground)] text-[#FBFBF9] hover:bg-neutral-800 transition-colors font-mono text-xs uppercase tracking-wider"
              >
                <span>Initiate Conversation</span>
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center space-x-2 px-4 py-3.5 border border-[var(--color-border-strong)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-colors font-mono text-xs"
              >
                <span>{copied ? "✓ Email Copied to Clipboard" : "Copy Email Address"}</span>
              </motion.button>
            </div>

            <div className="pt-1 font-mono text-xs text-[var(--color-muted)]">
              Direct inbox:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[var(--color-foreground)] underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Scope of Services */}
          <div className="lg:col-span-5 bg-[var(--color-surface)]/30 p-7 space-y-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]">
              Credible Capabilities & Offerings
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-muted)]">
              <li className="space-y-0.5">
                <span className="text-[var(--color-foreground)] font-medium block">
                  01. Website & Web App Engineering
                </span>
                <p className="text-xs text-[var(--color-muted)] font-light">
                  Production-grade Next.js, React 19, TypeScript applications, modular APIs, PostgreSQL database architecture.
                </p>
              </li>

              <li className="space-y-0.5">
                <span className="text-[var(--color-foreground)] font-medium block">
                  02. Creative & Motion Experiences
                </span>
                <p className="text-xs text-[var(--color-muted)] font-light">
                  Editorial digital publications, scroll-driven interactions, fluid typography, smooth state transitions.
                </p>
              </li>

              <li className="space-y-0.5">
                <span className="text-[var(--color-foreground)] font-medium block">
                  03. UI/UX Design & Design Systems
                </span>
                <p className="text-xs text-[var(--color-muted)] font-light">
                  Custom design tokens, accessible component primitives, responsive layouts, high-fidelity interactive prototypes.
                </p>
              </li>

              <li className="space-y-0.5">
                <span className="text-[var(--color-foreground)] font-medium block">
                  04. Mobile App Development
                </span>
                <p className="text-xs text-[var(--color-muted)] font-light">
                  React Native and Expo applications with clean backend integration and offline-ready architectures.
                </p>
              </li>
            </ul>

            <div className="pt-3 text-[11px] font-mono text-[var(--color-muted)] flex items-center justify-between">
              <span>Timezone: Africa/Cairo (UTC+3)</span>
              <span>Remote Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
