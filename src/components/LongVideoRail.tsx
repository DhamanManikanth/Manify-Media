"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import Image from "next/image";
import { Play, Sparkles, MoveHorizontal, Film, ArrowRight } from "lucide-react";
import VideoModal from "./VideoModal";
import { PortfolioVideo } from "@/data/portfolio";

// =========================================================================
// 16:9 LONG VIDEOS & COMMERCIALS DATA
// SWAP MEDIA: Replace videoUrl, thumbnailUrl, title, and description below
// =========================================================================
const LONG_VIDEOS = [
  {
    id: "long-01",
    title: "Luxury Jewelry Master Commercial",
    category: "AI Brand Cinema",
    duration: "1:45",
    description: "Multi-scene cinematic jewelry reveal with custom volumetric lighting and micro-facet dispersion.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/jewelry-brand-ad.mp4",
    thumbnailUrl: "/images/thumb-jewelry-brand-ad.jpg",
    aspectRatio: "16:9" as const,
  },
  {
    id: "long-02",
    title: "Automotive Vision Concept Film",
    category: "Digital Animation",
    duration: "2:10",
    description: "Photorealistic electric supercar reveal navigating cinematic canyon switchbacks.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/brand-reel-1.mp4",
    thumbnailUrl: "/images/thumb-brand-reel-1.jpg",
    aspectRatio: "16:9" as const,
  },
  {
    id: "long-03",
    title: "EdTech & Interactive Digital Academy",
    category: "Visual Storytelling",
    duration: "3:20",
    description: "Complex technical concept explained with high-energy digital animations and 3D visual metaphors.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/educational-1.mp4",
    thumbnailUrl: "/images/thumb-educational-1.jpg",
    aspectRatio: "16:9" as const,
  },
  {
    id: "long-04",
    title: "Anime-Inspired Commercial Motion",
    category: "2D & 3D Anime Motion",
    duration: "1:15",
    description: "Handcrafted keyframe styling synthesized through modern neural animation pipelines.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/2d-animation-1.mp4",
    thumbnailUrl: "/images/thumb-2d-animation-1.jpg",
    aspectRatio: "16:9" as const,
  },
  {
    id: "long-05",
    title: "Kinetic Brand Identity & Logo Reveal",
    category: "Digital Reveals",
    duration: "0:50",
    description: "Atmospheric brand reveal built for keynotes and high-stakes venture pitches.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/ai-reel.mp4",
    thumbnailUrl: "/images/thumb-ai-reel.jpg",
    aspectRatio: "16:9" as const,
  },
  {
    id: "long-06",
    title: "Scientific Visualization & Exploded Views",
    category: "CGI Exploded View",
    duration: "2:30",
    description: "Precision medical and robotics engineering animation with transparent housing layers.",
    /* SWAP 16:9 LONG VIDEO URL HERE: */
    videoUrl: "/videos/educational-2.mp4",
    thumbnailUrl: "/images/thumb-educational-2.jpg",
    aspectRatio: "16:9" as const,
  },
];

export default function LongVideoRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Motion value for x position to drive smooth auto-scroll & dragging
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 300, damping: 35, mass: 0.2 });

  // Triple the list for an infinite, seamless loop experience
  const displayVideos = [...LONG_VIDEOS, ...LONG_VIDEOS, ...LONG_VIDEOS];

  // Auto-scroll loop effect
  useEffect(() => {
    let animId: number;
    const speed = 0.65; // pixels per frame

    const tick = () => {
      if (!isPaused) {
        const currentX = x.get();
        // Width of single set (~6 items * ~430px = 2580px)
        const setWidth = LONG_VIDEOS.length * 440;

        let nextX = currentX - speed;
        // Seamless wrap
        if (Math.abs(nextX) >= setWidth) {
          nextX = 0;
        }
        x.set(nextX);
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, x]);

  return (
    <section id="long-videos" className="py-20 bg-[#050505] text-white overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121212] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>HORIZONTAL DRAGGABLE RAIL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Long-Form <span className="text-gradient">Brand Cinema</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#777]">
            <MoveHorizontal className="w-4 h-4 text-[#F00016] animate-pulse" />
            <span>DRAG OR SWIPE RAIL · HOVER TO PREVIEW · CLICK FOR LIGHTBOX</span>
          </div>
        </div>
      </div>

      {/* Horizontal Draggable Infinite Marquee Rail */}
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing select-none py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={railRef}
          style={{ x: smoothX }}
          drag="x"
          dragConstraints={{ left: -3200, right: 300 }}
          dragElastic={0.08}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(_e, info) => {
            // Add momentum inertia on drag release
            const currentX = x.get();
            const targetX = currentX + info.velocity.x * 0.15;
            animate(x, targetX, {
              type: "spring",
              stiffness: 180,
              damping: 24,
              onComplete: () => {
                setTimeout(() => setIsPaused(false), 800);
              },
            });
          }}
          className="flex gap-6 w-max pl-6"
        >
          {displayVideos.map((video, idx) => (
            <RailVideoCard
              key={`${video.id}-${idx}`}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))}
        </motion.div>
      </div>

      {/* Video Lightbox Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}

interface RailVideoCardProps {
  video: (typeof LONG_VIDEOS)[0];
  onClick: () => void;
}

function RailVideoCard({ video, onClick }: RailVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="w-[320px] sm:w-[420px] rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-[#F00016]/60 transition-all duration-300 shadow-xl group flex-shrink-0"
    >
      {/* 16:9 Thumbnail / Live Video Preview Container */}
      <div className="relative aspect-video w-full bg-black overflow-hidden">
        {/* Poster Image */}
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 320px, 420px"
        />

        {/* Hover Video Preview Player */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white">
            {video.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#F00016] text-white font-bold">
            {video.duration}
          </span>
        </div>

        {/* Center Hover Playhead Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#F00016] text-white flex items-center justify-center shadow-lg transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
            <Play className="w-5 h-5 ml-1 fill-white" />
          </div>
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 sm:p-5 text-left">
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FF334B] transition-colors line-clamp-1 mb-1.5">
          {video.title}
        </h4>
        <p className="text-xs text-[#888] line-clamp-2 leading-relaxed mb-3">
          {video.description}
        </p>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#666] pt-2 border-t border-white/5">
          <span className="text-[#aaa]">CLICK FOR 4K CINEMA</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F00016] transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}

