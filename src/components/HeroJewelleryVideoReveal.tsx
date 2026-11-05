"use client";

import { useEffect, useRef, useState } from "react";

interface HeroJewelleryVideoRevealProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroJewelleryVideoReveal({ containerRef }: HeroJewelleryVideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Autoplay video reliably
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let rafId: number | null = null;
    let targetX = container.clientWidth / 2;
    let targetY = container.clientHeight * 0.42;
    let currentX = targetX;
    let currentY = targetY;

    // Set initial position
    wrapper.style.setProperty("--mouse-x", `${currentX}px`);
    wrapper.style.setProperty("--mouse-y", `${currentY}px`);

    const updatePosition = () => {
      // Smooth fluid trailing motion
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      wrapper.style.setProperty("--mouse-x", `${currentX.toFixed(1)}px`);
      wrapper.style.setProperty("--mouse-y", `${currentY.toFixed(1)}px`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        rafId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientY >= rect.top - 80 &&
        e.clientY <= rect.bottom + 80 &&
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40
      ) {
        targetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        targetY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
        setIsHovered(true);

        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "42%",
      } as React.CSSProperties}
    >
      {/* 1. Underlying Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. THE JEWELLERY VIDEO - FULL SPACE COVERAGE
             Spans 100% edge-to-edge across the entire hero section */}
      <video
        ref={videoRef}
        src="/videos/jewelry-brand-ad.mp4"
        poster="/images/thumb-jewelry-brand-ad.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* 3. DYNAMIC CURSOR REVEAL TINT MASK
             The video plays across the entire hero background with a smooth dark cinematic tint.
             As the user sweeps the cursor across the section, this dark overlay is cleared away
             via a generous 480px spotlight, revealing the luxury jewellery video with 100% brilliance! */}
      <div
        className="absolute inset-0 z-[2] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(5, 5, 5, 0.72)",
          WebkitMaskImage:
            "radial-gradient(circle 480px at var(--mouse-x, 50%) var(--mouse-y, 42%), transparent 30%, rgba(0,0,0,0.65) 65%, black 100%)",
          maskImage:
            "radial-gradient(circle 480px at var(--mouse-x, 50%) var(--mouse-y, 42%), transparent 30%, rgba(0,0,0,0.65) 65%, black 100%)",
        }}
      />

      {/* 4. SOFT AMBIENT CURSOR HALO
             Gives a luxury warm/red spotlight glow that follows the cursor */}
      <div
        className="absolute inset-0 z-[3] transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.95 : 0.45,
          background:
            "radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 42%), rgba(240, 0, 22, 0.16) 0%, rgba(240, 0, 22, 0.03) 55%, transparent 75%)",
        }}
      />

      {/* 5. SMOOTH SECTION TRANSITIONS (Only top & bottom edges blend into #050505) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-[4] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-[4] pointer-events-none" />
    </div>
  );
}
