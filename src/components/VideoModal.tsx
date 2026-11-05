"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { PortfolioVideo } from "@/data/portfolio";
import { soundFx } from "@/lib/sound";

interface VideoModalProps {
  video: PortfolioVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      soundFx.playSmoothWhoosh(0.025);
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset play state when video changes
  useEffect(() => {
    if (video) {
      setIsPlaying(false);
    }
  }, [video]);

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-md"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 right-6 p-2.5 bg-[#121212] rounded-full text-white hover:bg-[#F00016] transition-colors z-50 border border-white/10"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full bg-[#050505] rounded-2xl overflow-hidden border border-[#242424] shadow-2xl ${
              video.aspectRatio === "9:16" ? "max-w-sm aspect-[9/16] max-h-[82vh]" : "max-w-3xl aspect-video max-h-[72vh]"
            }`}
          >
            {video.videoUrl ? (
              <video 
                ref={videoRef}
                src={video.videoUrl} 
                controls 
                autoPlay 
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                poster={video.thumbnailUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#101010] p-8 text-center">
                <div className="w-16 h-16 bg-[#F00016]/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#F00016] font-bold">Video coming soon</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                <p className="text-[#A3A3A3]">{video.description}</p>
              </div>
            )}
            
            {/* Text Overlay: Hidden when user plays the video, restored when paused or ended */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-left transition-all duration-300 pointer-events-none z-30 ${
                isPlaying ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">{video.title}</h3>
              {video.description && (
                <p className="text-[#A3A3A3] text-xs sm:text-sm max-w-2xl leading-relaxed mb-2.5">{video.description}</p>
              )}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-[#aaa]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
