"use client";

import { useState } from "react";
import { brandAds, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import ScrollPop from "./ScrollPop";
import { Sparkles } from "lucide-react";

export default function BrandAds() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section id="ai-ads" className="py-12 md:py-20 bg-[#080808] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F00016]/10 via-transparent to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <ScrollPop direction="scale" pitchIndex={2}>
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-[#2b2b2b] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Commercial Cinema</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                AI Brand Films & <span className="text-gradient">Advertisements</span>
              </h2>
              <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl">
                Campaign-ready cinematic visuals that bring brands, luxury products, and visionary ideas to life.
              </p>
            </div>
          </div>
        </ScrollPop>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandAds.map((video, index) => (
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
