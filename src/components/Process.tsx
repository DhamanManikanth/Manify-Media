"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { Search, PenTool, CheckCircle, Rocket, ArrowDown } from "lucide-react";

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

  // Track vertical path line progress from 0% to 100%
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-36 bg-[#050505] text-white border-t border-[#242424] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#F00016]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold tracking-[0.25em] uppercase text-[#F00016] mb-4"
          >
            <span>Our Process</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            From Idea to <span className="text-gradient">Viral Results</span>
          </h2>

          <p className="text-[#A3A3A3] text-base md:text-lg flex items-center justify-center gap-2">
            <span>From first call to delivery in under a week. Scroll to follow the path.</span>
            <ArrowDown className="w-4 h-4 text-[#F00016] animate-bounce inline-block" />
          </p>
        </motion.div>

        {/* Central Interactive Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
          {/* Continuous Center Track Line (Desktop: Center, Mobile: Left) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[3px] -translate-x-1/2 bg-[#1c1c1c] rounded-full overflow-hidden">
            {/* Animated Red Fill Line */}
            <motion.div
              className="w-full origin-top rounded-full bg-gradient-to-b from-[#F00016] via-[#FF334B] to-[#F00016]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Glowing Lead Tracker Node */}
          <motion.div
            className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full pointer-events-none z-20"
            style={{
              top: lineHeight,
              background: "#FF334B",
              boxShadow: "0 0 16px 5px rgba(240, 0, 22, 0.8), 0 0 32px 10px rgba(255, 51, 75, 0.4)",
              marginTop: "8px",
            }}
          />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-28 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0; // Even = Left on desktop, Odd = Right on desktop
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
  // Smoothly activate node and card based on scroll progress
  const isActiveTransform = useTransform(
    smoothProgress,
    [stepProgressStart, stepProgressEnd],
    [0, 1]
  );

  // Card opacity and scale based on progress
  const cardOpacity = useTransform(smoothProgress, [Math.max(0, stepProgressStart - 0.1), stepProgressStart + 0.1], [0.35, 1]);
  const cardScale = useTransform(smoothProgress, [Math.max(0, stepProgressStart - 0.1), stepProgressStart + 0.1], [0.96, 1]);

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
      {/* Central Step Number Circle (01, 02, etc.) */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div
          style={{ scale: cardScale }}
          className="w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center transition-all duration-500 relative"
        >
          {/* Active Glowing Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#F00016] bg-[#F00016]/10"
            style={{
              opacity: isActiveTransform,
              boxShadow: "0 0 20px 4px rgba(240, 0, 22, 0.45)",
            }}
          />

          {/* Base Node */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0c0c0c] border border-[#2b2b2b] flex items-center justify-center relative z-10 shadow-lg">
            <span className="text-xs md:text-sm font-black tracking-wider text-white">
              {step.number}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Alternating Layout:
          On Desktop:
          - If isEven (01, 03): Card sits on the LEFT (col 1), empty placeholder on the RIGHT.
          - If !isEven (02, 04): Empty placeholder on the LEFT, Card sits on the RIGHT (col 2).
          On Mobile:
          - Card is always pushed to the right of the left timeline track.
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
        {/* LEFT COLUMN (Desktop) */}
        <div className={`pl-14 md:pl-0 ${isEven ? "md:text-right" : "hidden md:block"}`}>
          {isEven ? (
            <motion.div
              style={{ opacity: cardOpacity, scale: cardScale }}
              className="rounded-3xl p-[1px] bg-gradient-to-b from-[#262626] via-[#1a1a1a] to-[#141414] hover:from-[#F00016]/60 hover:to-[#242424] transition-all duration-500 shadow-xl group"
            >
              <div className="rounded-[23px] bg-[#0c0c0c] p-6 sm:p-8 text-left relative overflow-hidden">
                {/* Top Row: Title + Day Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{step.iconEmoji}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#181818] border border-[#2b2b2b] text-[#F00016] shadow-sm flex-shrink-0">
                    {step.dayBadge}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed mb-4">
                  {step.description}
                </p>

                <p className="text-xs sm:text-sm text-[#777] leading-relaxed pt-3 border-t border-[#1a1a1a]">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>

        {/* RIGHT COLUMN (Desktop) */}
        <div className={`pl-14 md:pl-0 ${!isEven ? "" : "hidden md:block"}`}>
          {!isEven ? (
            <motion.div
              style={{ opacity: cardOpacity, scale: cardScale }}
              className="rounded-3xl p-[1px] bg-gradient-to-b from-[#262626] via-[#1a1a1a] to-[#141414] hover:from-[#F00016]/60 hover:to-[#242424] transition-all duration-500 shadow-xl group"
            >
              <div className="rounded-[23px] bg-[#0c0c0c] p-6 sm:p-8 text-left relative overflow-hidden">
                {/* Top Row: Title + Day Badge */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{step.iconEmoji}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#181818] border border-[#2b2b2b] text-[#F00016] shadow-sm flex-shrink-0">
                    {step.dayBadge}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed mb-4">
                  {step.description}
                </p>

                <p className="text-xs sm:text-sm text-[#777] leading-relaxed pt-3 border-t border-[#1a1a1a]">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </div>
    </div>
  );
}
