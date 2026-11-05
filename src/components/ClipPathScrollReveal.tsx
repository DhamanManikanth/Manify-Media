"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ClipPathScrollRevealProps {
  children: React.ReactNode;
  shape?: "polygon" | "circle";
  className?: string;
}

export default function ClipPathScrollReveal({
  children,
  shape = "polygon",
  className = "",
}: ClipPathScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !maskRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(maskRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (shape === "polygon") {
        // Geometric diamond/octagon polygon expanding from center outwards
        gsap.fromTo(
          maskRef.current,
          {
            clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            opacity: 0.35,
            scale: 0.95,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 25%",
              scrub: 1.2, // Smooth scrub directly bound to user's scrollbar
            },
          }
        );
      } else {
        // Central scale circle expanding smoothly outwards
        gsap.fromTo(
          maskRef.current,
          {
            clipPath: "circle(0% at 50% 50%)",
            opacity: 0.3,
            scale: 0.95,
          },
          {
            clipPath: "circle(140% at 50% 50%)",
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 25%",
              scrub: 1.2, // Smooth scrub directly bound to user's scrollbar
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shape]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={maskRef}
        className="will-change-[clip-path,transform,opacity] transition-shadow duration-300"
      >
        {children}
      </div>
    </div>
  );
}

