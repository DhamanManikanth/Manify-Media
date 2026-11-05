"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { PortfolioVideo } from "@/data/portfolio";
import { audio } from "@/lib/audioManager";

interface VideoCardProps {
  video: PortfolioVideo;
  index: number;
  onClick: (video: PortfolioVideo) => void;
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  const isPortrait = video.aspectRatio === "9:16";
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt (max 6 degrees)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring physics for natural tilt easing
  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  // Cursor glow coordinates in percentage
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xFromCenter = (e.clientX - rect.left) / width - 0.5;
    const yFromCenter = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xFromCenter);
    mouseY.set(yFromCenter);

    setGlowPos({
      x: ((e.clientX - rect.left) / width) * 100,
      y: ((e.clientY - rect.top) / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audio.playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.08,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        audio.playClick();
        onClick(video);
      }}
      className={`relative ${
        isPortrait ? "aspect-[9/16]" : "aspect-video"
      } rounded-2xl overflow-hidden group cursor-pointer bg-[var(--surface)] border border-white/[0.08] hover:border-[var(--primary)]/50 transition-shadow duration-500 shadow-lg hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:-translate-y-1.5 will-change-transform`}
    >
      {/* 1. Dynamic Cursor-Tracking Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, rgba(240, 0, 22, 0.4), transparent 80%)`,
        }}
      />

      {/* 2. Video Thumbnail with Cinematic 1.05 Zoom */}
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          sizes={
            isPortrait
              ? "(max-width: 768px) 50vw, 33vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-6 text-center">
          <div className="w-12 h-12 bg-[#101010] border border-[#242424] rounded-full flex items-center justify-center mb-4 group-hover:border-[var(--primary)]/50 transition-colors">
            <Play className="w-5 h-5 text-[#888] ml-1 group-hover:text-[var(--primary)]" />
          </div>
          <span className="text-[#888] text-xs font-mono uppercase tracking-wider">Preview Pending</span>
        </div>
      )}

      {/* 3. Subtle Viewfinder Framing Corners */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-[var(--primary)] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-[var(--primary)] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-[var(--primary)] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-[var(--primary)] transition-colors duration-300 pointer-events-none z-20" />

      {/* 4. Top Technical Metadata Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#aaa] z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
        <span>{isPortrait ? "9:16 REEL" : "16:9 4K"}</span>
      </div>

      {/* 5. Cinematic Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

      {/* 6. Playhead Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-20">
        <div className="w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-xl shadow-[var(--primary)]/30 transform scale-75 group-hover:scale-100 transition-transform duration-400">
          <Play className="w-6 h-6 ml-1 fill-white" />
        </div>
      </div>

      {/* 7. Bottom Card Meta */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-left z-20 pointer-events-none">
        {video.client && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-semibold mb-1 block">
            {video.client}
          </span>
        )}
        <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-[var(--muted)] text-xs line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
