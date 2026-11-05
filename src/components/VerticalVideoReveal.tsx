"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Smartphone, VolumeX, Volume2, Sparkles, CheckCircle2 } from "lucide-react";
import { audio } from "@/lib/audioManager";

// =========================================================================
// VERTICAL VIDEOS (9:16) REVEAL DATA - SAMPLE VIDEOS
// =========================================================================
const VERTICAL_VIDEOS = [
  {
    id: "reel-left",
    position: "left",
    client: "SAMPLE WORK · AI SPOKESPERSON",
    headline: "Digital Avatar Commercial Reel",
    metric: "High-Retention Conversion Creative",
    badge: "SAMPLE WORK",
    /* SWAP VERTICAL 9:16 VIDEO URL HERE: */
    videoUrl: "/videos/avatar-ai-reel.mp4",
    posterUrl: "/images/thumb-avatar-ai-reel.jpg",
  },
  {
    id: "reel-center",
    position: "center",
    client: "SAMPLE WORK · LUXURY COMMERCE",
    headline: "High-Retention Hero Ad",
    metric: "Cinematic Luxury Ad · High ROAS",
    badge: "SAMPLE WORK",
    /* SWAP VERTICAL 9:16 VIDEO URL HERE: */
    videoUrl: "/videos/client-reel-1.mp4",
    posterUrl: "/images/thumb-client-reel-1.jpg",
  },
  {
    id: "reel-right",
    position: "right",
    client: "SAMPLE WORK · MACRO PRECISION",
    headline: "Product Reveal Loop",
    metric: "Macro Precision · 80% Cost Saved",
    badge: "SAMPLE WORK",
    /* SWAP VERTICAL 9:16 VIDEO URL HERE: */
    videoUrl: "/videos/client-reel-2.mp4",
    posterUrl: "/images/thumb-client-reel-2.jpg",
  },
];

export default function VerticalVideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking across the pinned duration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // =======================================================================
  // CHOREOGRAPHY PHASES:
  // Phase 1 (0.05 -> 0.35): Center video rises into view (translateY + scale + opacity)
  // Phase 2 (0.35 -> 0.70): Left video slides out from behind center to the left
  // Phase 3 (0.45 -> 0.85): Right video slides out from behind center to the right
  // =======================================================================

  // Center video transforms
  const centerY = useTransform(smoothProgress, [0.05, 0.35], [140, 0]);
  const centerScale = useTransform(smoothProgress, [0.05, 0.35], [0.86, 1.02]);
  const centerOpacity = useTransform(smoothProgress, [0.05, 0.25], [0, 1]);

  // Left video transforms (slides out from behind center: x: 0 -> -325px)
  const leftX = useTransform(smoothProgress, [0.35, 0.7], [0, -325]);
  const leftOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  const leftScale = useTransform(smoothProgress, [0.35, 0.7], [0.9, 0.94]);
  const leftRotate = useTransform(smoothProgress, [0.35, 0.7], [0, -2.5]);

  // Right video transforms (slides out from behind center: x: 0 -> +325px)
  const rightX = useTransform(smoothProgress, [0.45, 0.82], [0, 325]);
  const rightOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
  const rightScale = useTransform(smoothProgress, [0.45, 0.82], [0.9, 0.94]);
  const rightRotate = useTransform(smoothProgress, [0.45, 0.82], [0, 2.5]);

  const leftVideo = VERTICAL_VIDEOS[0];
  const centerVideo = VERTICAL_VIDEOS[1];
  const rightVideo = VERTICAL_VIDEOS[2];

  return (
    <section id="reels" className="relative bg-[#050505] text-white">
      {/* ================================================================= */}
      {/* DESKTOP PINNED 3-VIDEO FAN-OUT CHOREOGRAPHY                       */}
      {/* ================================================================= */}
      <div ref={containerRef} className="hidden md:block relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-6 overflow-hidden">
          {/* Header Bar */}
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>CLIENT REELS // 9:16 REVEAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
              Engineered For <span className="text-gradient">Viral Retention</span>
            </h2>
            <p className="text-sm font-mono text-[#777]">
              Scroll to reveal the 3-video sequence deployed from center. Click audio icon to unmute sound.
            </p>
          </div>

          {/* Staged 3-Video Choreography Canvas */}
          <div className="relative w-full max-w-5xl mx-auto h-[580px] flex items-center justify-center">
            {/* 1. LEFT CARD (Slides out behind center) - Madam Blue Avatar */}
            <motion.div
              style={{
                x: leftX,
                opacity: leftOpacity,
                scale: leftScale,
                rotate: leftRotate,
              }}
              className="absolute w-[265px] h-[470px] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl z-10 will-change-transform"
            >
              <VideoPlayerCard data={leftVideo} />
            </motion.div>

            {/* 2. CENTER CARD (Rises first, stays prominent on top) */}
            <motion.div
              style={{
                y: centerY,
                scale: centerScale,
                opacity: centerOpacity,
              }}
              className="relative w-[300px] h-[535px] rounded-3xl overflow-hidden bg-[#0e0e0e] border-2 border-[#F00016]/60 shadow-[0_0_40px_rgba(240,0,22,0.25)] z-20 will-change-transform"
            >
              <VideoPlayerCard data={centerVideo} isCenter={true} />
            </motion.div>

            {/* 3. RIGHT CARD (Slides out behind center) */}
            <motion.div
              style={{
                x: rightX,
                opacity: rightOpacity,
                scale: rightScale,
                rotate: rightRotate,
              }}
              className="absolute w-[265px] h-[470px] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl z-10 will-change-transform"
            >
              <VideoPlayerCard data={rightVideo} />
            </motion.div>
          </div>

          {/* Bottom Choreography Status Bar */}
          <div className="container mx-auto max-w-5xl flex items-center justify-between text-[11px] font-mono text-[#666] pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F00016] animate-pulse" />
              <span>SCROLL-DRIVEN 3-VIDEO FAN-OUT PROTOCOL</span>
            </div>
            <span>CLICK VOLUME ICON TO UNMUTE AUDIO</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE FALLBACK: SWIPEABLE SNAP CAROUSEL                          */}
      {/* ================================================================= */}
      <div className="md:hidden py-16 px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-[#F00016] mb-3">
            <Smartphone className="w-3 h-3" />
            <span>9:16 VERTICAL CLIENT REELS</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Engineered For <span className="text-gradient">Viral Retention</span>
          </h2>
          <p className="text-xs text-[#888]">Swipe to explore client work. Tap sound icon to unmute.</p>
        </div>

        {/* Swipeable Carousel Track */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none">
          {VERTICAL_VIDEOS.map((item) => (
            <div
              key={item.id}
              className="w-[82vw] max-w-[300px] h-[520px] flex-shrink-0 snap-center rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-xl relative"
            >
              <VideoPlayerCard data={item} isCenter={item.position === "center"} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface VideoPlayerCardProps {
  data: (typeof VERTICAL_VIDEOS)[0];
  isCenter?: boolean;
}

function VideoPlayerCard({ data, isCenter = false }: VideoPlayerCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      videoRef.current.play().catch(() => {});
      audio.setSound(true);
    }
  };

  return (
    <div className="relative w-full h-full bg-black group select-none">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={data.videoUrl}
        poster={data.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Subtle Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F00016] animate-pulse" />
          <span className="text-white font-bold">{data.badge}</span>
        </div>

        {/* Working Clickable Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          title={isMuted ? "Click to Unmute Sound" : "Click to Mute"}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-200 border cursor-pointer ${
            isMuted
              ? "bg-black/75 text-[#aaa] border-white/15 hover:text-white hover:border-[#F00016]/50"
              : "bg-[#F00016] text-white border-[#F00016] shadow-lg shadow-[#F00016]/40 scale-105"
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 animate-bounce" />
          )}
        </button>
      </div>

      {/* Bottom Metadata Label */}
      <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none text-left">
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF334B] mb-1 font-semibold">
          {data.client}
        </div>
        <h4 className="text-base font-bold text-white mb-1.5 leading-snug">
          {data.headline}
        </h4>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#bbb]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#F00016]" />
          <span>{data.metric}</span>
        </div>
      </div>
    </div>
  );
}
