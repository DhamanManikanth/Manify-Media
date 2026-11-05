"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface WordRevealProps {
  children: string;
  className?: string;
}

export default function WordReveal({ children, className = "" }: WordRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 88%", "start 45%"],
  });

  const words = children.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }} className="transition-opacity">
        {children}
      </motion.span>
    </span>
  );
}

