"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const plans = [
  {
    id: "single",
    name: "Single Reel",
    price: "₹2,000",
    period: "per reel",
    description: "Perfect for one-off projects or trying us out.",
    features: [
      "1 professionally produced reel",
      "AI-powered editing & effects",
      "Script & storyboard included",
      "2 revision rounds",
      "Optimized for all platforms",
    ],
    highlighted: false,
  },
  {
    id: "monthly",
    name: "Monthly Package",
    price: "₹20,000",
    period: "per month",
    description: "12 reels per month — the best value for consistent content.",
    features: [
      "12 reels per month",
      "AI-powered editing & effects",
      "Dedicated creative strategist",
      "Unlimited revisions",
      "Priority turnaround",
      "Content calendar planning",
      "Platform-specific optimisation",
    ],
    highlighted: true,
    savings: {
      regular: "₹24,000",
      package: "₹20,000",
      saved: "₹4,000",
    },
  },
];

const ambientParticles = [
  { id: 0, left: "22%", top: "35%", color: "#F00016", x: 10, duration: 3.5, delay: 0 },
  { id: 1, left: "75%", top: "28%", color: "#FF334B", x: -10, duration: 4.0, delay: 0.7 },
  { id: 2, left: "30%", top: "72%", color: "#F00016", x: 8, duration: 4.5, delay: 1.4 },
  { id: 3, left: "78%", top: "68%", color: "#FF334B", x: -12, duration: 3.8, delay: 2.1 },
  { id: 4, left: "50%", top: "18%", color: "#F00016", x: 6, duration: 4.2, delay: 2.8 },
  { id: 5, left: "18%", top: "55%", color: "#FF334B", x: -8, duration: 3.6, delay: 3.5 },
];

function ConcentricCircles({ isActive }: { isActive: boolean }) {
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  const circles = [
    { size: 320, border: "border-[#F00016]/10", delay: 0 },
    { size: 260, border: "border-[#F00016]/20", delay: 1 },
    { size: 200, border: "border-[#FF334B]/18", delay: 2 },
    { size: 150, border: "border-[#F00016]/30", delay: 3 },
    { size: 100, border: "border-[#FF334B]/25", delay: 4 },
  ];

  return (
    <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] mx-auto flex items-center justify-center">
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          custom={circle.delay}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={circleVariants}
          className={`absolute rounded-full border ${circle.border}`}
          style={{
            width: `${(circle.size / 320) * 100}%`,
            height: `${(circle.size / 320) * 100}%`,
          }}
        >
          {/* Subtle rotating glow on outer circles */}
          {i < 2 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
              style={{
                background: `conic-gradient(from 0deg, transparent, ${i === 0 ? "rgba(240,0,22,0.08)" : "rgba(255,51,75,0.06)"}, transparent, transparent)`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Center content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-1">
          Starting at
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white">
          ₹2,000
        </div>
        <div className="text-[#A3A3A3] text-sm mt-1">per reel</div>
      </motion.div>

      {/* Floating particles */}
      {isActive && ambientParticles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: particle.color,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, particle.x, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"],
  });

  const circleScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const smoothScale = useSpring(circleScale, { stiffness: 60, damping: 20 });
  const smoothOpacity = useSpring(circleOpacity, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-24 md:py-32 bg-[#050505] text-white border-t border-[#242424] relative overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F00016]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#FF334B]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
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
            Pricing
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-xl mx-auto">
            Choose the plan that fits your content needs. No hidden fees.
          </p>
        </motion.div>

        {/* Circles + Cards Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Concentric Circles Visual */}
          <motion.div
            className="flex-shrink-0"
            style={{ scale: smoothScale, opacity: smoothOpacity }}
          >
            <ConcentricCircles isActive={true} />
          </motion.div>

          {/* Pricing Cards */}
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className={`relative rounded-2xl p-6 md:p-8 transition-all duration-500 group ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-[#F00016]/10 via-[#101010] to-[#101010] border-[#F00016]/50 border-2 shadow-lg shadow-[#F00016]/10"
                    : "bg-[#101010] border border-[#242424] hover:border-[#F00016]/30"
                }`}
              >
                {/* Recommended badge */}
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-[#F00016] rounded-full text-xs font-bold tracking-wider uppercase text-white shadow-lg shadow-[#F00016]/30"
                    >
                      <Star className="w-3 h-3 fill-current" />
                      Recommended
                    </motion.div>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-6 mt-2">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[#A3A3A3] text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-[#A3A3A3] text-sm">{plan.period}</span>
                  </div>

                  {/* Savings callout */}
                  {plan.savings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                      className="mt-3 flex items-center gap-2 text-sm"
                    >
                      <span className="line-through text-[#666]">{plan.savings.regular}</span>
                      <span className="text-[#F00016] font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Save {plan.savings.saved}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs uppercase tracking-wider text-[#A3A3A3] font-semibold">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#ddd]">
                        <span className="flex-shrink-0 mt-0.5">
                          <Check
                            className="w-4 h-4 text-[#F00016]"
                          />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full text-base font-semibold py-6 transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-[#F00016] text-white hover:bg-[#D00013] shadow-md shadow-[#F00016]/20"
                      : "bg-[#1a1a1a] text-white hover:bg-[#242424] border border-[#333] hover:border-[#F00016]/50"
                  }`}
                >
                  <Link href="#contact">
                    {plan.highlighted ? "Claim Monthly Package" : "Get Started"}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom inquiry note */}
        <motion.div
          className="text-center mt-16 text-[#A3A3A3] text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Need a custom bundle or agency retainer?{" "}
          <Link href="#contact" className="text-white hover:text-[#F00016] underline underline-offset-4 transition-colors">
            Contact us for custom pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
