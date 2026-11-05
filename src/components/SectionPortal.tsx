"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SectionPortalProps {
  id?: string;
  chapterNumber: string;
  chapterTag: string;
  children: ReactNode;
  className?: string;
}

export default function SectionPortal({
  id,
  chapterNumber,
  chapterTag,
  children,
  className = "",
}: SectionPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking as section enters viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Smooth unfolding mechanics
  const laserWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const portalOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.8, 1]);
  const portalY = useTransform(smoothProgress, [0, 1], [35, 0]);
  const portalScale = useTransform(smoothProgress, [0, 1], [0.98, 1]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative scroll-mt-24 transition-colors duration-700 ${className}`}
    >
      {/* 1. Kinetic Chapter Unveiling Header */}
      <div className="container mx-auto px-6 pt-12 pb-4">
        <div className="relative flex items-center justify-between pb-3 border-b border-white/[0.06]">
          {/* Expanding Laser Horizon Line */}
          <motion.div
            className="absolute bottom-[-1px] left-0 h-[1.5px] bg-gradient-to-r from-[#F00016] via-[#FF334B] to-transparent shadow-[0_0_12px_rgba(240,0,22,0.7)]"
            style={{ width: laserWidth }}
          />

          {/* Chapter Metadata */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#F00016]">
              {chapterNumber}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888]">
              {chapterTag}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#555] tracking-widest">
            <span>UNVEILING</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F00016] animate-pulse" />
          </div>
        </div>
      </div>

      {/* 2. Unfolded Stage Content with Smooth Depth */}
      <motion.div
        style={{
          opacity: portalOpacity,
          y: portalY,
          scale: portalScale,
        }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
