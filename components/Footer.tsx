import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { LocalTime } from "./LocalTime";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[var(--color-surface)]/30 mt-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Identity & Practice */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-mono text-sm uppercase tracking-widest text-[var(--color-foreground)] font-semibold">
                ZIAD AYMAN
              </span>
            </Link>
            <p className="text-sm text-[var(--color-muted)] max-w-sm leading-relaxed font-light">
              Creative Developer & Designer building deliberate web applications, interactive visual systems, and clean digital experiences.
            </p>
            <div className="pt-2">
              <LocalTime />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Index
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#work"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
                >
                  Project Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
                >
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
                >
                  Client Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Channels & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--color-muted)]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] underline underline-offset-4 font-mono text-xs transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                {siteConfig.contact.phoneDisplay}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 font-mono text-xs">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Metadata and Dynamic Year - No harsh top rule */}
        <div className="mt-20 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[var(--color-muted)] gap-4">
          <div>
            <span>© {currentYear} Ziad Ayman. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <span>Next.js 16 • React 19 • Motion</span>
            <a
              href="#top"
              className="hover:text-[var(--color-foreground)] transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
