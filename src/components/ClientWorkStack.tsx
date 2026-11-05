"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { Play, Pause, Sparkles, ArrowRight, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import VideoModal from "./VideoModal";
import { PortfolioVideo } from "@/data/portfolio";

// =========================================================================
// SAMPLE WORK STACKING SLIDES DATA
// =========================================================================
const CLIENT_PROJECTS = [
  {
    id: "client-01",
    client: "Sample #1",
    category: "3D Product Animation & Reveal",
    description: "Replaced a high-cost physical studio film shoot with hyper-realistic CGI digital reveals, showcasing intricate diamond micro-refractions.",
    badge: "SAMPLE #1",
    aspectRatio: "16:9",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/jewelry-brand-ad.mp4",
    thumbnailUrl: "/images/thumb-jewelry-brand-ad.jpg",
    tags: ["3D Cinema", "Product Animation"],
  },
  {
    id: "client-02",
    client: "Sample #2",
    category: "AI Avatar & Digital Presenter",
    description: "High-retention digital human spokesperson with realistic micro-expressions and synchronized multi-lingual articulation, engineered for conversion.",
    badge: "SAMPLE #2",
    aspectRatio: "9:16",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/avatar-ai-reel.mp4",
    thumbnailUrl: "/images/thumb-avatar-ai-reel.jpg",
    tags: ["Digital Avatar", "AI Presenter"],
  },
  {
    id: "client-03",
    client: "Sample #3",
    category: "Digital Macro Gear Reveal",
    description: "Exploded-view mechanical movement animation highlighting sapphire crystal casing and internal caliber gears without disassembling physical prototypes.",
    badge: "SAMPLE #3",
    aspectRatio: "9:16",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/client-reel-2.mp4",
    thumbnailUrl: "/images/thumb-client-reel-2.jpg",
    tags: ["Macro Optics", "Exploded View"],
  },
  {
    id: "client-04",
    client: "Sample #4",
    category: "Cinematic AI Commercial Film",
    description: "Synthesized cinematic mountain switchbacks and volumetric golden hour lighting, providing multi-format ad assets in days instead of months.",
    badge: "SAMPLE #4",
    aspectRatio: "16:9",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/brand-reel-1.mp4",
    thumbnailUrl: "/images/thumb-brand-reel-1.jpg",
    tags: ["Commercial Film", "Cinematic AI"],
  },
];

export default function ClientWorkStack() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeModalVideo, setActiveModalVideo] = useState<PortfolioVideo | null>(null);
  
  // Single active playing video ID: only ONE video plays at a time across all samples
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  // Bind scroll directly to the cards container so stacking begins exactly at card 0
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="client-work"
      className="relative bg-[#050505] text-white"
    >
      {/* Section Anchor Header */}
      <div className="container mx-auto px-6 pt-16 pb-8 border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SAMPLE SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Sample <span className="text-gradient">Work</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#777] max-w-sm">
            Scroll down to advance through full-screen production samples.
          </p>
        </div>
      </div>

      {/* Stacking Card Canvas */}
      <div ref={cardsContainerRef} className="relative">
        {CLIENT_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={CLIENT_PROJECTS.length}
            scrollYProgress={scrollYProgress}
            currentlyPlayingId={currentlyPlayingId}
            onSetCurrentlyPlaying={setCurrentlyPlayingId}
            onOpenModal={(videoData) => {
              setCurrentlyPlayingId(null);
              setActiveModalVideo(videoData);
            }}
          />
        ))}
      </div>

      {/* Cinematic 4K Video Lightbox Modal */}
      <VideoModal
        video={activeModalVideo}
        isOpen={!!activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
      />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  currentlyPlayingId,
  onSetCurrentlyPlaying,
  onOpenModal,
}: {
  project: (typeof CLIENT_PROJECTS)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  currentlyPlayingId: string | null;
  onSetCurrentlyPlaying: (id: string | null) => void;
  onOpenModal: (video: PortfolioVideo) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPlaying = currentlyPlayingId === project.id;

  const range = [index * (1 / total), (index + 1) * (1 / total)];
  const isLast = index === total - 1;

  // Smooth subtle scale: card scales gently down to 0.96 as the next card slides over it
  const scale = useTransform(
    scrollYProgress,
    range,
    isLast ? [1, 1] : [1, 0.96]
  );

  // Soft dimming veil: darkens the card underneath cleanly without transparency flickers
  const dimOverlay = useTransform(
    scrollYProgress,
    range,
    isLast ? [0, 0] : [0, 0.48]
  );

  // Single video player enforcement: play this video if active, pause if another video takes over
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isPlaying]);

  // Auto-pause video when the card is scrolled past / covered by the next card
  useEffect(() => {
    if (isLast) return;
    const threshold = (index + 0.75) / total;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isPlaying && latest > threshold) {
        onSetCurrentlyPlaying(null);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, index, total, isPlaying, isLast, onSetCurrentlyPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      onSetCurrentlyPlaying(null);
    } else {
      onSetCurrentlyPlaying(project.id);
    }
  };

  const handleOpenModal = () => {
    onSetCurrentlyPlaying(null);
    onOpenModal({
      id: project.id,
      title: project.client,
      description: project.description,
      category: project.category,
      videoUrl: project.videoUrl,
      thumbnailUrl: project.thumbnailUrl,
      aspectRatio: project.aspectRatio as "16:9" | "9:16",
      tags: project.tags,
    });
  };

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl h-[82vh] md:h-[84vh] rounded-3xl bg-[#0c0c0c] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row transform-gpu will-change-transform"
      >
        {/* Smooth progressive dimming veil when the card underneath is stacked over */}
        <motion.div
          style={{ opacity: dimOverlay }}
          className="absolute inset-0 bg-[#050505] pointer-events-none z-30"
        />

        {/* LEFT COLUMN: Project Details (Title, Description, Tags) - Hidden when playing, restored when paused/ended */}
        <div className="w-full lg:w-5/12 p-6 sm:p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative z-20 bg-[#0c0c0c]">
          <div
            className={`transition-all duration-300 ${
              isPlaying ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#F00016]">
                SAMPLE 0{index + 1} // 0{total}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 text-[#aaa]">
                {project.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              {project.client}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-[#FF334B] uppercase tracking-wider mb-6">
              {project.category}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#888] leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Clean Relevant Hashtags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/5 text-[11px] font-mono text-[#aaa]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Persistent Mini Playback Bar if playing */}
          {isPlaying && (
            <div className="py-4 my-auto flex items-center justify-between bg-black/60 border border-[#F00016]/30 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F00016] animate-ping" />
                <span className="text-xs font-mono text-white font-medium">Playing Video Sample</span>
              </div>
              <button
                onClick={togglePlay}
                className="text-xs font-mono text-[#FF334B] hover:text-white hover:underline cursor-pointer transition-colors"
              >
                Pause & Restore Info
              </button>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
            <Button
              onClick={togglePlay}
              className="bg-[#F00016] hover:bg-[#D00013] text-white font-semibold text-xs py-5 px-6 rounded-xl flex items-center gap-2 group transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-white" />
                  <span>Pause Video</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Play Sample Reel</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <Button
              onClick={handleOpenModal}
              variant="outline"
              size="sm"
              title="Open in Cinema Lightbox"
              className="bg-black/40 border-white/10 hover:border-white/30 text-[#aaa] hover:text-white text-xs py-5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cinema 4K</span>
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Media Player */}
        <div
          onClick={togglePlay}
          className="w-full lg:w-7/12 relative h-64 lg:h-full bg-[#050505] overflow-hidden cursor-pointer group"
        >
          {/* Active Video Player */}
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.thumbnailUrl}
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => {
              if (currentlyPlayingId !== project.id) {
                onSetCurrentlyPlaying(project.id);
              }
            }}
            onPause={() => {
              if (currentlyPlayingId === project.id) {
                onSetCurrentlyPlaying(null);
              }
            }}
            onEnded={() => {
              if (currentlyPlayingId === project.id) {
                onSetCurrentlyPlaying(null);
              }
            }}
          />

          {/* Thumbnail Image (Fades out when playing) */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={project.thumbnailUrl}
              alt={project.client}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
          </div>

          {/* Center Play Indicator (When Paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-[#F00016] text-white flex items-center justify-center shadow-2xl shadow-[#F00016]/40 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Bottom HUD metadata - Hidden while playing */}
          <div
            className={`absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono text-white/80 pointer-events-none transition-opacity duration-300 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10">
              4K MASTER // PRORES AI
            </span>
            <span className="text-[#aaa] hidden sm:inline-block">
              CLICK TO PLAY
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
