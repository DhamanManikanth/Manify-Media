"use client";

import { motion } from "framer-motion";
import { Sparkles, Film, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AgencyIntro() {
  return (
    <section className="py-16 bg-[#070707] border-y border-white/[0.06] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 will-change-transform"
        >
          {/* Left: Who We Are Label */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-[#141414] border border-[#262626] flex items-center justify-center shadow-md">
              <Film className="w-5 h-5 text-[#F00016]" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F00016] font-bold">
                WHO WE ARE
              </div>
              <div className="text-sm font-bold text-white tracking-tight">
                Next-Gen AI Video Agency
              </div>
            </div>
          </div>

          {/* Center: 2-3 line statement */}
          <div className="flex-1">
            <p className="text-base sm:text-lg text-[#ccc] leading-relaxed font-normal">
              <span className="text-white font-semibold">Manify Media</span> engineers high-converting digital animations, commercial product reveals, and retention-focused vertical reels using cutting-edge AI pipelines. We eliminate expensive film crews and physical sets, delivering luxury cinema fidelity in 48 to 72 hours.
            </p>
          </div>

          {/* Right: Quick Action Link */}
          <div className="flex-shrink-0">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-[#FF334B] transition-all py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#F00016]/40 shadow-sm"
            >
              <span>Work With Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F00016]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

