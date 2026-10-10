"use client";

import { useState } from "react";
import { animeAnimations, PortfolioVideo } from "@/data/portfolio";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AnimeAnimation() {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  return (
    <section id="animation" className="py-24 bg-[#050505] text-white border-t border-[#242424]">
      <div className="container mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end">
          <div className="max-w-2xl mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Anime-Style Animation & 2D Motion
            </h2>
            <p className="text-xl text-[#A3A3A3] max-w-2xl">
              Character-driven stories, expressive animation, and imaginative worlds created with the power of AI.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-[#F00016] text-white hover:bg-red-700 border border-[#F00016]">
            <Link href="#contact">Create an Animation With Us</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeAnimations.map((video, index) => (
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
