"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for fluid, physics-based outer ring trailing
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpringConfig = { stiffness: 350, damping: 26, mass: 0.15 };
  const smoothRingX = useSpring(mouseX, ringSpringConfig);
  const smoothRingY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouch = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Precision Center Micro-Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[120] rounded-full hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.6 : isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? "#F00016" : "#ffffff",
          }}
          transition={{ duration: 0.12 }}
          className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(240,0,22,0.8)]"
        />
      </motion.div>

      {/* 2. Trailing Eased Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[119] hidden md:block"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 48 : 30,
            height: isPointer ? 48 : 30,
            scale: isClicked ? 0.8 : 1,
            borderColor: isPointer ? "rgba(240, 0, 22, 0.95)" : "rgba(255, 255, 255, 0.3)",
            boxShadow: isPointer
              ? "0 0 16px 2px rgba(240, 0, 22, 0.35), inset 0 0 8px rgba(240, 0, 22, 0.1)"
              : "0 0 0 0 transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 24,
            mass: 0.1,
          }}
          className="rounded-full bg-transparent border-[1.5px] transition-colors duration-200"
        />
      </motion.div>
    </>
  );
}
