"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, FileText, Lightbulb, Film, Sliders, CheckCircle2 } from "lucide-react";
import { audio } from "@/lib/audioManager";

const STEPS = [
  {
    num: "01",
    tag: "THE CREATIVE BRIEF",
    title: "Define campaign objectives, target demographics, and high-retention narrative hooks.",
    icon: FileText,
  },
  {
    num: "02",
    tag: "CONCEPT & STORYBOARD",
    title: "Generate rapid AI visual keyframes, stylistic moodboards, and multiple script variations.",
    icon: Lightbulb,
  },
  {
    num: "03",
    tag: "AI VIDEO PRODUCTION",
    title: "Synthesize photorealistic 3D camera moves, fluid physics, and cinematic volumetric lighting.",
    icon: Film,
  },
  {
    num: "04",
    tag: "REVIEW & REFINE",
    title: "Fine-tune pacing, Foley sound effects, color grading, and native multilingual voice dubbing.",
    icon: Sliders,
  },
  {
    num: "05",
    tag: "4K MASTER DELIVERY",
    title: "Export final multi-format 4K deliverables (9:16 vertical & 16:9 landscape) in 48-72 hours.",
    icon: CheckCircle2,
  },
];

export default function IdeationProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 bg-[#050505] text-white border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-STEP TIMELINE PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Our Ideation <span className="text-gradient">Process</span>
          </h2>
          <p className="text-base text-[#888]">
            A lean, frictionless production sprint engineered to take your brand from raw concept to viral execution in days.
          </p>
        </div>

        {/* Central Vertical Connecting Timeline */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Static Background Rail Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 bg-[#1a1a1a] rounded-full" />

          {/* Animated Glowing Fill Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-[2px] -translate-x-1/2 overflow-hidden rounded-full">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-[#F00016] via-[#FF334B] to-[#F00016] shadow-[0_0_12px_rgba(240,0,22,0.8)]"
            />
          </div>

          {/* Step Cards with Scroll-Triggered Reveals */}
          <div className="space-y-12">
            {STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onViewportEnter={() => audio.playHoverTick()}
                  className={`relative flex items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Content Box (One line per step) */}
                  <div className="w-full md:w-1/2 pl-14 md:pl-0">
                    <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#F00016]/50 transition-colors shadow-xl group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F00016]">
                          {step.tag}
                        </span>
                        <span className="text-xs font-mono text-[#555]">
                          STEP {step.num}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                        {step.title}
                      </p>
                    </div>
                  </div>

                  {/* Central Timeline Node Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#121212] border-2 border-[#262626] flex items-center justify-center z-20 shadow-md group-hover:border-[#F00016] transition-colors">
                    <Icon className="w-4 h-4 text-[#F00016]" />
                  </div>

                  {/* Empty Spacer Column for Desktop alternating alignment */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

