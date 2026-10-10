"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function MultilingualServices() {
  return (
    <section className="py-24 bg-[#101010] text-white relative overflow-hidden border-t border-[#242424]">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-4 bg-[#050505]/50 rounded-full mb-8 border border-[#242424]"
        >
          <Globe className="w-10 h-10 text-[#F00016]" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
        >
          One Idea. Three Languages.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold mb-2">English</span>
            <span className="text-[#A3A3A3]">Global Reach</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-[#242424]"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold mb-2">తెలుగు</span>
            <span className="text-[#A3A3A3]">Telugu</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-[#242424]"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold mb-2">हिन्दी</span>
            <span className="text-[#A3A3A3]">Hindi</span>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-[#A3A3A3] max-w-3xl mx-auto mb-10"
        >
          Multiply your impact. We produce AI-assisted video content, advertisements, and educational explainers seamlessly across English, Telugu, and Hindi.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button asChild size="lg" className="bg-[#F00016] text-white hover:bg-red-700 font-semibold px-8 py-6 text-lg border border-[#F00016]">
            <Link href="#contact">Create Multilingual Videos</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
