"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  highlightWord?: string;
  highlightClass?: string;
  delay?: number;
}

export default function TextReveal({
  children,
  className = "",
  highlightWord,
  highlightClass = "text-gradient",
  delay = 0,
}: TextRevealProps) {
  const words = children.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());

        return (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-top">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + index * 0.045,
              }}
              className={`inline-block ${isHighlight ? highlightClass : ""}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

