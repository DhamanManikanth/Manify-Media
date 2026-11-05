"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface HeroVideoRevealBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroVideoRevealBackground({ containerRef }: HeroVideoRevealBackgroundProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse tracking across full hero screen
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  // Dynamic circular video reveal mask directly tracking the mouse
  const videoMask = useMotionTemplate`radial-gradient(circle 280px at ${springX}px ${springY}px, black 35%, rgba(0,0,0,0.4) 65%, transparent 100%)`;

  useEffect(() => {
    // Detect touch device
    const touch = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    setIsTouchDevice(touch);

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Soft glide to center when cursor leaves
      const rect = container.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, isHovered, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#050505]">
      {/* 1. Underlying Dark Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. REAL CINEMATIC BACKGROUND VIDEO REVEALED BY CURSOR
             As the user moves their cursor, the radial mask reveals the real high-definition video underneath */}
      <motion.div
        className="absolute inset-0 w-full h-full transition-opacity duration-300"
        style={{
          opacity: isTouchDevice ? 0.2 : isHovered ? 0.95 : 0.15,
          WebkitMaskImage: isTouchDevice
            ? "radial-gradient(circle 350px at 50% 45%, black 20%, transparent 80%)"
            : videoMask,
          maskImage: isTouchDevice
            ? "radial-gradient(circle 350px at 50% 45%, black 20%, transparent 80%)"
            : videoMask,
        }}
      >
        <video
          src="/videos/jewelry-brand-ad.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        />
        {/* Subtle cinematic color grading tone */}
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
      </motion.div>

      {/* 3. Subtle Dark Vignette & Edge Fade for Pristine Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

      {/* 4. Fine Ambient Center Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/4 rounded-full blur-[160px]" />
    </div>
  );
}

