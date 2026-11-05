"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PortfolioVideo } from "@/data/portfolio";
import VideoModal from "./VideoModal";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  VolumeX,
  Volume2,
  CheckCircle2,
  Play,
  Pause,
  Maximize2,
  Layers,
} from "lucide-react";
import { audio } from "@/lib/audioManager";
import { soundFx } from "@/lib/sound";
import TextScramble from "./ui/TextScramble";

// =========================================================================
// 2D ANIME & ANIMATION REELS DATA (AUTOPLAYING 9:16 REELS)
// =========================================================================
const ANIME_REELS = [
  {
    id: "anime-001",
    client: "SAMPLE #1 · ACTION ANIME",
    headline: "2D Motion & Character Action",
    metric: "Fluid Anime Keyframe Motion",
    badge: "2D ANIME #1",
    videoUrl: "/videos/2d-animation-1.mp4",
    posterUrl: "/images/thumb-2d-animation-1.jpg",
    aspectRatio: "9:16" as const,
  },
  {
    id: "anime-002",
    client: "SAMPLE #2 · STORY SEQUENCE",
    headline: "Expressive 2D Sequence",
    metric: "Japanese Anime Stylization",
    badge: "2D ANIME #2",
    videoUrl: "/videos/2d-animation-2.mp4",
    posterUrl: "/images/thumb-2d-animation-2.jpg",
    aspectRatio: "9:16" as const,
  },
  {
    id: "anime-003",
    client: "SAMPLE #3 · VISUAL SNIPPET",
    headline: "Creative Animated Story Snippet",
    metric: "Character Dynamics & Effects",
    badge: "2D ANIME #3",
    videoUrl: "/videos/2d-animation-1.mp4",
    posterUrl: "/images/thumb-2d-animation-1.jpg",
    aspectRatio: "9:16" as const,
  },
];

export default function AnimeAnimation() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger matrix digital scan line and 3-card fan-out when section enters viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const leftVideo = ANIME_REELS[0];
  const centerVideo = ANIME_REELS[1];
  const rightVideo = ANIME_REELS[2];

  return (
    <section
      id="animation"
      ref={containerRef}
      className="py-16 md:py-24 bg-[#050505] text-white relative overflow-hidden"
    >
      {/* =========================================================================
          FAST HORIZONTAL SCANNING LINE (TOP TO BOTTOM)
         ========================================================================= */}
      {isInView && (
        <>
          <motion.div
            initial={{ top: "-2%", opacity: 0 }}
            animate={{ top: "102%", opacity: [0, 1, 1, 0.9, 0] }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F00016] to-transparent shadow-[0_0_24px_#F00016,0_0_8px_#fff] pointer-events-none z-30"
          />
          <motion.div
            initial={{ top: "-15%", opacity: 0 }}
            animate={{ top: "95%", opacity: [0, 0.35, 0] }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 h-24 bg-gradient-to-b from-[#F00016]/15 to-transparent pointer-events-none z-20"
          />
        </>
      )}

      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:flex justify-between items-end max-w-5xl mx-auto">
          <div className="max-w-2xl mb-6 md:mb-0">
            {/* Top Status Tag with Character Scramble */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              <TextScramble
                text="NEURAL 2D MOTION MATRIX"
                trigger={isInView}
                delay={0.1}
              />
            </div>

            {/* Title with Decoder Scramble Effect */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 text-white">
              <TextScramble
                text="Anime-Style Animation & "
                trigger={isInView}
                delay={0.2}
              />
              <span className="text-gradient">
                <TextScramble
                  text="2D Motion"
                  trigger={isInView}
                  delay={0.4}
                />
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A3A3A3] max-w-2xl leading-relaxed">
              Expressive Japanese anime-style animation, dynamic 2D keyframing, and character motion running smoothly on autoplay.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            onMouseEnter={() => soundFx.playHover(0.1)}
            onClick={() => soundFx.playClick(0.25)}
            className="shrink-0 bg-[#F00016] text-white hover:bg-[#D00013] border border-[#F00016] shadow-lg shadow-[#F00016]/25 hover:scale-105 active:scale-95 transition-all group"
          >
            <Link href="#contact" className="flex items-center gap-2">
              <span>Create an Animation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* =========================================================================
            DESKTOP STAGED 3-VIDEO FAN-OUT CHOREOGRAPHY (LIKE "ENGINEERED FOR VIRAL")
            Compact, decreased size: center is prominent, sides fan out with subtle tilt
           ========================================================================= */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[530px] items-center justify-center">
          {/* 1. LEFT CARD (Fans out to left with subtle -2.5deg tilt) */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9, rotate: 0 }}
            animate={
              isInView
                ? { opacity: 1, x: -285, scale: 0.94, rotate: -2.5 }
                : { opacity: 0, x: 60, scale: 0.9, rotate: 0 }
            }
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 0.97, rotate: 0, zIndex: 30 }}
            className="absolute w-[240px] h-[435px] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl z-10 will-change-transform transition-shadow duration-300 hover:shadow-[#F00016]/20 hover:border-white/20"
          >
            <AnimeVideoCard
              data={leftVideo}
              onOpenModal={(video) => setSelectedVideo(video)}
            />
          </motion.div>

          {/* 2. CENTER CARD (Elevated, prominent, rises from center with red glow border) */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.92 }
            }
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, zIndex: 40 }}
            className="relative w-[268px] h-[485px] rounded-3xl overflow-hidden bg-[#0e0e0e] border-2 border-[#F00016]/60 shadow-[0_0_40px_rgba(240,0,22,0.25)] z-20 will-change-transform"
          >
            <AnimeVideoCard
              data={centerVideo}
              isCenter={true}
              onOpenModal={(video) => setSelectedVideo(video)}
            />
          </motion.div>

          {/* 3. RIGHT CARD (Fans out to right with subtle +2.5deg tilt) */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9, rotate: 0 }}
            animate={
              isInView
                ? { opacity: 1, x: 285, scale: 0.94, rotate: 2.5 }
                : { opacity: 0, x: -60, scale: 0.9, rotate: 0 }
            }
            transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 0.97, rotate: 0, zIndex: 30 }}
            className="absolute w-[240px] h-[435px] rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-2xl z-10 will-change-transform transition-shadow duration-300 hover:shadow-[#F00016]/20 hover:border-white/20"
          >
            <AnimeVideoCard
              data={rightVideo}
              onOpenModal={(video) => setSelectedVideo(video)}
            />
          </motion.div>
        </div>

        {/* Bottom Status Protocol Bar */}
        <div className="hidden md:flex container mx-auto max-w-4xl items-center justify-between text-[11px] font-mono text-[#666] pt-4 mt-2 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F00016] animate-pulse" />
            <span>AUTOPLAYING 2D KEYFRAME CHOREOGRAPHY</span>
          </div>
          <span>CLICK SOUND ICON TO UNMUTE AUDIO</span>
        </div>

        {/* =========================================================================
            MOBILE RESPONSIVE SWIPEABLE SNAP CAROUSEL
           ========================================================================= */}
        <div className="md:hidden mt-4">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-none">
            {ANIME_REELS.map((item, idx) => (
              <div
                key={item.id}
                className="w-[78vw] max-w-[260px] h-[440px] flex-shrink-0 snap-center rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-xl relative"
              >
                <AnimeVideoCard
                  data={item}
                  isCenter={idx === 1}
                  onOpenModal={(video) => setSelectedVideo(video)}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-mono text-[#777] mt-2">
            Swipe to explore 2D reels · Tap volume icon to unmute
          </p>
        </div>
      </div>

      {/* Cinematic 4K Video Lightbox Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}

// =========================================================================
// AUTOPLAYING 2D ANIME REEL CARD COMPONENT
// Autoplays muted on loop with clickable audio unmute & play/pause toggle
// =========================================================================
interface AnimeVideoCardProps {
  data: (typeof ANIME_REELS)[0];
  isCenter?: boolean;
  onOpenModal: (video: PortfolioVideo) => void;
}

function AnimeVideoCard({ data, isCenter = false, onOpenModal }: AnimeVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);

    if (!newMuted) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      audio.setSound(true);
    }
  };

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenModal({
      id: data.id,
      title: data.headline,
      description: data.client,
      category: "2D & Anime Animation",
      videoUrl: data.videoUrl,
      thumbnailUrl: data.posterUrl,
      aspectRatio: "9:16",
    });
  };

  return (
    <div
      onClick={togglePlay}
      className="relative w-full h-full bg-black group select-none cursor-pointer"
    >
      {/* 1. AUTOPLAYING VIDEO ELEMENT - NO CLICK REQUIRED */}
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 2. Dark Vignette Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none transition-opacity duration-300 ${
          isPlaying ? "opacity-40" : "opacity-90"
        }`}
      />

      {/* 3. Center Pause Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-14 h-14 rounded-full bg-[#F00016] text-white flex items-center justify-center shadow-xl shadow-[#F00016]/40 scale-100 animate-in fade-in zoom-in duration-200">
            <Play className="w-6 h-6 ml-1 fill-white" />
          </div>
        </div>
      )}

      {/* 4. Top Header Bar (Badge + Mute/Unmute Toggle + Expand) */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F00016] animate-pulse" />
          <span className="text-white font-bold">{data.badge}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Working Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Click to Unmute Audio" : "Click to Mute"}
            className={`pointer-events-auto p-1.5 rounded-full transition-all duration-200 border cursor-pointer ${
              isMuted
                ? "bg-black/75 text-[#aaa] border-white/15 hover:text-white hover:border-[#F00016]/50"
                : "bg-[#F00016] text-white border-[#F00016] shadow-lg shadow-[#F00016]/40 scale-105"
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 animate-bounce" />
            )}
          </button>

          {/* Expand to 4K Lightbox Modal */}
          <button
            onClick={handleExpand}
            title="Open Fullscreen Cinema"
            className="pointer-events-auto p-1.5 rounded-full bg-black/75 text-[#aaa] border border-white/15 hover:text-white hover:border-white/40 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. Bottom Metadata Label - Hidden while playing, restored when paused */}
      <div
        className={`absolute bottom-4 left-4 right-4 z-10 pointer-events-none text-left transition-all duration-300 ${
          isPlaying
            ? "opacity-0 translate-y-3 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF334B] mb-0.5 font-semibold">
          {data.client}
        </div>
        <h4 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
          {data.headline}
        </h4>
        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#bbb]">
          <CheckCircle2 className="w-3 h-3 text-[#F00016]" />
          <span>{data.metric}</span>
        </div>
      </div>
    </div>
  );
}
