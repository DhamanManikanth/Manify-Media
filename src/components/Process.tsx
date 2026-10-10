"use client";

import { motion } from "framer-motion";
import { Search, PenTool, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-8 h-8 text-[#F00016]" />,
    title: "1. Understand",
    description: "Learn about the project, audience, and objective.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-[#F00016]" />,
    title: "2. Create",
    description: "Develop the concept, script, visual direction, and AI-assisted production.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-[#F00016]" />,
    title: "3. Refine",
    description: "Review the content and make agreed revisions.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-[#F00016]" />,
    title: "4. Deliver",
    description: "Prepare and deliver the final video in the requested format and language.",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-[#050505] text-white border-t border-[#242424]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            From Idea to Final Video
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-[#101010] border border-[#242424] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50 relative z-10">
                {step.icon}
              </div>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-[#242424] z-0" />
              )}
              
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-[#A3A3A3]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
