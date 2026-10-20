"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  variant?: "rise" | "drift" | "soft";
}

/**
 * Progressive enhancement: content is visible in the server-rendered page.
 * Only elements below the fold are hidden after the observer is attached.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  variant = "rise",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const startsBelowFold = rect.top > window.innerHeight * 0.88;
    if (!startsBelowFold) {
      element.classList.add("is-visible");
      return;
    }

    element.classList.add("motion-reveal-pending");
    element.style.setProperty("--reveal-delay", `${delay}ms`);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={elementRef} data-reveal={variant} className={`motion-reveal ${className}`}>
      {children}
    </div>
  );
}
