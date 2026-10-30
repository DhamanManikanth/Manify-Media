"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 flex items-center justify-center min-h-[90vh] bg-[#050505] text-white overflow-hidden">
      {/* Precision architectural background grid */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#F00016]/8 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-[#F00016]/4 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Top Live Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#101010]/90 border border-[#262626] mb-8 text-xs font-semibold tracking-wider uppercase text-white/90 shadow-2xl backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#F00016] animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-[#F00016] relative" />
            </div>
            <Image
              src="/images/logo-red.png"
              alt="Manify Media Emblem"
              width={16}
              height={12}
              className="w-auto h-3.5 object-contain"
              priority
            />
            <span className="text-[#c4c4c4]">Next-Gen AI Creative Production Agency</span>
          </motion.div>

          {/* Main Hero Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.08]">
            Websites That Sell. <br className="hidden md:block" />
            AI Videos That <span className="text-gradient">Captivate.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg md:text-2xl text-[#A3A3A3] mb-12 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            We engineer high-converting digital flagships and cinematic AI video campaigns that turn audience attention into scalable revenue.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto text-base font-semibold px-8 py-6 bg-[#F00016] hover:bg-[#D00013] text-white border border-[#F00016] shadow-xl shadow-[#F00016]/25 group">
              <Link href="#contact" className="flex items-center gap-2">
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base font-semibold px-8 py-6 border-[#282828] bg-[#0c0c0c]/80 backdrop-blur-md text-white hover:bg-[#1a1a1a] hover:border-[#F00016]/50">
              <Link href="#posters">
                Explore Creative Work
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
