"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { Search, PenTool, CheckCircle, Rocket } from "lucide-react";
import { soundFx } from "@/lib/sound";

interface ProcessStep {
  number: string;
  dayBadge: string;
  icon: typeof Search;
  iconEmoji: string;
  title: string;
  description: string;
  detail: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    dayBadge: "DAY 1",
    icon: Search,
    iconEmoji: "🔍",
    title: "Discovery & Creative Audit",
    description: "We analyze your brand DNA, target demographics, and competitors to architect high-retention creative hooks.",
    detail: "Deep dive into your visual identity, platform algorithms, and audience psychology to build a foolproof roadmap.",
  },
  {
    number: "02",
    dayBadge: "DAY 2–3",
    icon: PenTool,
    iconEmoji: "🗺️",
    title: "Concept, Script & Direction",
    description: "Developing narrative frameworks, cinematic AI prompts, shot sequences, and multilingual storytelling.",
    detail: "Collaborative script refinement and visual styling alignment before full production rollout.",
  },
  {
    number: "03",
    dayBadge: "DAY 4–5",
    icon: CheckCircle,
    iconEmoji: "⚡",
    title: "AI Production & Fine-Tuning",
    description: "Generating photorealistic visual assets, cinematic sound design, neural voiceovers, and fluid motion graphics.",
    detail: "Frame-by-frame quality assurance and feedback loops to ensure every cut exceeds industry standards.",
  },
  {
    number: "04",
    dayBadge: "DAY 6–7",
    icon: Rocket,
    iconEmoji: "🚀",
    title: "Master Delivery & Scaling",
    description: "Exporting optimized multi-platform cuts (9:16 vertical reels, 16:9 ads) in English, Telugu, and Hindi.",
    detail: "Distribution-ready master files delivered with guidance to maximize algorithmic reach and conversion.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-12 md:py-20 bg-[#050505] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header (Cinematic Glide) */}
        <motion.div
          className="text-center mb-16 md:mb-24 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#222] text-[11px] font-mono uppercase tracking-[0.2em] text-[#F00016] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F00016]" />
            <span>Workflow Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            From Idea to <span className="text-gradient">Viral Results</span>
          </h2>

          <p className="text-[#888] text-sm md:text-base">
            From initial creative audit to 4K master delivery in 7 days or less.
          </p>
        </motion.div>

        {/* Central Motion Graphics Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#F00016] via-[#FF334B] to-[#F00016]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Tracer node */}
          <motion.div
            className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full pointer-events-none z-20"
            style={{
              top: lineHeight,
              background: "#F00016",
              boxShadow: "0 0 12px 3px rgba(240, 0, 22, 0.6)",
              marginTop: "8px",
            }}
          />

          <div className="space-y-16 md:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const stepProgressStart = index / steps.length;
              const stepProgressEnd = (index + 0.6) / steps.length;

              return (
                <TimelineStepItem
                  key={step.number}
                  step={step}
                  isEven={isEven}
                  smoothProgress={smoothProgress}
                  stepProgressStart={stepProgressStart}
                  stepProgressEnd={stepProgressEnd}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStepItem({
  step,
  isEven,
  smoothProgress,
  stepProgressStart,
  stepProgressEnd,
}: {
  step: ProcessStep;
  isEven: boolean;
  smoothProgress: MotionValue<number>;
  stepProgressStart: number;
  stepProgressEnd: number;
}) {
  const cardOpacity = useTransform(smoothProgress, [Math.max(0, stepProgressStart - 0.1), stepProgressStart + 0.1], [0.35, 1]);
  const cardY = useTransform(smoothProgress, [Math.max(0, stepProgressStart - 0.1), stepProgressStart + 0.1], [15, 0]);

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
      {/* Step Number Circle */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#0a0a0a] border border-[#2b2b2b] flex items-center justify-center shadow-lg">
          <span className="text-xs font-mono font-bold text-white">
            {step.number}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
        {/* LEFT COLUMN */}
        <div className={`pl-14 md:pl-0 ${isEven ? "md:text-right" : "hidden md:block"}`}>
          {isEven ? (
            <motion.div
              style={{ opacity: cardOpacity, y: cardY }}
              onMouseEnter={() => soundFx.playHover(0.015)}
              className="rounded-2xl bg-[#0c0c0c] border border-[#202020] hover:border-[#F00016]/40 p-6 sm:p-7 text-left relative overflow-hidden transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.iconEmoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#141414] border border-[#242424] text-[#F00016] flex-shrink-0">
                  {step.dayBadge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#888] leading-relaxed mb-3">
                {step.description}
              </p>

              <p className="text-[11px] text-[#666] leading-relaxed pt-2.5 border-t border-[#181818]">
                {step.detail}
              </p>
            </motion.div>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className={`pl-14 md:pl-0 ${!isEven ? "" : "hidden md:block"}`}>
          {!isEven ? (
            <motion.div
              style={{ opacity: cardOpacity, y: cardY }}
              onMouseEnter={() => soundFx.playHover(0.015)}
              className="rounded-2xl bg-[#0c0c0c] border border-[#202020] hover:border-[#F00016]/40 p-6 sm:p-7 text-left relative overflow-hidden transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.iconEmoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>

                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#141414] border border-[#242424] text-[#F00016] flex-shrink-0">
                  {step.dayBadge}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#888] leading-relaxed mb-3">
                {step.description}
              </p>

              <p className="text-[11px] text-[#666] leading-relaxed pt-2.5 border-t border-[#181818]">
                {step.detail}
              </p>
            </motion.div>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </div>
    </div>
  );
}
