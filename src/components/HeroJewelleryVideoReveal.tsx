"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

interface HeroJewelleryVideoRevealProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroJewelleryVideoReveal({ containerRef }: HeroJewelleryVideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking initialized to center of screen
  const mouseX = useMotionValue(700);
  const mouseY = useMotionValue(350);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 28 });

  // Dynamic circular video spotlight mask tracking the cursor
  const videoMask = useMotionTemplate`radial-gradient(circle 350px at ${springX}px ${springY}px, rgba(0,0,0,1) 40%, rgba(0,0,0,0.35) 75%, transparent 100%)`;
  const haloGlow = useMotionTemplate`radial-gradient(circle 350px at ${springX}px ${springY}px, rgba(240,0,22,0.16) 0%, transparent 80%)`;

  useEffect(() => {
    // Autoplay video reliably
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height * 0.42);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Track cursor whenever mouse is within hero bounds
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef, mouseX, mouseY]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#050505]">
      {/* 1. Underlying Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. THE JEWELLERY VIDEO LAYER (Positioned at z-0, visible and revealed by cursor spotlight) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          WebkitMaskImage: videoMask,
          maskImage: videoMask,
        }}
      >
        <video
          ref={videoRef}
          src="/videos/jewelry-brand-ad.mp4"
          poster="/images/thumb-jewelry-brand-ad.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      {/* 3. Soft Ambient Cursor Halo following cursor */}
      <motion.div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.8 : 0.3,
          background: haloGlow,
        }}
      />

      {/* 4. Fine Vignette around edges to smoothly blend into #050505 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />
    </div>
  );
}
