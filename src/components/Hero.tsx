"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center min-h-[90vh] bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
            Websites That Sell. <br className="hidden md:block" />
            AI Videos That <span className="text-gradient">Captivate.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-[#A3A3A3] mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            We build premium digital experiences and AI-powered video campaigns that help brands stand out, tell better stories, and grow.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto text-base bg-[#F00016] hover:bg-red-700 text-white border border-[#F00016]">
              <Link href="#contact">
                Start Your Project
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-base border-[#242424] bg-[#101010] text-white hover:bg-[#242424] hover:border-[#F00016]/50">
              <Link href="#ai-ads">
                Explore Our Work
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F00016]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
