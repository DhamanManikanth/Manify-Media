"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Sparkles, Layers } from "lucide-react";
import ScrollPop from "./ScrollPop";
import { soundFx } from "@/lib/sound";

type PosterCategory = "all" | "brand" | "social" | "promo";

interface Poster {
  id: number;
  src: string;
  alt: string;
  category: PosterCategory;
  categoryLabel: string;
  aspect: "portrait" | "landscape" | "square";
}

const posters: Poster[] = [
  {
    id: 1,
    src: "/images/poster-biryani-blockbuster.jpg",
    alt: "Every Brand Is A Blockbuster – Manify Media",
    category: "brand",
    categoryLabel: "Brand Campaign",
    aspect: "portrait",
  },
  {
    id: 2,
    src: "/images/poster-ai-videos.png",
    alt: "AI-Generated Videos for Ads, Social Media & Business",
    category: "promo",
    categoryLabel: "Promotional Creative",
    aspect: "portrait",
  },
  {
    id: 3,
    src: "/images/work-3.png",
    alt: "Creative Portrait Campaign",
    category: "brand",
    categoryLabel: "Brand Campaign",
    aspect: "portrait",
  },
  {
    id: 4,
    src: "/images/work-4.png",
    alt: "Minimalist Product Campaign",
    category: "social",
    categoryLabel: "Social Media Creative",
    aspect: "portrait",
  },
  {
    id: 5,
    src: "/images/work-5.png",
    alt: "Hair Mask Product Poster",
    category: "promo",
    categoryLabel: "Promotional Creative",
    aspect: "portrait",
  },
  {
    id: 6,
    src: "/images/work-1.png",
    alt: "Cinematic Visual Campaign",
    category: "social",
    categoryLabel: "Social Media Poster",
    aspect: "portrait",
  },
];

const categories: { value: PosterCategory; label: string }[] = [
  { value: "all", label: "All Posters" },
  { value: "brand", label: "Brand Campaigns" },
  { value: "social", label: "Social Media" },
  { value: "promo", label: "Promotional" },
];

function PosterCard({ poster, index, onSelect }: { poster: Poster; index: number; onSelect: (poster: Poster) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springCfg);

  const [isHovered, setIsHovered] = useState(false);
  const [glowCoord, setGlowCoord] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
    setGlowCoord({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.85, y: 35 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 35 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.08,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFx.playHover(0.08);
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundFx.playClick(0.25);
        onSelect(poster);
      }}
      className="masonry-item group cursor-pointer relative rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-[#F00016]/80 transition-shadow duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#F00016]/20 will-change-transform"
    >
      {/* Dynamic Cursor Light Flare Sweep */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(circle 200px at ${glowCoord.x}% ${glowCoord.y}%, rgba(240, 0, 22, 0.5), transparent 75%)`,
        }}
      />

      <div className={`relative ${poster.aspect === "portrait" ? "aspect-[3/4]" : poster.aspect === "landscape" ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Viewfinder Corner Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#F00016] transition-colors z-20" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-[#F00016] transition-colors z-20" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-[#F00016] transition-colors z-20" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#F00016] transition-colors z-20" />

        {/* Hover overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

        {/* Zoom icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-[#F00016] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl shadow-[#F00016]/50 scale-75 group-hover:scale-100">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Card info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.15em] font-mono font-bold text-[#F00016] mb-1.5 block">
            {poster.categoryLabel}
          </span>
          <h3 className="text-white font-bold text-base leading-snug">
            {poster.alt}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function PostersGallery() {
  const [selectedCategory, setSelectedCategory] = useState<PosterCategory>("all");
  const [modalPoster, setModalPoster] = useState<Poster | null>(null);

  const filteredPosters = selectedCategory === "all"
    ? posters
    : posters.filter((p) => p.category === selectedCategory);

  return (
    <section id="posters" className="py-24 bg-[#050505] text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollPop direction="scale" pitchIndex={0}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-bold tracking-[0.2em] uppercase text-[#F00016] mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Creative Brand Visuals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Creative Posters & <span className="text-gradient">Brand Identity</span>
            </h2>
            <p className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl mx-auto leading-relaxed">
              Cinema-quality promotional creative, social media key visuals, and marketing posters designed to stop the scroll.
            </p>
          </div>
        </ScrollPop>

        {/* Filter Pills */}
        <div className="flex justify-center gap-2 md:gap-3 mb-14 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                soundFx.playClick(0.18);
                setSelectedCategory(cat.value);
              }}
              onMouseEnter={() => soundFx.playHover(0.06)}
              className={`px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#F00016] text-white shadow-lg shadow-[#F00016]/30"
                  : "bg-[#111] text-[#888] hover:text-white hover:bg-[#1a1a1a] border border-[#222]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Clean, Normal-Sized 3-in-a-Row Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredPosters.map((poster, index) => (
              <PosterCard
                key={poster.id}
                poster={poster}
                index={index}
                onSelect={setModalPoster}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal - Normal Compact Dimensions */}
      <AnimatePresence>
        {modalPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalPoster(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 p-2.5 bg-[#121212] rounded-full text-white hover:bg-[#F00016] transition-colors z-50 border border-white/10 cursor-pointer"
              onClick={() => setModalPoster(null)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md md:max-w-lg max-h-[82vh] w-full bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#222] shadow-2xl p-3"
            >
              <div className="relative w-full h-[54vh]">
                <Image
                  src={modalPoster.src}
                  alt={modalPoster.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 90vw, 500px"
                />
              </div>
              <div className="p-4 text-center">
                <span className="text-xs font-mono uppercase text-[#F00016] font-bold block mb-1">
                  {modalPoster.categoryLabel}
                </span>
                <h3 className="text-white font-bold text-base">{modalPoster.alt}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
