"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for fluid, physics-based outer ring trailing
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpringConfig = { stiffness: 320, damping: 28, mass: 0.2 };
  const smoothRingX = useSpring(mouseX, ringSpringConfig);
  const smoothRingY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Only activate for mouse/pointer devices with hover capability
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const handleMouseMove = (e: MouseEvent) => {
        setIsVisible(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Check if hovering over clickable or interactive elements
        const target = e.target as HTMLElement;
        const isClickable =
          window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          target.tagName.toLowerCase() === "input" ||
          target.tagName.toLowerCase() === "textarea" ||
          target.tagName.toLowerCase() === "select" ||
          target.closest("a") !== null ||
          target.closest("button") !== null ||
          target.closest("[role='button']") !== null;

        setIsPointer(isClickable);
      };

      const handleMouseDown = () => setIsClicked(true);
      const handleMouseUp = () => setIsClicked(false);
      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
      };
    }
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Precision Center Micro-Dot (Immediate, Zero Latency) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.6 : isPointer ? 1.4 : 1,
            backgroundColor: isPointer ? "#F00016" : "#ffffff",
          }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(240,0,22,0.8)]"
        />
      </motion.div>

      {/* 2. Fluid Transparent Outer Ring (No Blur, Crystal Clear Interior) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] hidden md:block"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 48 : 32,
            height: isPointer ? 48 : 32,
            scale: isClicked ? 0.85 : 1,
            borderColor: isPointer ? "rgba(240, 0, 22, 0.9)" : "rgba(255, 255, 255, 0.35)",
            boxShadow: isPointer
              ? "0 0 16px 2px rgba(240, 0, 22, 0.4), inset 0 0 10px rgba(240, 0, 22, 0.1)"
              : "0 0 0 0 transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.1,
          }}
          className="rounded-full bg-transparent border-[1.5px] transition-colors duration-200"
        >
          {/* Subtle Creative Crosshair Accents on Hover */}
          {isPointer && (
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[1px] h-full bg-[#F00016]/20" />
              <div className="h-[1px] w-full bg-[#F00016]/20 absolute" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
