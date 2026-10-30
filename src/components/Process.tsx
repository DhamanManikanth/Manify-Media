"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Search, PenTool, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    description: "Learn about the project, audience, and objective.",
    detail: "Deep research into your brand identity, target audience, and campaign goals to lay the perfect foundation.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Create",
    description: "Develop the concept, script, visual direction, and AI-assisted production.",
    detail: "From storyboarding to AI-powered production, we craft every frame with precision and creative intent.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Refine",
    description: "Review the content and make agreed revisions.",
    detail: "Collaborative feedback loops ensure every detail meets your vision. We iterate until it's perfect.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deliver",
    description: "Prepare and deliver the final video in the requested format and language.",
    detail: "Optimized exports for every platform — ready to captivate your audience and drive results.",
  },
];

function StepCard({ step, index, isActive }: {
  step: typeof steps[0];
  index: number;
  isActive: boolean;
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 md:gap-10 items-start group"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Step number and icon circle */}
      <div className="relative flex-shrink-0 z-10">
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
          animate={{
            scale: isActive ? 1.1 : 1,
            borderColor: isActive ? "#F00016" : "#242424",
            backgroundColor: isActive ? "rgba(240, 0, 22, 0.15)" : "rgba(16, 16, 16, 1)",
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            border: "2px solid",
            boxShadow: isActive
              ? "0 0 20px 4px rgba(240, 0, 22, 0.4), 0 0 40px 8px rgba(255, 51, 75, 0.2)"
              : "0 0 0 0 transparent",
          }}
        >
          <Icon
            className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-500"
            style={{ color: isActive ? "#F00016" : "#666" }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-16 md:pb-24">
        <motion.div
          animate={{
            y: isActive ? 0 : 5,
          }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-500"
              style={{ color: isActive ? "#F00016" : "#555" }}
            >
              Step {step.number}
            </span>
            {isActive && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 1 }}
                className="h-[2px] bg-gradient-to-r from-[#F00016] to-[#FF334B] rounded-full"
              />
            )}
          </div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-500"
            style={{ color: isActive ? "#fff" : "#666" }}
          >
            {step.title}
          </motion.h3>

          <motion.p
            className="text-base md:text-lg leading-relaxed max-w-md transition-colors duration-500"
            style={{ color: isActive ? "#A3A3A3" : "#444" }}
          >
            {step.description}
          </motion.p>

          <motion.p
            className="mt-3 text-sm leading-relaxed max-w-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={isActive ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ color: "#777" }}
          >
            {step.detail}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Track line height progress
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Track active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const stepIndex = Math.min(Math.floor(v * steps.length), steps.length - 1);
      setActiveStep(Math.max(0, stepIndex));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section id="process" className="py-24 md:py-32 bg-[#050505] text-white border-t border-[#242424] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#F00016] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Process
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            From Idea to{" "}
            <span className="text-gradient">Final Video</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-xl mx-auto">
            A streamlined creative workflow designed for speed, quality, and collaboration.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative max-w-2xl mx-auto">
          {/* Vertical line track */}
          <div className="absolute left-[31px] md:left-[39px] top-0 bottom-0 w-[2px] bg-[#1a1a1a]">
            {/* Animated progress line */}
            <motion.div
              className="w-full rounded-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(180deg, #F00016, #FF334B)",
              }}
            />
            {/* Glowing dot at the end of progress */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                top: lineHeight,
                background: "radial-gradient(circle, #F00016, #FF334B)",
                boxShadow: "0 0 16px 4px rgba(240, 0, 22, 0.6), 0 0 32px 8px rgba(255, 51, 75, 0.3)",
                marginTop: "-8px",
              }}
            />
          </div>

          {/* Steps */}
          <div ref={timelineRef}>
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={index <= activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
