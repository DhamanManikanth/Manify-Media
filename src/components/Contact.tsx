"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Sparkles, CheckCircle2, Send, MessageCircle, Mail, ArrowRight } from "lucide-react";
import ScrollPop from "./ScrollPop";
import { audio } from "@/lib/audioManager";
import MagneticButton from "./ui/MagneticButton";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    audio.playClick();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!endpoint) {
        // Fallback simulation
        setTimeout(() => {
          setStatus("success");
          audio.playClick();
        }, 1200);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        audio.playClick();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#080808] text-white relative overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F00016]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <ScrollPop direction="scale" pitchIndex={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2b2b2b] text-xs font-bold tracking-[0.25em] uppercase text-[#F00016] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLOSING PROPOSAL</span>
            </div>

            {/* Headline as explicitly requested */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
              Let&apos;s build your next <span className="text-gradient">video with AI</span>
            </h2>

            <p className="text-[#A3A3A3] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to eliminate inflated production overhead and accelerate campaign delivery? Send us your brief below or connect instantly with our team.
            </p>

            {/* Quick Action Channels: WhatsApp & Direct Email */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <a
                href="https://wa.me/919392812239?text=Hi%20Manify%20Media%2C%20I%20want%20to%20build%20my%20next%20video%20with%20AI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audio.playClick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-mono font-bold shadow-lg shadow-[#25D366]/10"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (Instant Response)</span>
              </a>

              <a
                href="mailto:manifymedia09@gmail.com?subject=AI%20Video%20Production%20Inquiry"
                onClick={() => audio.playClick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-[#bbb] hover:text-white hover:border-[#F00016]/50 transition-all text-xs font-mono font-bold"
              >
                <Mail className="w-4 h-4 text-[#F00016]" />
                <span>manifymedia09@gmail.com</span>
              </a>
            </div>
          </div>
        </ScrollPop>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14 bg-[#0c0c0c] border border-[#F00016]/50 rounded-3xl text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-[#161616] border border-[#F00016]/40 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#F00016]" />
            </div>
            <h3 className="text-3xl font-black mb-3 text-white">Inquiry Received!</h3>
            <p className="text-[#A3A3A3] max-w-md mx-auto leading-relaxed mb-8">
              Thank you for reaching out. We&apos;ve logged your brand specifications and our creative director will send your proposal within 24 hours.
            </p>
            <Button
              onClick={() => {
                audio.playClick();
                setStatus("idle");
              }}
              variant="outline"
              className="border-white/15 bg-[#141414] hover:border-[#F00016]/50 text-white"
            >
              Submit Another Inquiry
            </Button>
          </motion.div>
        ) : (
          <ScrollPop direction="scale" delay={0.15} pitchIndex={2}>
            <form
              onSubmit={handleSubmit}
              className="bg-[#050505] p-8 md:p-12 rounded-3xl space-y-6 border border-[#242424] shadow-2xl hover:border-[#F00016]/30 transition-colors"
            >
              {status === "error" && (
                <div className="p-4 bg-red-950/40 border border-[#F00016]/60 rounded-xl text-red-200 text-sm">
                  Something went wrong transmitting your brief. Please try again or chat via WhatsApp.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[#aaa]">
                    1. Your Name *
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    onFocus={() => audio.playHoverTick()}
                    className="w-full bg-[#101010] border border-[#262626] rounded-xl px-4 py-3.5 text-white placeholder:text-[#555] focus:outline-none focus:border-[#F00016] transition-all text-sm font-mono"
                    placeholder="e.g. Dhaman Goli"
                  />
                </div>

                {/* 2. Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#aaa]">
                    2. Email Address *
                  </label>
                  <input
                    required
                    id="email"
                    name="email"
                    type="email"
                    onFocus={() => audio.playHoverTick()}
                    className="w-full bg-[#101010] border border-[#262626] rounded-xl px-4 py-3.5 text-white placeholder:text-[#555] focus:outline-none focus:border-[#F00016] transition-all text-sm font-mono"
                    placeholder="e.g. founder@yourbrand.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3. Brand / Company */}
                <div className="space-y-2">
                  <label htmlFor="brand" className="text-xs font-mono uppercase tracking-wider text-[#aaa]">
                    3. Brand / Company Name *
                  </label>
                  <input
                    required
                    id="brand"
                    name="brand"
                    type="text"
                    onFocus={() => audio.playHoverTick()}
                    className="w-full bg-[#101010] border border-[#262626] rounded-xl px-4 py-3.5 text-white placeholder:text-[#555] focus:outline-none focus:border-[#F00016] transition-all text-sm font-mono"
                    placeholder="e.g. Your Brand or App Name"
                  />
                </div>

                {/* 4. Budget Range */}
                <div className="space-y-2">
                  <label htmlFor="budgetRange" className="text-xs font-mono uppercase tracking-wider text-[#aaa]">
                    4. Budget Range *
                  </label>
                  <select
                    required
                    id="budgetRange"
                    name="budgetRange"
                    onFocus={() => audio.playHoverTick()}
                    className="w-full bg-[#101010] border border-[#262626] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#F00016] transition-all text-sm font-mono"
                  >
                    <option value="₹1,200 – ₹5,000">₹1,200 – ₹5,000 (1-3 Test Reels)</option>
                    <option value="₹5,000 – ₹20,000">₹5,000 – ₹20,000 (Monthly Growth Pack)</option>
                    <option value="₹20,000 – ₹50,000">₹20,000 – ₹50,000 (Multi-Asset Commercials)</option>
                    <option value="₹50,000+">₹50,000+ (Enterprise Retainer / Ongoing)</option>
                  </select>
                </div>
              </div>

              {/* 5. Message / Brief */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[#aaa]">
                  5. Project Details & Vision *
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  onFocus={() => audio.playHoverTick()}
                  className="w-full bg-[#101010] border border-[#262626] rounded-xl px-4 py-3.5 text-white placeholder:text-[#555] focus:outline-none focus:border-[#F00016] transition-all resize-none text-sm font-mono"
                  placeholder="Describe your product, desired video style (reel, 3D reveal, commercial), target timeline, or reference links..."
                />
              </div>

              <div className="pt-2">
                <MagneticButton strength={0.15} className="w-full">
                  <Button
                    disabled={status === "submitting"}
                    size="lg"
                    onMouseEnter={() => audio.playHoverTick()}
                    className="w-full bg-[#F00016] text-white hover:bg-[#D00013] text-base font-bold py-6 disabled:opacity-70 shadow-xl shadow-[#F00016]/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === "submitting" ? "Transmitting Brief..." : "Submit Proposal Brief"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticButton>
              </div>
            </form>
          </ScrollPop>
        )}
      </div>
    </section>
  );
}
