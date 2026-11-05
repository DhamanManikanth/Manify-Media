"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Zap, Sparkles, Box, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import { audio } from "@/lib/audioManager";

const SLIDES = [
  {
    id: "01",
    stat: "80% LOWER COST",
    title: "Eliminate Studio Overhead & Inflated Production Budgets",
    description: "Achieve luxury brand commercials and cinema-grade reveals at 1/5th the expense of traditional camera crews, stage rentals, and insurance.",
    highlight: "Slash cost per commercial asset without sacrificing premium perception.",
    icon: DollarSign,
  },
  {
    id: "02",
    stat: "48-72h TURNAROUND",
    title: "From Creative Brief to Final 4K Master in 3 Days",
    description: "Skip 6-week production lead times. Launch responsive ad campaigns at market speed with rapid neural iteration cycles.",
    highlight: "Outpace competitors by going from concept to conversion in 72 hours.",
    icon: Zap,
  },
  {
    id: "03",
    stat: "UNLIMITED VARIATIONS",
    title: "Test Dozens of Creative Angles & Hooks Simultaneously",
    description: "Generate multi-concept A/B creative variants across different lighting setups, camera lenses, and models without re-shooting.",
    highlight: "Multiply your ad creative volume to scale ROAS predictably on Meta and TikTok.",
    icon: Sparkles,
  },
  {
    id: "04",
    stat: "ZERO LOGISTICS",
    title: "No Location Permits, Talent Scouting, or Gear Rentals",
    description: "Every physical environment, camera movement, and exploded-view particle is rendered digitally with zero travel or weather delays.",
    highlight: "Produce complex cinematic sequences that are impossible with physical cameras.",
    icon: Box,
  },
  {
    id: "05",
    stat: "EASY REVISIONS",
    title: "Iterate Scripts, Lighting & Camera Moves Without Re-Shoots",
    description: "Need to change a voiceover line, background landscape, or product angle? Modify parameters in code without organizing a second shoot.",
    highlight: "Never get locked into an unchangeable physical shoot day.",
    icon: RefreshCw,
  },
];

export default function WhyChooseAI() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (idx: number) => {
    audio.playClick();
    setActiveTab(idx);
  };

  const current = SLIDES[activeTab];
  const Icon = current.icon;

  return (
    <section id="why-ai" className="py-24 bg-[#050505] text-white border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUSINESS ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Why Choose <span className="text-gradient">AI Video Production</span>
          </h2>
          <p className="text-base sm:text-lg text-[#888] leading-relaxed">
            The traditional commercial model is slow, fragile, and bloated. AI production delivers equal or superior fidelity at a fraction of the time and cost.
          </p>
        </div>

        {/* Slide Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === activeTab;
            const TabIcon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => handleTabClick(idx)}
                onMouseEnter={() => audio.playHoverTick()}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-[#141414] border-[#F00016] shadow-xl shadow-[#F00016]/15"
                    : "bg-[#0a0a0a] border-white/5 hover:border-white/20 text-[#777] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[#F00016]" : "text-[#555]"}`}>
                    PHASE {slide.id}
                  </span>
                  <TabIcon className={`w-4 h-4 ${isActive ? "text-[#F00016]" : "text-[#666]"}`} />
                </div>
                <div className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-[#888]"}`}>
                  {slide.stat}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="why-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F00016]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Slide Stage Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#0c0c0c] border border-white/10 p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Big Statement & Facts */}
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-white/10 text-xs font-mono font-bold text-[#F00016]">
                  <span>{current.stat}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {current.title}
                </h3>

                <p className="text-base sm:text-lg text-[#999] leading-relaxed">
                  {current.description}
                </p>

                <div className="p-4 rounded-2xl bg-[#141414] border border-[#222] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F00016] flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-white">
                    {current.highlight}
                  </p>
                </div>
              </div>

              {/* Right Column: Stat Badge & Visual Icon */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-[#080808] border border-white/5 text-center">
                <div className="w-20 h-20 rounded-3xl bg-[#161616] border border-[#282828] flex items-center justify-center mb-6 shadow-xl">
                  <Icon className="w-10 h-10 text-[#F00016]" />
                </div>
                <div className="text-3xl font-black text-white font-mono mb-1">
                  {current.stat}
                </div>
                <span className="text-xs font-mono text-[#777] uppercase tracking-wider">
                  Guaranteed AI Metric
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

