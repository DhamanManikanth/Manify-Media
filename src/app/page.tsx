import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandAds from "@/components/BrandAds";
import ShortFormReels from "@/components/ShortFormReels";
import LongFormVideos from "@/components/LongFormVideos";
import AnimeAnimation from "@/components/AnimeAnimation";
import EducationalServices from "@/components/EducationalServices";
import EducationalGallery from "@/components/EducationalGallery";
import MultilingualServices from "@/components/MultilingualServices";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <Hero />
      <BrandAds />
      <ShortFormReels />
      <LongFormVideos />
      <AnimeAnimation />
      <EducationalServices />
      <EducationalGallery />
      <MultilingualServices />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
