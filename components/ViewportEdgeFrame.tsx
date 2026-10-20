"use client";

import { useEffect, useState } from "react";

export function ViewportEdgeFrame() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top Feathered Viewport Frame - Fades in smoothly once user starts scrolling */}
      <div
        className={`absolute top-0 left-0 right-0 h-10 sm:h-14 transition-opacity duration-500 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "linear-gradient(to bottom, rgba(251, 251, 249, 0.85) 0%, rgba(251, 251, 249, 0.3) 50%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, black 25%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 25%, transparent 100%)",
        }}
      />

      {/* Bottom Feathered Viewport Frame - Always softly present for incoming content */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 sm:h-16"
        style={{
          background: "linear-gradient(to top, rgba(251, 251, 249, 0.9) 0%, rgba(251, 251, 249, 0.4) 45%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 25%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 25%, transparent 100%)",
        }}
      />
    </div>
  );
}
