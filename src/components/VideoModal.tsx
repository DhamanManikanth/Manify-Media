"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { PortfolioVideo } from "@/data/portfolio";

interface VideoModalProps {
  video: PortfolioVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
        >
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-6 right-6 p-2 bg-[#101010] rounded-full text-white hover:bg-[#F00016] transition-colors z-50"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-h-[85vh] bg-[#050505] rounded-2xl overflow-hidden border border-[#242424] ${
              video.aspectRatio === "9:16" ? "max-w-md aspect-[9/16]" : "max-w-5xl aspect-video"
            }`}
          >
            {video.videoUrl ? (
              <video 
                src={video.videoUrl} 
                controls 
                autoPlay 
                playsInline
                preload="metadata"
                className="w-full h-full object-contain bg-black"
                poster={video.thumbnailUrl}
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
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-left pointer-events-none">
              <h3 className="text-2xl font-bold text-white mb-1">{video.title}</h3>
              {video.description && (
                <p className="text-[#A3A3A3] text-sm max-w-2xl">{video.description}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
