"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, MessageSquare, Zap, Tag } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { audio } from "@/lib/audioManager";
import MagneticButton from "./ui/MagneticButton";

const SINGLE_FEATURES = [
  "1 High-retention 9:16 vertical reel or 16:9 commercial",
  "AI-assisted scriptwriting & storyboard concepting",
  "Photorealistic 3D camera direction & volumetric lighting",
  "Custom Foley sound design & beat-sync mastering",
  "Native voice dubbing (English, Telugu, or Hindi)",
  "48-hour delivery with 2 revision cycles",
];

const PACKAGE_12_FEATURES = [
  "12 High-retention viral reels / month (Full content pipeline)",
  "Complete monthly content calendar & viral hook strategy",
  "Consistent character & 3D product asset library",
  "Full audio mastering with custom sound effects & voiceover",
  "Priority 48-hour turnaround sprints for every asset",
  "Unlimited revisions & dedicated creative support",
];

const ENTERPRISE_FEATURES = [
  "High-volume monthly retainers (20 – 50+ video assets)",
  "Dedicated creative director & senior motion designer",
  "Full-funnel A/B hook variant testing for paid ads",
  "Proprietary brand LoRA models & custom CGI pipelines",
  "Priority 24-hour turnaround sprints",
  "Direct Slack/WhatsApp creative communication channel",
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#050505] text-white border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121212] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F00016]" />
            <span>TRANSPARENT PRODUCTION PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Simple, Scalable <span className="text-gradient">Investment Tiers</span>
          </h2>
          <p className="text-base sm:text-lg text-[#888]">
            No studio markups, no hidden equipment surcharges. Predictable pricing built for high-growth brands.
          </p>
        </div>

        {/* 3-Tier Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* TIER 1: Single Reel (1200 - 2000) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden hover:border-white/20 transition-colors"
          >
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#888] mb-2">
                STARTER ASSET
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-3">
                Single Reel
              </h3>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                  ₹1,200 – ₹2,000
                </span>
                <span className="text-xs font-mono text-[#888]">/ per reel</span>
              </div>

              <p className="text-xs text-[#888] leading-relaxed mb-6">
                Perfect for testing our cinematic AI quality or launching a single high-impact promotion.
              </p>

              <div className="space-y-3 mb-8">
                {SINGLE_FEATURES.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#F00016]" />
                    </div>
                    <span className="text-xs text-[#ccc]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              onClick={() => audio.playClick()}
              className="w-full border-white/15 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#F00016]/50 text-white py-5 text-xs font-semibold rounded-2xl transition-all"
            >
              <Link href="#contact">Order Single Reel</Link>
            </Button>
          </motion.div>

          {/* TIER 2: 12-Reel Monthly Package (₹24,000 regular → ₹20,000 discount) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#0e0e0e] border-2 border-[#F00016] p-7 sm:p-8 flex flex-col justify-between shadow-2xl shadow-[#F00016]/20 relative overflow-hidden group lg:-translate-y-2"
          >
            {/* Top Corner Badge */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F00016] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
              <Tag className="w-3 h-3 text-white" />
              <span>SAVE ₹4,000</span>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF334B] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#F00016]" />
                <span>MOST POPULAR PACKAGE</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                12 Reels Monthly Pack
              </h3>

              {/* Price with Discount Callout */}
              <div className="mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-[#666] line-through">₹24,000</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ₹4,000 OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                    ₹20,000
                  </span>
                  <span className="text-xs font-mono text-[#888]">/ 12 reels</span>
                </div>
              </div>

              <p className="text-xs text-[#aaa] leading-relaxed mb-6">
                Our best-value growth package. Get consistent, high-converting video creative delivered throughout the month.
              </p>

              <div className="space-y-3 mb-8">
                {PACKAGE_12_FEATURES.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#F00016]/20 border border-[#F00016]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#F00016]" />
                    </div>
                    <span className="text-xs text-white font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <MagneticButton strength={0.2}>
              <Button
                asChild
                size="lg"
                onClick={() => audio.playClick()}
                className="w-full bg-[#F00016] hover:bg-[#D00013] text-white py-6 text-sm font-semibold rounded-2xl shadow-xl shadow-[#F00016]/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Link href="#contact">
                  <span>Claim 12 Reels for ₹20k</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* TIER 3: Need More? Additional Packages & Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#0a0a0a] border border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden hover:border-white/20 transition-colors"
          >
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#888] mb-2">
                SCALED RETROFITS
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Need more?
              </h3>
              <p className="text-xs font-semibold text-[#FF334B] mb-6">
                Additional packages and enterprise plans: contact our team.
              </p>

              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                  Custom
                </span>
                <span className="text-xs font-mono text-[#888]">/ dedicated scope</span>
              </div>

              <p className="text-xs text-[#888] leading-relaxed mb-6">
                For performance agencies, e-commerce conglomerates, and multi-brand operators requiring continuous creative.
              </p>

              <div className="space-y-3 mb-8">
                {ENTERPRISE_FEATURES.map((feat) => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#181818] border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-2.5 h-2.5 text-[#FF334B]" />
                    </div>
                    <span className="text-xs text-[#aaa]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              onClick={() => audio.playClick()}
              className="w-full border-white/15 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#F00016]/50 text-white py-5 text-xs font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Link href="#contact">
                <MessageSquare className="w-3.5 h-3.5 text-[#F00016]" />
                <span>Talk to Our Team</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
