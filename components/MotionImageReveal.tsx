"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface MotionImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "right" | "fade";
}

export function MotionImageReveal({
  children,
  className = "",
  delay = 0.1,
  direction = "up",
}: MotionImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const getInitialClip = () => {
    switch (direction) {
      case "up":
        return "inset(15% 0% 0% 0%)";
      case "right":
        return "inset(0% 15% 0% 0%)";
      default:
        return "inset(0% 0% 0% 0%)";
    }
  };

  const variants = {
    hidden: {
      clipPath: getInitialClip(),
      opacity: 0.4,
      scale: 1.04,
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      className={`overflow-hidden will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
