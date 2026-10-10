"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Lightbulb, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-[#F00016]" />,
    title: "AI Educational Lessons",
    description: "Visually rich concept explanations for schools."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-[#F00016]" />,
    title: "Subject-based Videos",
    description: "Deep dives into Science, Math, and Technology."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-[#F00016]" />,
    title: "Educational Storytelling",
    description: "Transforming complex topics into engaging narratives."
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-[#F00016]" />,
    title: "Institution Promos",
    description: "Awareness and promotional videos for colleges."
  }
];

export default function EducationalServices() {
  return (
    <section id="education" className="py-24 bg-[#101010] text-white border-t border-[#242424]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Making Learning Visual
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#A3A3A3] mb-8"
            >
              We help schools and colleges transform complex topics into engaging AI-powered educational videos, animated lessons, and visual learning experiences.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button asChild size="lg" variant="outline" className="bg-[#F00016] text-white hover:bg-red-700 border-[#F00016]">
                <Link href="#contact">Create Educational Videos</Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-[#050505]/50 p-8 rounded-2xl border border-[#242424] backdrop-blur-sm"
              >
                <div className="bg-[#101010] border border-[#242424] p-3 rounded-xl inline-block mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
