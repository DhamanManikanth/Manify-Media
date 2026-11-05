"use client";

import { useState } from "react";
import { longFormVideos, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import ScrollPop from "./ScrollPop";
import { Sparkles } from "lucide-react";

export default function LongFormVideos() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section id="long-videos" className="py-12 md:py-20 bg-[#080808] text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollPop direction="scale" pitchIndex={4}>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181818] border border-[#2b2b2b] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cinematic Storytelling</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Long-Form AI <span className="text-gradient">Production</span>
            </h2>
            <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl leading-relaxed">
              From deep narrative storytelling and documentary visualizers to technical explainers, we turn vision into cinematic reality.
            </p>
          </div>
        </ScrollPop>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {longFormVideos.map((video, index) => (
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
