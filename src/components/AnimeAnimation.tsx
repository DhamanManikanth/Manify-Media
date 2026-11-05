"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { animeAnimations, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight, Cpu, Scan } from "lucide-react";
import { soundFx } from "@/lib/sound";
import TextScramble from "./ui/TextScramble";

export default function AnimeAnimation() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger matrix digital scan line when section enters viewport
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <section
      id="animation"
      ref={containerRef}
      className="py-16 md:py-24 bg-[#050505] text-white relative overflow-hidden"
    >
      {/* =========================================================================
          FAST HORIZONTAL SCANNING LINE (TOP TO BOTTOM)
          High-tech laser line that sweeps across elements when entering viewport
         ========================================================================= */}
      {isInView && (
        <>
          <motion.div
            initial={{ top: "-2%", opacity: 0 }}
            animate={{ top: "102%", opacity: [0, 1, 1, 0.9, 0] }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F00016] to-transparent shadow-[0_0_24px_#F00016,0_0_8px_#fff] pointer-events-none z-30"
          />
          {/* Subtle trailing scan wash */}
          <motion.div
            initial={{ top: "-15%", opacity: 0 }}
            animate={{ top: "95%", opacity: [0, 0.35, 0] }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 h-24 bg-gradient-to-b from-[#F00016]/15 to-transparent pointer-events-none z-20"
          />
        </>
      )}

      {/* =========================================================================
          SUBTLE VERTICAL GRID-GLITCH TRANSPARENCY MASK
          Phases out into crystal-clear view as the scanning line passes
         ========================================================================= */}
      <motion.div
        initial={{ opacity: 0.7 }}
        animate={isInView ? { opacity: 0 } : { opacity: 0.7 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(240,0,22,0.02) 0px, rgba(240,0,22,0.02) 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-14 md:flex justify-between items-end">
          <div className="max-w-2xl mb-8 md:mb-0">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
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

            <p className="text-base sm:text-lg text-[#A3A3A3] max-w-2xl leading-relaxed">
              Character-driven stories, expressive Japanese anime-style animation, and imaginative worlds crafted with cutting-edge AI pipelines.
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
              <span>Create an Animation With Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* =========================================================================
            3 VIDEOS SIDE BY SIDE (3 IN A ROW)
            Staggered digital matrix phase-in
           ========================================================================= */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {animeAnimations.slice(0, 3).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              <VideoCard
                video={video}
                index={index}
                onClick={setSelectedVideo}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
