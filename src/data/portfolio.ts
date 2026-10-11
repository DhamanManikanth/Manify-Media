export type PortfolioVideo = {
  id: string;
  title: string;
  description?: string;
  category: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  duration?: string;
  languages?: ("English" | "Telugu" | "Hindi")[];
  subject?: string;
  featured?: boolean;
};

// 1. AI Brand Films & Advertisements
export const brandAds: PortfolioVideo[] = [
  {
    id: "ad-001",
    title: "Luxury Jewelry Brand Commercial",
    description: "Cinematic AI-crafted luxury commercial highlighting exquisite jewelry collections with photorealistic lighting.",
    category: "AI Brand Ads",
    videoUrl: "/videos/jewelry-brand-ad.mp4",
    thumbnailUrl: "/images/thumb-jewelry-brand-ad.jpg",
    aspectRatio: "16:9",
  },
  {
    id: "ad-002",
    title: "Brand Identity & Product Showcase",
    description: "Dynamic visual storytelling designed to elevate modern brand perception and audience engagement.",
    category: "AI Brand Ads",
    videoUrl: "/videos/brand-reel-1.mp4",
    thumbnailUrl: "/images/thumb-brand-reel-1.jpg",
    aspectRatio: "16:9",
  },
  {
    id: "ad-003",
    title: "Next-Gen AI Commercial Teaser",
    description: "High-impact visual effects blending cinematic motion, tailored color palettes, and AI aesthetics.",
    category: "AI Brand Ads",
    videoUrl: "/videos/ai-reel.mp4",
    thumbnailUrl: "/images/thumb-ai-reel.jpg",
    aspectRatio: "16:9",
  }
];

// 2. Short-Form Videos & Reels
export const shortFormReels: PortfolioVideo[] = [
  {
    id: "reel-001",
    title: "AI Visual Concept Reel",
    description: "Scroll-stopping vertical video crafted for Instagram Reels and viral TikTok campaigns.",
    category: "AI Reels",
    videoUrl: "/videos/ai-reel.mp4",
    thumbnailUrl: "/images/thumb-ai-reel.jpg",
    aspectRatio: "9:16",
    languages: ["English"]
  },
  {
    id: "reel-002",
    title: "Digital Avatar & Character Reel",
    description: "Hyper-engaging AI avatar reel with realistic facial expressions and dynamic pacing.",
    category: "AI Reels",
    videoUrl: "/videos/avatar-ai-reel.mp4",
    thumbnailUrl: "/images/thumb-avatar-ai-reel.jpg",
    aspectRatio: "9:16",
    languages: ["Telugu"]
  },
  {
    id: "reel-003",
    title: "Brand Social Promo Reel",
    description: "High-conversion vertical short video built specifically for social media ads.",
    category: "AI Reels",
    videoUrl: "/videos/brand-reel-1.mp4",
    thumbnailUrl: "/images/thumb-brand-reel-1.jpg",
    aspectRatio: "9:16",
    languages: ["Hindi"]
  },
  {
    id: "reel-004",
    title: "Dynamic Motion Showcase",
    description: "Fast-paced editing and audio synchronization optimized for short-form retention.",
    category: "AI Reels",
    videoUrl: "/videos/reel-1.mp4",
    thumbnailUrl: "/images/thumb-reel-1.jpg",
    aspectRatio: "9:16",
    languages: ["English"]
  }
];

// 3. Long-Form AI Video Production
export const longFormVideos: PortfolioVideo[] = [
  {
    id: "long-001",
    title: "Cinematic Narrative Explainer",
    description: "In-depth visual storytelling capturing emotional nuance and technical precision.",
    category: "Long-Form AI Video",
    videoUrl: "/videos/jewelry-brand-ad.mp4",
    thumbnailUrl: "/images/thumb-jewelry-brand-ad.jpg",
    aspectRatio: "16:9",
  },
  {
    id: "long-002",
    title: "Documentary Style Visuals",
    description: "A comprehensive documentary feature blending motion art with AI-driven historical realism.",
    category: "Long-Form AI Video",
    videoUrl: "/videos/educational-2.mp4",
    thumbnailUrl: "/images/thumb-educational-2.jpg",
    aspectRatio: "16:9",
  },
  {
    id: "long-003",
    title: "Corporate & Vision Showcase",
    description: "In-depth explainer video detailing enterprise capabilities, brand legacy, and future roadmap.",
    category: "Long-Form AI Video",
    videoUrl: "/videos/educational-1.mp4",
    thumbnailUrl: "/images/thumb-educational-1.jpg",
    aspectRatio: "16:9",
  }
];

// 4. Anime-Style Animation & 2D Motion
export const animeAnimations: PortfolioVideo[] = [
  {
    id: "anime-001",
    title: "2D Motion & Character Action",
    description: "Stylized 2D animation with fluid character movement, dynamic frame rates, and expressive art.",
    category: "Anime-Style Animation",
    videoUrl: "/videos/2d-animation-1.mp4",
    thumbnailUrl: "/images/thumb-2d-animation-1.jpg",
    aspectRatio: "9:16",
  },
  {
    id: "anime-002",
    title: "Expressive 2D Sequence",
    description: "Fluid anime motion visuals and atmospheric storytelling combining character acting with vibrant environments.",
    category: "Anime-Style Animation",
    videoUrl: "/videos/2d-animation-2.mp4",
    thumbnailUrl: "/images/thumb-2d-animation-2.jpg",
    aspectRatio: "9:16",
  },
  {
    id: "anime-003",
    title: "Creative Animated Story Snippet",
    description: "Artistic 2D animated scenes blending emotional storytelling and custom visual stylization.",
    category: "Anime-Style Animation",
    videoUrl: "/videos/2d-animation-1.mp4",
    thumbnailUrl: "/images/thumb-2d-animation-1.jpg",
    aspectRatio: "9:16",
  }
];

// 5. Educational Videos That Make Learning Easier
export const educationalVideos: PortfolioVideo[] = [
  {
    id: "edu-001",
    title: "Physics: Quantum Mechanics & Science Concepts",
    description: "Visualizing complex scientific concepts into intuitive, easy-to-grasp animated diagrams.",
    category: "Educational",
    videoUrl: "/videos/educational-1.mp4",
    thumbnailUrl: "/images/thumb-educational-1.jpg",
    aspectRatio: "16:9",
    languages: ["English", "Hindi"],
    subject: "Science"
  },
  {
    id: "edu-002",
    title: "History of Ancient Civilizations",
    description: "An animated journey through ancient world events and cultural heritage.",
    category: "Educational",
    videoUrl: "/videos/educational-2.mp4",
    thumbnailUrl: "/images/thumb-educational-2.jpg",
    aspectRatio: "16:9",
    languages: ["English", "Telugu"],
    subject: "History"
  },
  {
    id: "edu-003",
    title: "Mathematics & Visual Explanations",
    description: "Making mathematical principles and problem-solving intuitive through motion graphics.",
    category: "Educational",
    videoUrl: "/videos/educational-3.mp4",
    thumbnailUrl: "/images/thumb-educational-3.jpg",
    aspectRatio: "16:9",
    languages: ["English", "Hindi", "Telugu"],
    subject: "Mathematics"
  }
];
