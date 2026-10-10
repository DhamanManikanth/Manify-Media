import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#242424] text-white">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Manify Media Logo"
            width={40}
            height={40}
            className="w-auto h-8 brightness-0 invert"
            priority
          />
          <span className="text-xl font-bold tracking-tight">Manify Media</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          <Link href="#ai-ads" className="text-sm font-medium text-white/80 hover:text-white transition-colors">AI Ads</Link>
          <Link href="#reels" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Reels</Link>
          <Link href="#long-videos" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Long Videos</Link>
          <Link href="#animation" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Animation</Link>
          <Link href="#education" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Education</Link>
        </div>

        <Button asChild variant="default" className="bg-[#F00016] text-white hover:bg-red-700">
          <Link href="#contact">Start Your Project</Link>
        </Button>
      </div>
    </nav>
  );
}
