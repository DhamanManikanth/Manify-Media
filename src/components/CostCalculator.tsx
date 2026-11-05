"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingDown, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { audio } from "@/lib/audioManager";

// =========================================================================
// EDITABLE PRICING & BENCHMARK CONFIGURATION
// You can adjust all rates, traditional benchmarks, and timelines here.
// =========================================================================
export const CALCULATOR_CONFIG = {
  currency: "₹",
  videoTypes: {
    reel: {
      id: "reel",
      label: "Vertical Reel (9:16)",
      ourRateMin: 1200,
      ourRateMax: 2000,
      tradBenchmarkCost: 15000,
      tradTimelineDays: 14,
      ourTimelineDays: 2,
    },
    product_ad: {
      id: "product_ad",
      label: "3D Product Commercial",
      ourRateMin: 2500,
      ourRateMax: 4000,
      tradBenchmarkCost: 35000,
      tradTimelineDays: 21,
      ourTimelineDays: 3,
    },
    brand_film: {
      id: "brand_film",
      label: "Cinematic Brand Film",
      ourRateMin: 5000,
      ourRateMax: 8000,
      tradBenchmarkCost: 75000,
      tradTimelineDays: 30,
      ourTimelineDays: 4,
    },
    explainer: {
      id: "explainer",
      label: "EdTech & Explainer",
      ourRateMin: 2000,
      ourRateMax: 3500,
      tradBenchmarkCost: 30000,
      tradTimelineDays: 20,
      ourTimelineDays: 3,
    },
  },
};

type VideoTypeKey = keyof typeof CALCULATOR_CONFIG.videoTypes;

export default function CostCalculator() {
  const [selectedType, setSelectedType] = useState<VideoTypeKey>("reel");
  const [quantity, setQuantity] = useState(5);
  const [duration, setDuration] = useState("30s");
  const [customBudget, setCustomBudget] = useState<string>("");

  const customBudgetId = useId();
  const quantityRangeId = useId();

  const cfg = CALCULATOR_CONFIG.videoTypes[selectedType];
  const currency = CALCULATOR_CONFIG.currency;

  // Duration multipliers (short 15s to long 90s)
  const durationMultiplier = duration === "15s" ? 0.85 : duration === "30s" ? 1.0 : duration === "60s" ? 1.25 : 1.5;

  // Calculations
  const ourMin = Math.round(cfg.ourRateMin * quantity * durationMultiplier);
  const ourMax = Math.round(cfg.ourRateMax * quantity * durationMultiplier);

  // Traditional cost (uses custom input if provided, otherwise benchmark)
  const userBudgetNum = parseFloat(customBudget);
  const tradEstimatedCost = !isNaN(userBudgetNum) && userBudgetNum > 0
    ? userBudgetNum
    : Math.round(cfg.tradBenchmarkCost * quantity * durationMultiplier);

  const avgOurPrice = (ourMin + ourMax) / 2;
  const moneySaved = Math.max(tradEstimatedCost - avgOurPrice, 0);
  const percentSaved = Math.round((moneySaved / tradEstimatedCost) * 100) || 85;

  const tradDays = Math.round(cfg.tradTimelineDays + quantity * 1.5);
  const ourDays = Math.round(cfg.ourTimelineDays + quantity * 0.4);
  const daysSaved = Math.max(tradDays - ourDays, 1);

  return (
    <section id="calculator" className="py-24 bg-[#080808] text-white border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F00016]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141414] border border-white/10 text-xs font-mono uppercase tracking-[0.2em] text-[#F00016] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ROI CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            AI Cost & Time <span className="text-gradient">Converter</span>
          </h2>
          <p className="text-base sm:text-lg text-[#888]">
            Compare the expense and turnaround time of physical commercial shoots against our AI production suite.
          </p>
        </div>

        {/* 2-Column Converter Studio Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Interactive Controls & Inputs */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c0c0c] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[#F00016]" />
              <span>Project Specifications</span>
            </h3>

            {/* 1. Video Format Selector */}
            <div>
              <label className="text-xs font-mono text-[#888] uppercase tracking-wider block mb-2.5">
                1. Select Asset Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(CALCULATOR_CONFIG.videoTypes) as VideoTypeKey[]).map((key) => {
                  const item = CALCULATOR_CONFIG.videoTypes[key];
                  const isSelected = selectedType === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        audio.playClick();
                        setSelectedType(key);
                      }}
                      className={`p-3 rounded-xl text-left border text-xs font-mono transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#181818] border-[#F00016] text-white shadow-md shadow-[#F00016]/20"
                          : "bg-[#070707] border-white/5 text-[#888] hover:text-white hover:border-white/20"
                      }`}
                    >
                      <div className="font-bold">{item.label}</div>
                      <div className="text-[10px] text-[#555] mt-0.5">
                        {currency}{item.ourRateMin} - {currency}{item.ourRateMax}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Number of Videos Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={quantityRangeId} className="text-xs font-mono text-[#888] uppercase tracking-wider">
                  2. Number of Videos
                </label>
                <span className="text-sm font-mono font-bold text-[#F00016] bg-[#161616] px-2.5 py-0.5 rounded border border-white/10">
                  {quantity} {quantity === 1 ? "Video" : "Videos"}
                </span>
              </div>
              <input
                id={quantityRangeId}
                aria-label="Number of Videos"
                type="range"
                min="1"
                max="20"
                value={quantity}
                onChange={(e) => {
                  setQuantity(parseInt(e.target.value));
                  audio.playHoverTick();
                }}
                className="w-full accent-[#F00016] bg-[#222] h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#555] mt-1">
                <span>1 Video</span>
                <span>10 Videos</span>
                <span>20 Videos</span>
              </div>
            </div>

            {/* 3. Duration Selector */}
            <div>
              <label className="text-xs font-mono text-[#888] uppercase tracking-wider block mb-2">
                3. Typical Target Duration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["15s", "30s", "60s", "90s"].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      audio.playClick();
                      setDuration(d);
                    }}
                    className={`py-2 rounded-xl text-center text-xs font-mono transition-all cursor-pointer ${
                      duration === d
                        ? "bg-[#F00016] text-white font-bold"
                        : "bg-[#070707] border border-white/5 text-[#888] hover:text-white"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Optional Traditional Budget Input */}
            <div>
              <label htmlFor={customBudgetId} className="text-xs font-mono text-[#888] uppercase tracking-wider block mb-1.5">
                4. Your Expected Traditional Budget (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-[#666]">
                  {currency}
                </span>
                <input
                  id={customBudgetId}
                  type="number"
                  placeholder={`e.g. ${tradEstimatedCost.toLocaleString()}`}
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#070707] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#F00016] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Live Estimated ROI & Comparison Outputs */}
          <div className="lg:col-span-6 rounded-3xl bg-[#0c0c0c] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F00016]">
                LIVE ROI PROJECTION
              </span>
              <span className="text-[11px] font-mono text-[#777]">
                ESTIMATED OUTPUT
              </span>
            </div>

            {/* Output Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Our Price Range */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-[#F00016]/40 shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF334B] block mb-1">
                  Our AI Production Price
                </span>
                <div className="text-xl sm:text-2xl font-black text-white font-mono leading-tight">
                  {currency}{ourMin.toLocaleString()} – {currency}{ourMax.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-[#777] mt-1">
                  Timeline: ~{ourDays} Business Days
                </div>
              </div>

              {/* Traditional Agency Benchmark */}
              <div className="p-4 rounded-2xl bg-[#080808] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#777] block mb-1">
                  Traditional Production
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#888] font-mono line-through leading-tight">
                  {currency}{tradEstimatedCost.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-[#555] mt-1">
                  Timeline: ~{tradDays} Days
                </div>
              </div>

              {/* Total Money Saved */}
              <div className="p-4 rounded-2xl bg-[#0f1712] border border-emerald-500/30">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>Money Saved</span>
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {currency}{moneySaved.toLocaleString()}
                </div>
                <div className="text-[11px] font-mono font-bold text-emerald-300 mt-1">
                  ≈ {percentSaved}% Cost Reduction
                </div>
              </div>

              {/* Time Saved */}
              <div className="p-4 rounded-2xl bg-[#141414] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#aaa] flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3 text-[#F00016]" />
                  <span>Time Saved</span>
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {daysSaved} Days
                </div>
                <div className="text-[11px] font-mono text-[#777] mt-1">
                  ≈ {Math.round(daysSaved / 7)} Weeks Faster
                </div>
              </div>
            </div>

            {/* Side-by-Side Visual Comparison Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-mono text-[#888] mb-1.5">
                <span>Cost Comparison Visualizer</span>
                <span className="text-white font-bold">{percentSaved}% Cheaper</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-[#777] mb-0.5">
                    <span>Traditional Shoot</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#3a3a3a] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-[#F00016] mb-0.5">
                    <span>Manify AI Production</span>
                    <span>{100 - percentSaved}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#181818] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(100 - percentSaved, 12)}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#F00016] to-[#FF334B] rounded-full shadow-[0_0_12px_rgba(240,0,22,0.8)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scope Note & Exact Quote CTA */}
            <div className="pt-4 border-t border-white/[0.08] space-y-4">
              <p className="text-[11px] font-mono text-[#666] leading-relaxed">
                * Note: Estimates only. Final pricing depends on project scope, custom 3D asset complexity, and revision iterations.
              </p>

              <Button
                asChild
                size="lg"
                className="w-full bg-[#F00016] hover:bg-[#D00013] text-white py-6 text-sm font-semibold flex items-center justify-center gap-2 shadow-xl shadow-[#F00016]/25 group transition-all"
              >
                <Link href="#contact">
                  <span>Get an exact quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

