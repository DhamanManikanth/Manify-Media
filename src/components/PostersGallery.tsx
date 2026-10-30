"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

type PosterCategory = "all" | "brand" | "social" | "event" | "promo";

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
    src: "/images/work-1.png",
    alt: "AI Fashion Brand Campaign",
    category: "brand",
    categoryLabel: "Brand Campaign",
    aspect: "portrait",
  },
  {
    id: 2,
    src: "/images/work-2.jpeg",
    alt: "Fashion Social Media Poster",
    category: "social",
    categoryLabel: "Social Media Poster",
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
    category: "promo",
    categoryLabel: "Promotional Creative",
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
    src: "/images/work-6.jpeg",
    alt: "Fashion Event Campaign",
    category: "event",
    categoryLabel: "Event Poster",
    aspect: "portrait",
  },
];

const categories: { value: PosterCategory; label: string }[] = [
  { value: "all", label: "All Work" },
  { value: "brand", label: "Brand Campaigns" },
  { value: "social", label: "Social Media" },
  { value: "event", label: "Event Posters" },
  { value: "promo", label: "Promotional" },
];

function PosterCard({ poster, index, onSelect }: { poster: Poster; index: number; onSelect: (poster: Poster) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="masonry-item group cursor-pointer relative rounded-2xl overflow-hidden bg-[#101010] border border-[#242424] hover:border-[#F00016]/40 transition-all duration-500"
      onClick={() => onSelect(poster)}
    >
      <div className={`relative ${poster.aspect === "portrait" ? "aspect-[3/4]" : poster.aspect === "landscape" ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image
          src={poster.src}
          alt={poster.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Zoom icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={false}
            className="w-14 h-14 rounded-full bg-[#F00016]/85 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#F00016]/30"
          >
            <ZoomIn className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Card info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#F00016] mb-2 block">
            {poster.categoryLabel}
          </span>
          <h3 className="text-white font-bold text-lg leading-snug">
            {poster.alt}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

function PosterLightbox({ poster, onClose }: { poster: Poster | null; onClose: () => void }) {
  if (!poster) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-10"
      >
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-[#101010] rounded-full text-white hover:bg-[#F00016] transition-colors z-50"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] max-w-3xl w-full rounded-2xl overflow-hidden bg-[#101010] border border-[#242424]"
        >
          <div className="relative w-full h-[60vh] md:h-[75vh]">
            <Image
              src={poster.src}
              alt={poster.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 90vw, 800px"
            />
          </div>

          <div className="p-6 bg-[#0a0a0a] border-t border-[#242424] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#F00016] mb-1 block">
                {poster.categoryLabel}
              </span>
              <h3 className="text-xl font-bold text-white">{poster.alt}</h3>
            </div>
            <span className="text-xs text-[#666]">Press ESC or click outside to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function PostersGallery() {
  const [activeCategory, setActiveCategory] = useState<PosterCategory>("all");
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

  const filteredPosters = activeCategory === "all"
    ? posters
    : posters.filter((p) => p.category === activeCategory);

  return (
    <section id="posters" className="py-24 md:py-32 bg-[#050505] text-white border-t border-[#242424] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F00016]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#F00016] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Creative Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Posters & <span className="text-gradient">Creative Designs</span>
          </h2>
          <p className="text-[#A3A3A3] text-lg max-w-2xl mx-auto">
            High-converting visuals, branding campaigns, and advertising creatives crafted with AI precision.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.value
                  ? "bg-[#F00016] text-white shadow-md shadow-[#F00016]/30"
                  : "bg-[#0a0a0a] text-[#888] border border-[#242424] hover:border-[#F00016]/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="masonry-grid max-w-6xl mx-auto">
          <AnimatePresence>
            {filteredPosters.map((poster, index) => (
              <PosterCard
                key={poster.id}
                poster={poster}
                index={index}
                onSelect={setSelectedPoster}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <PosterLightbox
        poster={selectedPoster}
        onClose={() => setSelectedPoster(null)}
      />
    </section>
  );
}
