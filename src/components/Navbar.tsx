"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { audio } from "@/lib/audioManager";
import { scrollToTop } from "@/lib/scrollToTop";
import MagneticButton from "./ui/MagneticButton";
import { Menu, X, ArrowRight, Volume2, VolumeX } from "lucide-react";

const NAV_LINKS = [
  { href: "#why-ai", label: "Why AI Videos" },
  { href: "#client-work", label: "Client Work" },
  { href: "#calculator", label: "Cost Calculator" },
  { href: "#reels", label: "Vertical Reels" },
  { href: "#process", label: "Ideation Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    setIsSoundOn(audio.isSoundEnabled());

    const unsubscribe = audio.subscribe(() => {
      setIsSoundOn(audio.isSoundEnabled());
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Frosted-glass condition after hero
      setIsScrolled(currentScrollY > 60);

      // Auto-hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleNavClick = () => {
    audio.playClick();
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    audio.playClick();
    setMobileMenuOpen(false);
    scrollToTop();
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", "/");
    }
  };

  const handleNavHover = () => {
    audio.playHoverTick();
  };

  const toggleGlobalSound = () => {
    const newState = audio.toggleSound();
    setIsSoundOn(newState);
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -90 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Always scrolls smoothly to top from any section or page */}
          <Link
            href="/"
            onClick={handleLogoClick}
            onMouseEnter={handleNavHover}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Manify Media Logo"
                width={42}
                height={30}
                className="w-auto h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
              Manify Media
            </span>
          </Link>

          {/* Desktop Nav Links with Animated Underline */}
          <nav className="hidden lg:flex items-center gap-6 relative">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                onMouseEnter={() => {
                  handleNavHover();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative py-1 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
                {hoveredIdx === idx && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F00016] rounded-full shadow-[0_0_8px_rgba(240,0,22,0.8)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action: Sound Toggle + CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Global Working Sound Toggle */}
            <button
              onClick={toggleGlobalSound}
              title={isSoundOn ? "Sound Enabled - Click to Mute" : "Sound Muted - Click to Unmute"}
              className={`p-2.5 rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                isSoundOn
                  ? "bg-[#181818] border-[#F00016]/60 text-white shadow-md shadow-[#F00016]/20"
                  : "bg-[#101010] border-white/10 text-[#777] hover:text-white hover:border-white/25"
              }`}
            >
              {isSoundOn ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#F00016] animate-pulse" />
                  <span className="hidden xl:inline text-[11px] font-mono text-[#F00016] font-bold">
                    SOUND ON
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden xl:inline text-[11px] font-mono text-[#777]">
                    MUTED
                  </span>
                </>
              )}
            </button>

            <div className="hidden sm:block">
              <MagneticButton strength={0.25}>
                <Button
                  asChild
                  variant="default"
                  onMouseEnter={handleNavHover}
                  onClick={handleNavClick}
                  className="bg-[#F00016] text-white hover:bg-[#D00013] shadow-md shadow-[#F00016]/25 transition-transform"
                >
                  <Link href="#contact">Start Your Project</Link>
                </Button>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                audio.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle Mobile Menu"
              className="lg:hidden p-2.5 rounded-xl bg-[#141414] border border-white/10 text-white hover:border-[#F00016]/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu with Staggered Link Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#888] mb-2">
                Navigation
              </span>
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-2xl font-bold text-white hover:text-[#F00016] transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F00016]" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={toggleGlobalSound}
                className="w-full py-3.5 rounded-xl bg-[#141414] border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2"
              >
                {isSoundOn ? <Volume2 className="w-4 h-4 text-[#F00016]" /> : <VolumeX className="w-4 h-4" />}
                <span>{isSoundOn ? "Site Sound: Enabled" : "Site Sound: Muted (Click to Enable)"}</span>
              </button>

              <Button
                asChild
                size="lg"
                onClick={handleNavClick}
                className="w-full bg-[#F00016] hover:bg-[#D00013] text-white py-6 text-base font-semibold"
              >
                <Link href="#contact">Get an Exact Quote</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
