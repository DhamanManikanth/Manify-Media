"use client";

import { useState } from "react";
import { educationalVideos, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import ScrollPop from "./ScrollPop";
import { Sparkles } from "lucide-react";

export default function EducationalGallery() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section className="py-8 md:py-14 bg-[#080808] text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollPop direction="scale" pitchIndex={2}>
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Visual Curricula</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Educational Videos That Make <span className="text-gradient">Learning Easier</span>
            </h2>
            <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl leading-relaxed">
              Discover intuitive educational content produced for schools, colleges, and digital learners across multiple disciplines.
            </p>
          </div>
        </ScrollPop>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalVideos.map((video, index) => (
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
