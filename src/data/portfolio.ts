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

export const brandAds: PortfolioVideo[] = [
  {
    id: "ad-001",
    title: "Cinematic Brand Commercial",
    description: "High-end AI-generated commercial for a luxury fashion brand.",
    category: "AI Brand Ads",
    videoUrl: "",
    thumbnailUrl: "/images/work-2.jpeg",
    aspectRatio: "16:9",
  },
  {
    id: "ad-002",
    title: "Product Launch Teaser",
    description: "Dynamic AI video for a tech product reveal.",
    category: "AI Brand Ads",
    videoUrl: "",
    thumbnailUrl: "/images/work-6.jpeg",
    aspectRatio: "16:9",
  },
  {
    id: "ad-003",
    title: "Lifestyle Campaign",
    description: "Engaging lifestyle advertisement generated with AI.",
    category: "AI Brand Ads",
    videoUrl: "",
    thumbnailUrl: "/images/work-3.png",
    aspectRatio: "16:9",
  }
];

export const shortFormReels: PortfolioVideo[] = [
  {
    id: "reel-001",
    title: "Social Media Promo",
    description: "Engaging vertical video for Instagram Reels.",
    category: "AI Reels",
    videoUrl: "",
    thumbnailUrl: "/images/work-1.png",
    aspectRatio: "9:16",
    languages: ["English"]
  },
  {
    id: "reel-002",
    title: "Brand Story Snippet",
    description: "Short storytelling video for TikTok.",
    category: "AI Reels",
    videoUrl: "",
    thumbnailUrl: "/images/work-4.png",
    aspectRatio: "9:16",
    languages: ["Telugu"]
  },
  {
    id: "reel-003",
    title: "Product Highlight",
    description: "Quick product showcase for YouTube Shorts.",
    category: "AI Reels",
    videoUrl: "",
    thumbnailUrl: "/images/work-5.png",
    aspectRatio: "9:16",
    languages: ["Hindi"]
  }
];

export const longFormVideos: PortfolioVideo[] = [
  {
    id: "long-001",
    title: "Corporate Explainer",
    description: "In-depth explainer video detailing corporate vision.",
    category: "Long-Form AI Video",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  },
  {
    id: "long-002",
    title: "Documentary Style Feature",
    description: "A short documentary generated using AI visuals.",
    category: "Long-Form AI Video",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  },
  {
    id: "long-003",
    title: "Narrative Storytelling",
    description: "Engaging visual narrative blending motion and AI art.",
    category: "Long-Form AI Video",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  }
];

export const animeAnimations: PortfolioVideo[] = [
  {
    id: "anime-001",
    title: "Cyberpunk Cityscape",
    description: "Anime-style 2D animation set in a futuristic world.",
    category: "Anime-Style Animation",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  },
  {
    id: "anime-002",
    title: "Fantasy Character Teaser",
    description: "Expressive character animation with AI.",
    category: "Anime-Style Animation",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  },
  {
    id: "anime-003",
    title: "Animated Brand Story",
    description: "A 2D anime-style commercial for a beverage brand.",
    category: "Anime-Style Animation",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
  }
];

export const educationalVideos: PortfolioVideo[] = [
  {
    id: "edu-001",
    title: "Physics: Quantum Mechanics",
    description: "Visualizing complex quantum concepts.",
    category: "Educational",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
    languages: ["English", "Hindi"],
    subject: "Science"
  },
  {
    id: "edu-002",
    title: "History of Ancient Civilizations",
    description: "An animated journey through ancient history.",
    category: "Educational",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
    languages: ["English", "Telugu"],
    subject: "History"
  },
  {
    id: "edu-003",
    title: "Mathematics: Calculus Explained",
    description: "Making calculus intuitive through motion graphics.",
    category: "Educational",
    videoUrl: "",
    thumbnailUrl: "",
    aspectRatio: "16:9",
    languages: ["English", "Hindi", "Telugu"],
    subject: "Mathematics"
  }
];
