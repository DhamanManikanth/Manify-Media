"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Lightbulb, Building2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import ScrollPop from "./ScrollPop";
import { soundFx } from "@/lib/sound";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-[#F00016]" />,
    title: "AI Educational Lessons",
    description: "Visually rich concept explanations for schools and modern academies."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-[#F00016]" />,
    title: "Subject-based Videos",
    description: "Deep visual dives into Science, Math, Engineering, and Technology."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-[#F00016]" />,
    title: "Educational Storytelling",
    description: "Transforming abstract complex topics into intuitive, engaging visual narratives."
  },
  {
    icon: <Building2 className="w-8 h-8 text-[#F00016]" />,
    title: "Institution Promos",
    description: "High-conversion awareness and promotional videos for universities and colleges."
  }
];

export default function EducationalServices() {
  return (
    <section id="education" className="py-12 md:py-16 bg-[#080808] text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <ScrollPop direction="left" pitchIndex={1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#2b2b2b] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EdTech & Academy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Making Learning <span className="text-gradient">Visual</span>
              </h2>
              <p className="text-lg md:text-xl text-[#A3A3A3] mb-8 leading-relaxed">
                We help institutions, schools, and creators transform dense, complex topics into captivating AI-powered animated lessons and visual learning masterclasses.
              </p>
              <Button 
                asChild 
                size="lg" 
                onMouseEnter={() => soundFx.playHover(0.1)}
                onClick={() => soundFx.playClick(0.25)}
                className="bg-[#F00016] text-white hover:bg-[#D00013] border border-[#F00016] shadow-lg shadow-[#F00016]/25 hover:scale-105 active:scale-95 transition-all group"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <span>Create Educational Videos</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollPop>
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.82, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                  delay: index * 0.1,
                }}
                onViewportEnter={() => soundFx.playPop(480 + index * 60, 0.18)}
                onMouseEnter={() => soundFx.playHover(0.08)}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-[#050505] p-7 rounded-2xl border border-[#242424] hover:border-[#F00016]/50 shadow-sm hover:shadow-xl hover:shadow-[#F00016]/10 transition-all duration-300"
              >
                <div className="bg-[#121212] border border-[#282828] p-3.5 rounded-xl inline-block mb-4 shadow-sm group-hover:border-[#F00016]/40 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
