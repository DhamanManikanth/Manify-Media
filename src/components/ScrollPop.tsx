"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { soundFx } from "@/lib/sound";

interface ScrollPopProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  pitchIndex?: number;
  direction?: "up" | "scale" | "left" | "right";
  playSound?: boolean;
}

export default function ScrollPop({
  children,
  className = "",
  delay = 0,
  direction = "up",
  playSound = false, // Default to false so scroll is clean, graceful and quiet
}: ScrollPopProps) {
  // Ultra-smooth editorial cinematic motion curve [0.16, 1, 0.3, 1]
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -30, filter: "blur(4px)" };
      case "right":
        return { opacity: 0, x: 30, filter: "blur(4px)" };
      case "scale":
        return { opacity: 0, y: 24, scale: 0.98, filter: "blur(4px)" };
      case "up":
      default:
        return { opacity: 0, y: 32, filter: "blur(4px)" };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      onViewportEnter={() => {
        if (playSound) {
          soundFx.playHapticTick(0.025);
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
