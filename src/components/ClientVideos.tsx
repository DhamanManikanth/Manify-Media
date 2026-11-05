"use client";

import { useState } from "react";
import { clientVideos, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import ScrollPop from "./ScrollPop";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { soundFx } from "@/lib/sound";

export default function ClientVideos() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section id="client-work" className="py-12 md:py-20 bg-[#050505] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F00016]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 md:flex justify-between items-end">
          <ScrollPop direction="scale" pitchIndex={0}>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#2e2e2e] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Client Showcase</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Client Projects & <span className="text-gradient">Commercials</span>
              </h2>
              <p className="text-lg md:text-xl text-[#A3A3A3] leading-relaxed">
                Real-world campaigns and scroll-stopping vertical reels engineered for our brand partners to maximize reach and drive conversions.
              </p>
            </div>
          </ScrollPop>

          <ScrollPop direction="scale" delay={0.15} pitchIndex={1}>
            <div className="mt-6 md:mt-0">
              <Button
                asChild
                size="lg"
                onMouseEnter={() => soundFx.playHover(0.1)}
                onClick={() => soundFx.playClick(0.25)}
                className="bg-[#F00016] text-white hover:bg-[#D00013] border border-[#F00016] group shadow-lg shadow-[#F00016]/25 hover:scale-105 active:scale-95 transition-all"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <span>Produce Your Video</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollPop>
        </div>

        {/* 3-Column Grid for Vertical Client Reels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clientVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onClick={setSelectedVideo}
            />
          ))}
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
