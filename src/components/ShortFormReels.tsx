"use client";

import { useState } from "react";
import { shortFormReels, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import ScrollPop from "./ScrollPop";
import { Sparkles } from "lucide-react";

export default function ShortFormReels() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section id="reels" className="py-12 md:py-20 bg-[#050505] text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollPop direction="scale" pitchIndex={3}>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Viral Content</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Short-Form Videos & <span className="text-gradient">Reels</span>
            </h2>
            <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl leading-relaxed">
              Scroll-stopping vertical video campaigns engineered for Instagram Reels, YouTube Shorts, and TikTok virality.
            </p>
          </div>
        </ScrollPop>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {shortFormReels.map((video, index) => (
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
