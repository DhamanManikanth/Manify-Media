"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/scrollToTop";
import { audio } from "@/lib/audioManager";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls down past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    audio.playClick();
    scrollToTop();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          aria-label="Back to top"
          title="Back to Top"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center justify-center w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-[#121212]/90 hover:bg-[#1a1a1a] border border-white/10 hover:border-[#F00016]/60 text-white shadow-xl shadow-black/60 hover:shadow-[0_0_25px_rgba(240,0,22,0.3)] backdrop-blur-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 active:translate-y-0 active:scale-95"
        >
          {/* Subtle Ambient Glow Ring on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#F00016]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Upward Arrow Icon with Subtle Bounce on Hover */}
          <ArrowUp className="w-5 h-5 text-[#ccc] group-hover:text-white transition-transform duration-300 group-hover:-translate-y-0.5" />

          {/* Red Corner Accent Marker */}
          <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#F00016] opacity-75 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

