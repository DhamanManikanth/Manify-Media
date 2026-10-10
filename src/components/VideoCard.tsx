"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { PortfolioVideo } from "@/data/portfolio";

interface VideoCardProps {
  video: PortfolioVideo;
  index: number;
  onClick: (video: PortfolioVideo) => void;
}

export default function VideoCard({ video, index, onClick }: VideoCardProps) {
  const isPortrait = video.aspectRatio === "9:16";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(video)}
      className={`relative ${isPortrait ? "aspect-[9/16]" : "aspect-video"} rounded-2xl overflow-hidden group cursor-pointer bg-[#101010] border border-[#242424] shadow-sm hover:shadow-xl hover:shadow-[#F00016]/10 transition-all duration-500`}
    >
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={isPortrait ? "(max-width: 768px) 50vw, 33vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#050505] p-6 text-center">
          <div className="w-12 h-12 bg-[#101010] border border-[#242424] rounded-full flex items-center justify-center mb-4">
            <Play className="w-5 h-5 text-[#A3A3A3] ml-1" />
          </div>
          <span className="text-[#A3A3A3] text-sm font-medium">Coming Soon</span>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
        <div className="w-16 h-16 bg-[#F00016]/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg shadow-[#F00016]/20 text-white">
          <Play className="w-6 h-6 ml-1 fill-white" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        {video.languages && video.languages.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {video.languages.map(lang => (
              <span key={lang} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/20 backdrop-blur-md text-white rounded border border-white/10">
                {lang}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-lg md:text-xl font-bold text-white mb-1 drop-shadow-md">{video.title}</h3>
        {video.description && (
          <p className="text-[#A3A3A3] text-sm line-clamp-2 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hidden md:block">{video.description}</p>
        )}
      </div>
    </motion.div>
  );
}
