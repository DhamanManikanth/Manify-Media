"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const current = (window.scrollY / totalScroll) * 100;
      setProgress(Math.min(100, Math.max(0, current)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-[120] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#F00016] via-[#FF334B] to-[#FF8595] shadow-[0_0_10px_rgba(240,0,22,0.8)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

