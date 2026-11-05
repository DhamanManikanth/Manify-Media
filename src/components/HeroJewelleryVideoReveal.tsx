"use client";

import { useEffect, useRef, useState } from "react";

interface HeroJewelleryVideoRevealProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroJewelleryVideoReveal({ containerRef }: HeroJewelleryVideoRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Without moving cursor, screen remains pure black (isRevealed = false)
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Autoplay video reliably in background
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

    // Initialize CSS custom properties to center
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

      // Check if mouse is within hero bounds
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        targetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
        targetY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

        // Moving cursor dynamically reveals the video
        setIsRevealed(true);

        if (!rafId) {
          rafId = requestAnimationFrame(updatePosition);
        }

        // If cursor stops moving for 1.8s, smoothly fade back to black screen
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          setIsRevealed(false);
        }, 1800);
      } else {
        // Outside hero section: fade back to black
        setIsRevealed(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      }
    };

    const handleMouseLeave = () => {
      setIsRevealed(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [containerRef]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#050505]"
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
             Without moving cursor: completely hidden (pure black screen visible).
             When moving cursor: dynamically revealed through a smooth 400px spotlight mask! */}
      <div
        className={`absolute inset-0 w-full h-full z-[2] transition-opacity duration-500 ease-out ${
          isRevealed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 42%), black 30%, rgba(0,0,0,0.45) 65%, transparent 100%)",
          maskImage:
            "radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 42%), black 30%, rgba(0,0,0,0.45) 65%, transparent 100%)",
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
      </div>

      {/* 3. SOFT AMBIENT CURSOR HALO
             Reveals a subtle warm/red luxury glow following the cursor pointer */}
      <div
        className={`absolute inset-0 z-[3] transition-opacity duration-500 pointer-events-none ${
          isRevealed ? "opacity-90" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle 440px at var(--mouse-x, 50%) var(--mouse-y, 42%), rgba(240, 0, 22, 0.16) 0%, rgba(240, 0, 22, 0.03) 55%, transparent 75%)",
        }}
      />

      {/* 4. SMOOTH SECTION TRANSITIONS (Top and bottom edge blend into #050505) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-[4] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-[4] pointer-events-none" />
    </div>
  );
}
