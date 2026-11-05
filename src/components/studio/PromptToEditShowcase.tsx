"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Sliders, Type, Smartphone, Heart, MessageCircle, Share2, Disc3 } from "lucide-react";
import { audio } from "@/lib/audioManager";

const STAGES = [
  {
    id: "00",
    label: "00 Raw Input",
    prompt: '> raw_input: "Unprocessed smartphone footage, flat neutral color profile, ambient noise"',
    filter: "saturate(0.6) contrast(0.85)",
    aspect: "aspect-video",
    title: "Raw Baseline",
    badge: "INPUT // 1080P",
  },
  {
    id: "01",
    label: "01 AI Scene & Lighting",
    prompt: '> ai_lighting: "Anamorphic bokeh, cinematic volumetric rim lighting, 35mm film grade, 8K"',
    filter: "saturate(1.2) contrast(1.15)",
    aspect: "aspect-video",
    title: "Neural Re-Lighting",
    badge: "AI PASS // 4K",
  },
  {
    id: "02",
    label: "02 Title & Audio Sync",
    prompt: '> audio_typography: "Kinetic typography overlay + neural sound FX & master beat sync"',
    filter: "saturate(1.25) contrast(1.2)",
    aspect: "aspect-video",
    title: "Kinetic Titles & Audio",
    badge: "POST-PROD // MASTER",
  },
  {
    id: "03",
    label: "03 9:16 Vertical Reel",
    prompt: '> smart_reframe: "Auto-reframe to 9:16 vertical, retention hooks for Instagram & TikTok"',
    filter: "saturate(1.25) contrast(1.2)",
    aspect: "aspect-[9/16]",
    title: "Viral Reframe",
    badge: "DELIVERY // 9:16",
  },
];

const springConfig = { stiffness: 260, damping: 25 };

export default function PromptToEditShowcase() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  // Auto-cycle through steps every 3.5s unless paused
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Typewriter effect for active stage prompt
  useEffect(() => {
    const targetPrompt = STAGES[activeStage].prompt;
    let idx = 0;
    setTypewriterText("");

    const interval = setInterval(() => {
      idx++;
      setTypewriterText(targetPrompt.substring(0, idx));
      if (idx >= targetPrompt.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activeStage]);

  const current = STAGES[activeStage];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-5xl mx-auto my-12 p-6 md:p-8 rounded-3xl bg-[#0c0c0c] border border-white/[0.08] shadow-2xl relative overflow-hidden"
    >
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-[10px] font-mono tracking-widest uppercase text-[#F00016] mb-2">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>AI STUDIO WORKSPACE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Prompt-to-Edit <span className="text-gradient">Live Morph</span>
          </h3>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#777]">
          <span>CYCLE: {isPaused ? "PAUSED" : "ACTIVE"}</span>
          <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-500" : "bg-[#F00016] animate-pulse"}`} />
        </div>
      </div>

      {/* 4 Interactive Step Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {STAGES.map((stage, idx) => {
          const isActive = idx === activeStage;
          return (
            <button
              key={stage.id}
              onClick={() => {
                audio.playClick();
                setActiveStage(idx);
                setIsPaused(true);
              }}
              onMouseEnter={() => audio.playHoverTick()}
              className={`px-4 py-3 rounded-xl text-left text-xs font-mono transition-all border ${
                isActive
                  ? "bg-[#161616] border-[#F00016] text-white shadow-lg shadow-[#F00016]/20"
                  : "bg-[#080808] border-white/5 text-[#888] hover:text-white hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold ${isActive ? "text-[#F00016]" : "text-[#555]"}`}>
                  STAGE {stage.id}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F00016]" />}
              </div>
              <div className="font-semibold truncate">{stage.label.replace(/^\d+\s/, "")}</div>
            </button>
          );
        })}
      </div>

      {/* Morphing Canvas Container */}
      <div className="flex items-center justify-center min-h-[360px] md:min-h-[460px] bg-[#050505] rounded-2xl p-4 md:p-8 border border-white/5 relative overflow-hidden">
        {/* Ambient glow reacting to stage */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            activeStage >= 1 ? "opacity-30 bg-[radial-gradient(ellipse_at_center,_rgba(240,0,22,0.25)_0%,_transparent_70%)]" : "opacity-0"
          }`}
        />

        {/* Framer Motion Layout Morphing Frame */}
        <motion.div
          layout
          transition={springConfig}
          className={`relative rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl ${
            activeStage === 3 ? "w-[240px] md:w-[280px] aspect-[9/16]" : "w-full max-w-2xl aspect-video"
          }`}
        >
          {/* Main Visual Image with Filter Morphing */}
          <motion.div
            animate={{ filter: current.filter }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/thumb-jewelry-brand-ad.jpg"
              alt="Prompt-to-Edit Live Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </motion.div>

          {/* Top Frame Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F00016]" />
            <span>{current.badge}</span>
          </div>

          {/* STAGE 02: Centered Typography & Audio Waveform */}
          <AnimatePresence>
            {activeStage === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={springConfig}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none"
              >
                <div className="px-5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 mb-auto mt-auto">
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white drop-shadow-md">
                    DISRUPT THE NORM
                  </h4>
                  <span className="text-[10px] font-mono text-[#FF334B] tracking-widest uppercase">
                    KINETIC TITLE // SYNCED
                  </span>
                </div>

                {/* Animated SVG Audio Waveform Bar */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={springConfig}
                  className="w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-2.5 flex items-center justify-between gap-1"
                >
                  <span className="text-[9px] font-mono text-[#aaa]">A1 STEMS</span>
                  <div className="flex items-end gap-1 h-5 flex-1 max-w-[200px] justify-center">
                    {[12, 18, 8, 20, 15, 6, 22, 17, 10, 24, 14, 9, 20, 16, 11].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#F00016] rounded-full animate-[pulse_0.6s_infinite_ease-in-out]"
                        style={{
                          height: `${h}px`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-[#FF334B]">BEAT DROP</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 03: Vertical Mobile Reel UI Overlay */}
          <AnimatePresence>
            {activeStage === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded">
                    REELS
                  </span>
                </div>

                <div className="flex items-end justify-between mt-auto">
                  <div className="text-left max-w-[160px]">
                    <span className="text-xs font-bold text-white block drop-shadow">@manifymedia</span>
                    <span className="text-[10px] text-white/80 line-clamp-2 drop-shadow">
                      Engineered for viral retention #AI #Commercial
                    </span>
                  </div>

                  {/* Reel Right Action Stack */}
                  <div className="flex flex-col items-center gap-3 text-white">
                    <div className="flex flex-col items-center">
                      <Heart className="w-5 h-5 text-white fill-white" />
                      <span className="text-[9px] font-mono mt-0.5">48.2k</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-[9px] font-mono mt-0.5">1.4k</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-5 h-5" />
                      <span className="text-[9px] font-mono mt-0.5">8.9k</span>
                    </div>
                    <Disc3 className="w-5 h-5 text-[#F00016] animate-spin" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Prompt Bar with Live Typewriter */}
      <div className="mt-6 p-4 rounded-xl bg-[#080808] border border-white/5 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#F00016] animate-pulse flex-shrink-0" />
        <span className="font-mono text-xs text-[#ddd] flex-1 truncate">
          {typewriterText}
          <span className="text-[#F00016] animate-pulse">_</span>
        </span>
      </div>
    </div>
  );
}

