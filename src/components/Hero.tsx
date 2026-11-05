"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, Zap, Layers } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import HeroJewelleryVideoReveal from "./HeroJewelleryVideoReveal";
import HeadlineDigitalReveal from "./HeadlineDigitalReveal";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 flex items-center justify-center min-h-[92vh] bg-[#050505] text-white overflow-hidden cursor-crosshair"
    >
      {/* 1. Full-Space Jewellery Video Reveal Background
             Spans the entire space edge-to-edge; moving cursor reveals the jewellery video seamlessly */}
      <HeroJewelleryVideoReveal containerRef={heroRef} />

      <div className="container mx-auto px-6 text-center z-10 relative">
        <div className="max-w-4xl mx-auto">
          {/* Top Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0d0d]/90 border border-white/10 mb-8 text-xs font-mono text-white shadow-sm backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#F00016] animate-pulse" />
            <span className="text-white font-semibold tracking-wide uppercase">NEXT-GEN AI STUDIO</span>
          </motion.div>

          {/* Tagline with Typewriter Backspace Rotation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="mb-6"
          >
            <HeadlineDigitalReveal />
          </motion.div>

          {/* Subtext: max 20 words (Exactly 18 words) - Clean Crisp Muted Text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="text-lg md:text-2xl text-[#888] mb-12 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            We engineer photorealistic digital animations and cinematic product reveals that slash production timelines and costs for ambitious brands.
          </motion.p>

          {/* CTAs: Primary ("Get a Quote") + Secondary ("See our work") */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          >
            {/* Primary CTA Button: Get a Quote */}
            <MagneticButton strength={0.25}>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base font-semibold px-9 py-6 bg-[#F00016] hover:bg-[#D00013] text-white border border-[#F00016] shadow-xl shadow-[#F00016]/25 group transition-all"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>

            {/* Secondary Link: See our work */}
            <MagneticButton strength={0.2}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base font-semibold px-8 py-6 border-[#282828] bg-[#0c0c0c]/80 backdrop-blur-md text-white hover:bg-[#141414] hover:border-[#F00016]/50 transition-all shadow-md shadow-black/30"
              >
                <Link href="#client-work" className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#F00016] fill-[#F00016]" />
                  <span>See our work</span>
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Minimal Production Proof Strip - Normal Clean Dark Palette */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="pt-10 border-t border-[#1a1a1a] max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090909]/80 border border-white/5 text-left hover:border-white/10 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-[#F00016]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">48h Rapid Turnaround</div>
                <div className="text-[11px] text-[#777]">No physical shoot needed</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090909]/80 border border-white/5 text-left hover:border-white/10 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4 text-[#F00016]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">80% Budget Reduction</div>
                <div className="text-[11px] text-[#777]">Cinema output, zero bloat</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#090909]/80 border border-white/5 text-left hover:border-white/10 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#F00016]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">4K Master Delivery</div>
                <div className="text-[11px] text-[#777]">Multi-format 16:9 & 9:16</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
