import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { ContactSection } from "@/components/ContactSection";
import { LocalTime } from "@/components/LocalTime";

export const metadata: Metadata = {
  title: "Contact & Commissions",
  description:
    "Direct contact channel for Ziad Ayman. Inquire regarding web development, frontend engineering, or design collaboration.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Page Header */}
      <div className="pb-12 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
          <div className="hero-entrance flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] mb-3">
            <span>GET IN TOUCH</span>
            <span>•</span>
            <LocalTime />
          </div>
          <h1 className="hero-entrance hero-entrance-delay-1 text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-foreground)] max-w-4xl leading-tight">
            Initiate a project or discuss an engineering engagement.
          </h1>
        </div>
      </div>

      {/* Main Contact Section */}
      <ContactSection />

      {/* Additional Details & Social Grid - Open, breathing cards without harsh lines */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
          <div className="p-8 bg-[var(--color-surface)]/40 space-y-2">
            <span className="text-[var(--color-muted)] uppercase block">
              Direct Mailbox
            </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm text-[var(--color-foreground)] font-semibold underline underline-offset-4 hover:text-[var(--color-accent-terracotta)] transition-colors block"
            >
              {siteConfig.contact.email}
            </a>
            <p className="text-[var(--color-muted)] text-[11px] pt-1 font-light">
              Guaranteed response within 24–48 hours for verified project inquiries.
            </p>
          </div>

          <div className="p-8 bg-[var(--color-surface)]/40 space-y-2">
            <span className="text-[var(--color-muted)] uppercase block">
              Direct Telephone / WhatsApp
            </span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
              className="text-sm text-[var(--color-foreground)] font-semibold underline underline-offset-4 hover:text-[var(--color-accent-terracotta)] transition-colors block"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <p className="text-[var(--color-muted)] text-[11px] pt-1 font-light">
              Available Sunday through Thursday, 9:00 AM – 6:00 PM (GMT+3).
            </p>
          </div>

          <div className="p-8 bg-[var(--color-surface)]/40 space-y-2">
            <span className="text-[var(--color-muted)] uppercase block">
              Verified Social Profiles
            </span>
            <div className="space-y-1 pt-1">
              {siteConfig.socials.map((s) => (
                <div key={s.name} className="flex justify-between">
                  <span className="text-[var(--color-muted)]">{s.name}</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] underline underline-offset-2"
                  >
                    {s.handle} ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
