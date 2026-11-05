"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { Play, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import VideoModal from "./VideoModal";
import { PortfolioVideo } from "@/data/portfolio";

// =========================================================================
// SAMPLE WORK STACKING SLIDES DATA
// =========================================================================
const CLIENT_PROJECTS = [
  {
    id: "client-01",
    client: "Nexa Fine Jewelry",
    category: "3D Product Animation & Reveal",
    resultLine: "High-ROAS 3D cinematic animation replacing expensive physical film shoots",
    description: "Replaced a high-cost physical studio film shoot with hyper-realistic CGI digital reveals, showcasing intricate diamond micro-refractions.",
    badge: "SAVED $65K PRODUCTION BUDGET",
    aspectRatio: "16:9",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/jewelry-brand-ad.mp4",
    thumbnailUrl: "/images/thumb-jewelry-brand-ad.jpg",
    tags: ["3D Cinema", "Hyper-Realistic", "Sample Work"],
  },
  {
    id: "client-02",
    client: "Sample Video · AI Digital Spokesperson",
    category: "AI Avatar & Digital Presenter",
    resultLine: "High-retention digital human spokesperson engineered for conversion",
    description: "High-retention digital human spokesperson with realistic micro-expressions and synchronized multi-lingual articulation, engineered for conversion.",
    badge: "SAMPLE WORK REEL",
    aspectRatio: "9:16",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/avatar-ai-reel.mp4",
    thumbnailUrl: "/images/thumb-avatar-ai-reel.jpg",
    tags: ["Sample Work", "Digital Avatar", "Viral Reel"],
  },
  {
    id: "client-03",
    client: "Chrono Precision Timepieces",
    category: "Digital Macro Gear Reveal",
    resultLine: "Precision exploded-view motion asset engineered without physical prototyping",
    description: "Exploded-view mechanical movement animation highlighting sapphire crystal casing and internal caliber gears without disassembling physical prototypes.",
    badge: "NO PHYSICAL PROTOTYPE REQUIRED",
    aspectRatio: "9:16",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/client-reel-2.mp4",
    thumbnailUrl: "/images/thumb-client-reel-2.jpg",
    tags: ["Macro Optics", "Exploded View", "Sample Work"],
  },
  {
    id: "client-04",
    client: "Hyperion Electric Mobility",
    category: "Cinematic AI Commercial Film",
    resultLine: "$120,000 budget saved compared to traditional automotive film crew",
    description: "Synthesized cinematic mountain switchbacks and volumetric golden hour lighting, providing multi-format ad assets in days instead of months.",
    badge: "48H TURNAROUND CYCLE",
    aspectRatio: "16:9",
    /* SWAP VIDEO / THUMBNAIL URL HERE: */
    videoUrl: "/videos/brand-reel-1.mp4",
    thumbnailUrl: "/images/thumb-brand-reel-1.jpg",
    tags: ["Automotive CGI", "Volumetric Light", "Sample Work"],
  },
];

export default function ClientWorkStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModalVideo, setActiveModalVideo] = useState<PortfolioVideo | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="client-work"
      ref={containerRef}
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
            {/* Title updated to "Sample Work" as explicitly requested */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              Sample <span className="text-gradient">Work</span>
            </h2>
          </div>
          <p className="text-sm font-mono text-[#777] max-w-sm">
            Scroll down to advance through full-screen production samples.
          </p>
        </div>
      </div>

      {/* Stacking Slides Track */}
      <div className="relative">
        {CLIENT_PROJECTS.map((project, index) => {
          const start = index / CLIENT_PROJECTS.length;
          const end = (index + 1) / CLIENT_PROJECTS.length;

          return (
            <ClientSlideCard
              key={project.id}
              project={project}
              index={index}
              total={CLIENT_PROJECTS.length}
              progress={scrollYProgress}
              range={[start, end]}
              onOpenModal={(video) => setActiveModalVideo(video)}
            />
          );
        })}
      </div>

      {/* Video Modal Lightbox */}
      <VideoModal
        video={activeModalVideo}
        isOpen={!!activeModalVideo}
        onClose={() => setActiveModalVideo(null)}
      />
    </section>
  );
}

interface ClientSlideCardProps {
  project: (typeof CLIENT_PROJECTS)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  onOpenModal: (video: PortfolioVideo) => void;
}

function ClientSlideCard({
  project,
  index,
  total,
  progress,
  range,
  onOpenModal,
}: ClientSlideCardProps) {
  const isLast = index === total - 1;
  const cardRef = useRef<HTMLDivElement>(null);

  const scale = useTransform(
    progress,
    range,
    isLast ? [1, 1] : [1, 0.92]
  );
  const opacity = useTransform(
    progress,
    range,
    isLast ? [1, 1] : [1, 0.35]
  );
  const dimOverlay = useTransform(
    progress,
    range,
    isLast ? [0, 0] : [0, 0.65]
  );

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full max-w-6xl h-[82vh] md:h-[84vh] rounded-3xl bg-[#0c0c0c] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row will-change-transform"
      >
        <motion.div
          style={{ opacity: dimOverlay }}
          className="absolute inset-0 bg-black pointer-events-none z-30 transition-opacity"
        />

        {/* LEFT COLUMN: Project Details & Results */}
        <div className="w-full lg:w-5/12 p-6 sm:p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08] relative z-20 bg-[#0c0c0c]/90">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#F00016]">
                SAMPLE 0{index + 1} // 0{total}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 text-[#aaa]">
                {project.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              {project.client}
            </h3>

            <p className="text-xs sm:text-sm font-mono text-[#FF334B] uppercase tracking-wider mb-6">
              {project.category}
            </p>

            <div className="p-4 rounded-2xl bg-[#141414] border border-[#242424] mb-6 flex items-start gap-3 shadow-inner">
              <TrendingUp className="w-5 h-5 text-[#F00016] flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#888] block mb-0.5">
                  Verified Outcome
                </span>
                <p className="text-sm font-semibold text-white leading-snug">
                  {project.resultLine}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#888] leading-relaxed mb-6">
              {project.description}
            </p>

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

          <div className="pt-4 border-t border-white/[0.08] flex items-center gap-4">
            <Button
              onClick={() => {
                onOpenModal({
                  id: project.id,
                  title: project.client,
                  description: project.description,
                  category: project.category,
                  videoUrl: project.videoUrl,
                  thumbnailUrl: project.thumbnailUrl,
                  aspectRatio: project.aspectRatio as "16:9" | "9:16",
                });
              }}
              className="bg-[#F00016] hover:bg-[#D00013] text-white font-semibold text-xs py-5 px-6 rounded-xl flex items-center gap-2 group transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play Sample Reel</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: Media Preview */}
        <div
          onClick={() => {
            onOpenModal({
              id: project.id,
              title: project.client,
              description: project.description,
              category: project.category,
              videoUrl: project.videoUrl,
              thumbnailUrl: project.thumbnailUrl,
              aspectRatio: project.aspectRatio as "16:9" | "9:16",
            });
          }}
          className="w-full lg:w-7/12 relative h-64 lg:h-full bg-[#050505] overflow-hidden cursor-pointer group"
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

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#F00016] text-white flex items-center justify-center shadow-2xl shadow-[#F00016]/40 transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs font-mono text-white/80 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10">
              4K MASTER // PRORES AI
            </span>
            <span className="text-[#aaa] hidden sm:inline-block">
              CLICK TO PREVIEW
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
