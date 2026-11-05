"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Sparkles, Layers, Flame, ArrowRight } from "lucide-react";
import { audio } from "@/lib/audioManager";

const slides = [
  {
    num: "01",
    tag: "NEURAL CINEMA",
    title: "AI-Powered Visual Direction",
    description: "Every frame is architected with photorealistic lighting, customized character consistency, and cinematic color grading that elevates brand perception.",
    metric: "4K Cinema Grade",
    image: "/images/thumb-jewelry-brand-ad.jpg",
    icon: Sparkles,
  },
  {
    num: "02",
    tag: "CROSS-MARKET REACH",
    title: "Multilingual Voice & Adaptation",
    description: "Seamless neural dubbing and cultural adaptation across English, Telugu, and Hindi. Expand brand presence nationwide without triple the production budget.",
    metric: "3 Native Languages",
    image: "/images/thumb-ai-reel.jpg",
    icon: Layers,
  },
  {
    num: "03",
    tag: "VIRAL RETENTION",
    title: "Algorithmic Retention Hooks",
    description: "Fast-paced micro-transitions, psychological pattern interrupts, and precision sound design engineered to stop the scroll and drive conversions.",
    metric: "High Retention Pacing",
    image: "/images/thumb-brand-reel-1.jpg",
    icon: Flame,
  },
];

export default function PinnedShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate horizontal translation for slides: 3 cards move sideways across viewport
  const x = useTransform(smoothProgress, [0, 1], ["5%", "-65%"]);
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Track slide index for soft sound trigger
  const lastIndexRef = useRef(0);
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const currentIdx = Math.min(Math.floor(latest * slides.length), slides.length - 1);
      if (currentIdx !== lastIndexRef.current) {
        lastIndexRef.current = currentIdx;
        audio.playHoverTick();
      }
    });
  }, [smoothProgress]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-[var(--bg)] border-y border-white/[0.08]"
    >
      {/* Sticky Fullscreen Pinned Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 md:py-16 px-6 md:px-12 overflow-hidden">
        {/* Top Header of Pinned Stage */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[var(--primary)]">
              FEATURED CAPABILITY
            </span>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-wider">
              HORIZONTAL SCRUB SHOWCASE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-mono text-[#777]">SCROLL TO GLIDE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          </div>
        </div>

        {/* Center: Horizontally Moving Cards Track */}
        <div className="relative w-full my-auto overflow-visible">
          <motion.div
            style={{ x }}
            className="flex items-center gap-8 md:gap-14 w-max cursor-grab active:cursor-grabbing will-change-transform"
          >
            {slides.map((slide, idx) => {
              const start = idx / slides.length;
              const center = (idx + 0.5) / slides.length;
              const end = (idx + 1) / slides.length;

              // Scale and fade card as it nears center of screen
              const scale = useTransform(
                smoothProgress,
                [start - 0.2, center, end + 0.2],
                [0.92, 1.02, 0.92]
              );
              const opacity = useTransform(
                smoothProgress,
                [start - 0.25, center, end + 0.25],
                [0.55, 1, 0.55]
              );

              return (
                <motion.div
                  key={slide.num}
                  style={{ scale, opacity }}
                  className="w-[85vw] sm:w-[600px] md:w-[720px] rounded-3xl bg-[var(--surface)] border border-white/[0.08] hover:border-[var(--primary)]/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-colors flex-shrink-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left: Text Information */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#222] text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                        <slide.icon className="w-3 h-3" />
                        <span>{slide.tag}</span>
                      </div>

                      <div className="text-4xl sm:text-5xl font-black text-white/20 font-mono mb-2">
                        {slide.num}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4 leading-snug">
                        {slide.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
                        {slide.description}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#111] border border-white/10 text-xs font-mono font-semibold text-white">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                        <span>{slide.metric}</span>
                      </div>
                    </div>

                    {/* Right: Cinematic Media Preview */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#050505] group">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 80vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#aaa]">
                        <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                          {slide.num} // ARCHIVE
                        </span>
                        <span className="text-[var(--primary)] font-bold">MANIFY 4K</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Pinned Controls & Scrub Progress Bar */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-[var(--muted)] flex items-center gap-3">
            <span>SCRUB PROGRESS</span>
            <div className="w-36 sm:w-56 h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
                style={{ width: progressBarWidth }}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono text-[#666]">
            <span>HORIZONTAL PINNED SHOWCASE (GSAP & LENIS SYNCED)</span>
            <span className="hidden sm:inline-block">PHASE 01 — 03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
