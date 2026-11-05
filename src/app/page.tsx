import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MotionTicker from "@/components/MotionTicker";
import AgencyIntro from "@/components/AgencyIntro";
import WhyChooseAI from "@/components/WhyChooseAI";
import ClientWorkStack from "@/components/ClientWorkStack";
import CostCalculator from "@/components/CostCalculator";
import VerticalVideoReveal from "@/components/VerticalVideoReveal";
import PinnedShowcase from "@/components/scroll/PinnedShowcase";
import LongVideoRail from "@/components/LongVideoRail";
import IdeationProcess from "@/components/IdeationProcess";
import ClipPathScrollReveal from "@/components/ClipPathScrollReveal";
import SectionPortal from "@/components/SectionPortal";
import BrandAds from "@/components/BrandAds";
import AnimeAnimation from "@/components/AnimeAnimation";
import EducationalServices from "@/components/EducationalServices";
import EducationalGallery from "@/components/EducationalGallery";
import MultilingualServices from "@/components/MultilingualServices";
import PostersGallery from "@/components/PostersGallery";
import Pricing from "@/components/Pricing";
import Founders from "@/components/Founders";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      {/* Navigation with Working Sound Toggle */}
      <Navbar />

      {/* 1. Hero Section with Cursor-Reactive Canvas & Masked Digital Reveal */}
      <Hero />

      <MotionTicker />

      {/* 2. Intro: Short 2-3 Line "Who We Are" Block Near The Top */}
      <AgencyIntro />

      {/* 3. Sample Work: Fullscreen Stacking Slides (Immediately follows tagline & intro) */}
      <ClientWorkStack />

      {/* 4. AI Cost & Time Converter (Interactive ROI Calculator) */}
      <CostCalculator />

      {/* 5. Vertical Videos: 3-Video Reveal with Working Audio Unmute & Sample Work Tags */}
      <VerticalVideoReveal />

      {/* Pinned Scrubbed Section: 3-Phase Neural Pipeline */}
      <PinnedShowcase />

      {/* 6. Long Videos: Horizontal Draggable Rail (Inertia Drag, Hover Preview & Lightbox) */}
      <LongVideoRail />

      {/* Secondary Commercial Showcase */}
      <SectionPortal chapterNumber="07 // STAGE" chapterTag="AI BRAND CINEMA">
        <BrandAds />
      </SectionPortal>

      {/* 2D Anime Motion (3 videos in a row + Digital Matrix Scanline & Scramble Reveal) */}
      <SectionPortal chapterNumber="08 // STAGE" chapterTag="ANIME & 2D MOTION">
        <AnimeAnimation />
      </SectionPortal>

      {/* Why Choose AI Videos (Explain About AI - Positioned directly after 2D Animation) */}
      <WhyChooseAI />

      {/* EdTech & Visual Education */}
      <SectionPortal chapterNumber="09 // STAGE" chapterTag="VISUAL EDUCATION">
        <EducationalServices />
        <EducationalGallery />
      </SectionPortal>

      {/* Multilingual Reach */}
      <SectionPortal chapterNumber="10 // STAGE" chapterTag="MULTILINGUAL SCALE">
        <MultilingualServices />
      </SectionPortal>

      {/* Creative Posters & Brand Identity */}
      <SectionPortal chapterNumber="11 // STAGE" chapterTag="CREATIVE POSTERS & DESIGN">
        <PostersGallery />
      </SectionPortal>

      {/* 7. Our Ideation Process: Placed AFTER Posters with Scroll-Triggered CSS Clip-Path & GSAP Reveal */}
      <ClipPathScrollReveal shape="polygon">
        <IdeationProcess />
      </ClipPathScrollReveal>

      {/* 9. Pricing Section: 1200-2000 Per Reel Plan + Additional Enterprise Plan */}
      <Pricing />

      {/* Leadership & Story */}
      <SectionPortal chapterNumber="13 // STAGE" chapterTag="LEADERSHIP & STORY">
        <Founders />
      </SectionPortal>

      {/* 10. Final Proposal / CTA: "Let's build your next video with AI" + WhatsApp/Email Link */}
      <Contact />

      <Footer />
    </main>
  );
}
