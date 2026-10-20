"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site-config";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const mobileMenuOpen = menuOpenPath === pathname;

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Selected Work", href: "/#work" },
    { label: "Archive", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "header-glass-scrolled"
            : "header-glass"
        }`}
      >
        <div className="header-glass-content max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32 h-[72px] flex items-center justify-between">
          {/* Personal Identity / Wordmark */}
          <Link
            href="/"
            className="group flex min-h-11 items-center justify-center rounded-sm focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <Image
              src="/logo.svg"
              alt="Ziad Ayman"
              width={72}
              height={39}
              priority
              className="h-auto w-14 sm:w-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || (link.href === "/work" && pathname.startsWith("/work"));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm tracking-tight transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-[var(--color-foreground)] font-medium"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Availability Status & Contact CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 font-mono text-xs text-[var(--color-muted)] bg-[var(--color-surface)] px-3 py-1.5 rounded-full border border-[var(--color-border)]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>{siteConfig.availability.badge}</span>
            </div>

            <Link
              href="mailto:zyadd.aymann@gmail.com"
              className="font-mono text-xs uppercase tracking-wider text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
            >
              Get in Touch →
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMenuOpenPath(mobileMenuOpen ? null : pathname)}
            className="md:hidden flex h-11 w-11 items-center justify-center text-[var(--color-foreground)] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-[var(--color-foreground)] transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[var(--color-foreground)] transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[var(--color-foreground)] transition-transform duration-200 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="mobile-drawer-enter fixed inset-0 z-40 bg-[#FBFBF9] pt-24 px-8 flex flex-col justify-between pb-20 md:hidden"
        >
          <div className="space-y-6 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-muted)]">
              Navigation
            </p>
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpenPath(null)}
                  className="text-2xl font-normal tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-accent-terracotta)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center space-x-2 font-mono text-xs text-[var(--color-muted)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{siteConfig.availability.label}</span>
            </div>
            <div className="flex flex-col space-y-1 text-sm font-mono">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[var(--color-foreground)] underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
              <span className="text-xs text-[var(--color-muted)]">
                {siteConfig.contact.phoneDisplay}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
