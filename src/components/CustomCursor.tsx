"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with hover capability
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const updateCursor = (e: MouseEvent) => {
        setIsVisible(true);
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Check if hovering over clickable elements
        const target = e.target as HTMLElement;
        const isClickable = 
          window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.closest("a") !== null ||
          target.closest("button") !== null;
          
        setIsPointer(isClickable);
      };

      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      window.addEventListener("mousemove", updateCursor);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        window.removeEventListener("mousemove", updateCursor);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(2px)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.8)",
          transform: "translate(-50%, -50%)"
        }}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
}
