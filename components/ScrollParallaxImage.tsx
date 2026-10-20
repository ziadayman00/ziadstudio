"use client";

import React, { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ScrollParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

const subscribeToViewport = (callback: () => void) => {
  const query = window.matchMedia("(max-width: 767px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

const isCompactViewport = () => window.matchMedia("(max-width: 767px)").matches;
const getServerViewport = () => false;

export function ScrollParallaxImage({
  src,
  alt,
  aspectRatio = "aspect-[16/10]",
  className = "",
  intensity = "medium",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 800px",
  children,
}: ScrollParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isCompact = useSyncExternalStore(subscribeToViewport, isCompactViewport, getServerViewport);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const getOffsetRange = () => {
    switch (intensity) {
      case "low":
        return ["-3%", "3%"];
      case "high":
        return ["-8%", "8%"];
      case "medium":
      default:
        return ["-5%", "5%"];
    }
  };

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || isCompact ? ["0%", "0%"] : getOffsetRange()
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion || isCompact ? [1, 1, 1] : [1.055, 1.025, 1.055]
  );

  return (
    <div
      ref={containerRef}
      className={`project-artwork-surface relative overflow-hidden bg-[var(--color-surface)] ${aspectRatio} ${className}`}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="project-artwork-image object-cover object-top"
        />
      </motion.div>
      {children}
    </div>
  );
}
