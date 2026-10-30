import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientVideos from "@/components/ClientVideos";
import BrandAds from "@/components/BrandAds";
import ShortFormReels from "@/components/ShortFormReels";
import LongFormVideos from "@/components/LongFormVideos";
import AnimeAnimation from "@/components/AnimeAnimation";
import EducationalServices from "@/components/EducationalServices";
import EducationalGallery from "@/components/EducationalGallery";
import MultilingualServices from "@/components/MultilingualServices";
import PostersGallery from "@/components/PostersGallery";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Founders from "@/components/Founders";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#050505]">
      <Navbar />
      <Hero />
      <ClientVideos />
      <BrandAds />
      <ShortFormReels />
      <LongFormVideos />
      <AnimeAnimation />
      <EducationalServices />
      <EducationalGallery />
      <MultilingualServices />
      <PostersGallery />
      <Process />
      <Pricing />
      <Founders />
      <Contact />
      <Footer />
    </main>
  );
}
