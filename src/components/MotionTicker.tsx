"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "AI BRAND COMMERCIALS",
  "4K VERTICAL REELS",
  "MULTILINGUAL PRODUCTION (ENG • TEL • HIN)",
  "2D ANIME MOTION GRAPHICS",
  "HIGH-CONVERTING WEBSITES",
  "48H RAPID TURNAROUND",
  "CINEMATIC COLOR GRADING",
  "ENTERPRISE AI PIPELINES",
];

export default function MotionTicker() {
  return (
    <div className="relative py-4 bg-[#080808] border-y border-[#1c1c1c] overflow-hidden select-none">
      {/* Edge gradient masks for seamless fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 28,
          }}
          className="flex items-center gap-10 whitespace-nowrap"
        >
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-10 text-xs font-mono uppercase tracking-[0.25em] text-[#777]">
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F00016]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

