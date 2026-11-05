"use client";

import { motion } from "framer-motion";
import { Globe, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import ScrollPop from "./ScrollPop";
import { soundFx } from "@/lib/sound";

const languages = [
  { script: "English", label: "Global Reach & International Markets", freq: 440 },
  { script: "తెలుగు", label: "Telugu Regional Market Dominance", freq: 550 },
  { script: "हिन्दी", label: "Hindi Nationwide Pan-India Scale", freq: 660 },
];

export default function MultilingualServices() {
  return (
    <section className="py-12 md:py-20 bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#F00016] via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <ScrollPop direction="scale" pitchIndex={0}>
          <div className="inline-flex items-center justify-center p-4 bg-[#141414] rounded-full mb-8 border border-[#2a2a2a] shadow-lg shadow-[#F00016]/10">
            <Globe className="w-10 h-10 text-[#F00016] animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
            One Idea. <span className="text-gradient">Three Languages.</span>
          </h2>
        </ScrollPop>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12 max-w-4xl mx-auto">
          {languages.map((item, idx) => (
            <motion.div
              key={item.script}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: idx * 0.15,
              }}
              onViewportEnter={() => soundFx.playPop(item.freq, 0.22)}
              onMouseEnter={() => soundFx.playHover(0.08)}
              whileHover={{ y: -8, scale: 1.05 }}
              className="flex-1 w-full p-8 rounded-2xl bg-[#050505] border border-[#262626] hover:border-[#F00016]/60 shadow-lg hover:shadow-2xl hover:shadow-[#F00016]/15 transition-all duration-300"
            >
              <span className="text-3xl md:text-5xl font-black mb-3 block text-gradient">
                {item.script}
              </span>
              <span className="text-[#A3A3A3] text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
        
        <ScrollPop direction="scale" delay={0.2} pitchIndex={3}>
          <p className="text-lg md:text-xl text-[#A3A3A3] max-w-3xl mx-auto mb-10 leading-relaxed">
            Multiply your impact. We produce AI-assisted video content, high-converting commercials, and educational explainers seamlessly across English, Telugu, and Hindi.
          </p>
          
          <Button 
            asChild 
            size="lg" 
            onMouseEnter={() => soundFx.playHover(0.1)}
            onClick={() => soundFx.playClick(0.3)}
            className="bg-[#F00016] text-white hover:bg-[#D00013] font-bold px-8 py-6 text-base border border-[#F00016] shadow-xl shadow-[#F00016]/25 hover:scale-105 active:scale-95 transition-all group"
          >
            <Link href="#contact" className="flex items-center gap-2">
              <span>Create Multilingual Videos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </ScrollPop>
      </div>
    </section>
  );
}
