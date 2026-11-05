"use client";

import { motion } from "framer-motion";

// Staggered geometric squares and rectangles
const GEOMETRIC_BLOCKS = [
  { id: 1, top: "4%", left: "6%", width: 90, height: 42, delay: 0, duration: 8.5, border: "subtle" },
  { id: 2, top: "2%", left: "28%", width: 52, height: 52, delay: 1.2, duration: 9.2, border: "red" },
  { id: 3, top: "6%", right: "26%", width: 110, height: 38, delay: 2.1, duration: 10.4, border: "subtle" },
  { id: 4, top: "3%", right: "8%", width: 48, height: 48, delay: 0.8, duration: 7.8, border: "red" },
  
  { id: 5, top: "26%", left: "2%", width: 130, height: 46, delay: 1.5, duration: 11.2, border: "subtle" },
  { id: 6, top: "24%", left: "20%", width: 44, height: 44, delay: 3.0, duration: 8.8, border: "subtle" },
  { id: 7, top: "28%", right: "18%", width: 84, height: 50, delay: 2.4, duration: 9.6, border: "red" },
  { id: 8, top: "22%", right: "3%", width: 70, height: 70, delay: 1.8, duration: 10.1, border: "subtle" },

  { id: 9, top: "52%", left: "5%", width: 64, height: 64, delay: 0.6, duration: 9.4, border: "subtle" },
  { id: 10, top: "56%", left: "24%", width: 100, height: 40, delay: 2.8, duration: 11.5, border: "subtle" },
  { id: 11, top: "50%", right: "22%", width: 56, height: 56, delay: 1.4, duration: 8.2, border: "red" },
  { id: 12, top: "54%", right: "5%", width: 120, height: 44, delay: 3.2, duration: 10.8, border: "subtle" },

  { id: 13, bottom: "6%", left: "8%", width: 105, height: 42, delay: 2.0, duration: 10.2, border: "red" },
  { id: 14, bottom: "4%", left: "30%", width: 48, height: 48, delay: 0.4, duration: 8.6, border: "subtle" },
  { id: 15, bottom: "8%", right: "28%", width: 95, height: 45, delay: 1.9, duration: 9.8, border: "subtle" },
  { id: 16, bottom: "5%", right: "7%", width: 60, height: 60, delay: 2.6, duration: 11.0, border: "subtle" },
];

export default function GeometricBlockBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Floating & Fading Geometric Blocks in Normal Black/White/Red Palette */}
      <div className="absolute inset-0">
        {GEOMETRIC_BLOCKS.map((block) => {
          const isRed = block.border === "red";
          const bgClass = isRed ? "bg-[#F00016]/[0.02]" : "bg-white/[0.015]";
          const borderClass = isRed
            ? "border-[#F00016]/20 shadow-[0_0_15px_rgba(240,0,22,0.06)]"
            : "border-white/[0.06]";
          const dotColor = isRed ? "bg-[#F00016]/60" : "bg-white/30";

          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0.1, y: 0 }}
              animate={{
                opacity: [0.15, 0.4, 0.15],
                y: [0, -8, 0],
                x: [0, block.id % 2 === 0 ? 4 : -4, 0],
              }}
              transition={{
                duration: block.duration,
                repeat: Infinity,
                delay: block.delay,
                ease: "easeInOut",
              }}
              className={`absolute rounded-xl border backdrop-blur-[2px] transition-colors ${bgClass} ${borderClass}`}
              style={{
                top: block.top,
                bottom: block.bottom,
                left: block.left,
                right: block.right,
                width: block.width,
                height: block.height,
              }}
            >
              {/* Corner Micro-Dot Detail */}
              <span className={`absolute top-1.5 left-1.5 w-1 h-1 rounded-full ${dotColor}`} />
              <div className="absolute bottom-1 right-2 w-4 h-[1px] bg-white/10" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
