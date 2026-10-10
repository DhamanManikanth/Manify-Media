"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Setup Google Sheets endpoint in process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
      const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!endpoint) {
        // Simulate success for now if endpoint isn't set
        setTimeout(() => setStatus("success"), 1500);
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#101010] text-white border-t border-[#242424]">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Have an Idea? Let&apos;s Make It Visual.</h2>
            <p className="text-[#A3A3A3] text-lg">
              Whether you need AI advertisements, anime-style animation, social media videos, or educational content, let&apos;s create something meaningful.
            </p>
          </div>

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-[#050505]/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl text-center border border-[#242424]"
            >
              <div className="w-16 h-16 bg-[#101010] border border-[#242424] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#F00016]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Thank you!</h3>
              <p className="text-[#A3A3A3]">Your project inquiry has been received. We&apos;ll get back to you soon.</p>
              <Button onClick={() => setStatus("idle")} variant="outline" className="mt-8 border-[#242424] bg-[#101010] hover:border-[#F00016]/50">
                Submit Another Inquiry
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#050505]/50 backdrop-blur-sm p-8 md:p-10 rounded-3xl space-y-6 border border-[#242424]">
              {status === "error" && (
                <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  Something went wrong submitting your form. Please try again.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white">Full Name *</label>
                  <input required id="name" name="name" type="text" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="John Doe" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white">Email Address *</label>
                  <input required id="email" name="email" type="email" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white">Phone Number</label>
                  <input id="phone" name="phone" type="tel" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-white">Company / Organization</label>
                  <input id="company" name="company" type="text" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="Your Brand" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-white">Service Required *</label>
                  <select required id="service" name="service" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all appearance-none">
                    <option value="">Select a service...</option>
                    <option value="AI Brand Advertisements">AI Brand Advertisements</option>
                    <option value="Short-Form Reels">Short-Form Reels</option>
                    <option value="Long-Form Videos">Long-Form Videos</option>
                    <option value="Anime-Style 2D Animation">Anime-Style 2D Animation</option>
                    <option value="Educational Videos">Educational Videos for Schools</option>
                    <option value="Multilingual Video Production">Multilingual Video Production</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="language" className="text-sm font-medium text-white">Preferred Language</label>
                  <select id="language" name="language" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all appearance-none">
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Multiple">Multiple Languages</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium text-white">Project Budget</label>
                  <input id="budget" name="budget" type="text" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="e.g. $5,000" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="timeline" className="text-sm font-medium text-white">Expected Timeline</label>
                  <input id="timeline" name="timeline" type="text" className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all" placeholder="e.g. 4 Weeks" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-white">Project Description *</label>
                <textarea required id="message" name="message" rows={4} className="w-full bg-[#101010] border border-[#242424] rounded-lg px-4 py-3 text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#F00016] focus:border-transparent transition-all resize-none" placeholder="Tell us about your goals, audience, and vision..." />
              </div>

              {/* Honeypot field to prevent spam */}
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="pt-2">
                <p className="text-xs text-[#A3A3A3] mb-4 text-center">
                  Your information will only be used to respond to this inquiry. We respect your privacy.
                </p>
                <Button disabled={status === "submitting"} size="lg" className="w-full bg-[#F00016] text-white hover:bg-red-700 text-base font-semibold py-6 disabled:opacity-70">
                  {status === "submitting" ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
