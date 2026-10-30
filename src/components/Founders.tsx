"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Cpu,
  Film,
  TrendingUp,
  Sparkles,
  User,
  CheckCircle2,
} from "lucide-react";

interface Founder {
  id: string;
  name: string;
  role: string;
  photoSrc: string;
  initials: string;
  bioPoints: string[];
  socials: {
    platform: "linkedin" | "instagram" | "youtube";
    label: string;
    href: string;
  }[];
}

const founders: Founder[] = [
  {
    id: "dhaman",
    name: "Dhaman",
    role: "AI Creative Producer | Content Creator | Digital Storyteller",
    photoSrc: "/images/founders/dhaman.jpg",
    initials: "DM",
    bioPoints: [
      "Experience in content creation and AI-powered creative production.",
      "Hands-on experience creating AI-generated videos, advertisements, and visual content.",
      "Managed and created content for Instagram and YouTube channels.",
      "Interested in AI creativity, filmmaking, branding, and digital storytelling.",
      "Passionate about turning creative ideas into impactful content for brands.",
    ],
    socials: [
      { platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/dhaman-manikanth-goli" },
      { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/dhaman_manikanth/?hl=en" },
      { platform: "youtube", label: "YouTube", href: "#" },
    ],
  },
  {
    id: "manideep",
    name: "Manideep",
    role: "AI Enthusiast | AI Agents | Creative Video Production",
    photoSrc: "/images/founders/manideep.jpg",
    initials: "MD",
    bioPoints: [
      "Completed two internships focused on AI agents and AI technologies.",
      "Experience working on AI-powered advertisements and video production.",
      "Interested in building intelligent AI agents and creative automation solutions.",
      "Passionate about combining AI technology with real-world business applications.",
    ],
    socials: [
      { platform: "linkedin", label: "LinkedIn", href: "#" },
      { platform: "instagram", label: "Instagram", href: "#" },
    ],
  },
];

const highlights = [
  {
    icon: Cpu,
    title: "AI & Technology",
    description: "AI agents, automation, and intelligent solutions.",
  },
  {
    icon: Film,
    title: "Creative Production",
    description: "AI advertisements, reels, animations, and storytelling.",
  },
  {
    icon: TrendingUp,
    title: "Digital Growth",
    description: "Content strategy, social media, and brand storytelling.",
  },
];

function SocialIcon({ platform }: { platform: "linkedin" | "instagram" | "youtube" }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

function FounderCard({ founder, index }: { founder: Founder; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl p-[1px] bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#141414] hover:from-[#F00016]/60 hover:via-[#F00016]/20 hover:to-[#242424] transition-all duration-500 group shadow-xl hover:shadow-2xl hover:shadow-[#F00016]/10 flex flex-col"
    >
      <div className="rounded-[23px] bg-[#0c0c0c] p-7 md:p-9 flex flex-col h-full relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F00016]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F00016]/10 transition-colors" />

        {/* Profile Image & Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-7 relative z-10">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#161616] border-2 border-[#242424] group-hover:border-[#F00016]/50 transition-colors duration-500 shadow-md">
            {!imageError ? (
              <Image
                src={founder.photoSrc}
                alt={founder.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f] text-center p-2">
                <div className="w-12 h-12 rounded-full bg-[#F00016]/10 border border-[#F00016]/30 flex items-center justify-center mb-1">
                  <User className="w-6 h-6 text-[#F00016]" />
                </div>
                <span className="text-xs font-bold tracking-wider text-white/90">
                  {founder.initials}
                </span>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
          </div>

          <div className="text-center sm:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors">
              {founder.name}
            </h3>
            <p className="text-xs md:text-sm font-semibold tracking-wide text-[#F00016] uppercase mb-4 leading-relaxed">
              {founder.role}
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              {founder.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.name} on ${social.label}`}
                  className="w-9 h-9 rounded-full bg-[#161616] border border-[#262626] flex items-center justify-center text-[#999] hover:text-white hover:bg-[#F00016] hover:border-[#F00016] transition-all duration-300 shadow-sm"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bio points */}
        <div className="flex-1 space-y-3 pt-6 border-t border-[#1c1c1c] relative z-10">
          {founder.bioPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#F00016] flex-shrink-0 mt-1" />
              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Founders() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#050505] text-white border-t border-[#242424] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F00016]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            The People Behind Manify Media
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Two Minds.{" "}
            <span className="text-gradient">One Creative Vision.</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are two young creators passionate about AI, technology, storytelling, and building creative solutions. We combine our different experiences to turn ideas into engaging digital experiences.
          </p>
        </motion.div>

        {/* Founders Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {founders.map((founder, index) => (
            <FounderCard key={founder.id} founder={founder} index={index} />
          ))}
        </div>

        {/* What We Bring Together */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#888]">
              Our Synergy
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mt-2">What We Bring Together</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="bg-[#0c0c0c] border border-[#222] hover:border-[#F00016]/40 p-7 rounded-2xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#161616] border border-[#262626] group-hover:border-[#F00016]/40 group-hover:bg-[#F00016]/10 flex items-center justify-center mb-5 transition-colors">
                    <Icon className="w-6 h-6 text-[#F00016]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#A3A3A3] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Final Vision Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-[#242424] text-center overflow-hidden">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#F00016]/20 rounded-full blur-2xl pointer-events-none" />
            <Sparkles className="w-7 h-7 text-[#F00016] mx-auto mb-4" />
            <p className="text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed">
              &ldquo;We&apos;re not just creating content. We&apos;re exploring what&apos;s possible when creativity meets AI.&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
