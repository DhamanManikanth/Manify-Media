"use client";

import { useState, useEffect } from "react";
import GeometricBlockBackground from "./GeometricBlockBackground";

const ROTATING_WORDS = [
  "Cost.",
  "Turnaround Time.",
  "Traditional Budget.",
];

export default function HeadlineDigitalReveal() {
  // Typewriter + backspace state
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Typewriter backspacing logic
  useEffect(() => {
    const targetWord = ROTATING_WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < targetWord.length) {
        timeout = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, 75);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex]);

  // Cursor blink interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 px-2 select-none group">
      {/* Subtle Floating Geometric Blocks */}
      <GeometricBlockBackground />

      {/* Main Headline with Typewriter Backspace Rotation */}
      <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
        <span className="block mb-2 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          Cinema-Grade Brand Videos
        </span>
        <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#f0f0f0] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          at a Fraction of the{" "}
          <span className="inline-block relative">
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(240,0,22,0.6)]">
              {currentText}
            </span>
            {/* Pulsing red playhead cursor */}
            <span
              className={`inline-block ml-1 w-[3px] h-[0.85em] align-middle bg-[#F00016] shadow-[0_0_12px_#F00016] transition-opacity duration-100 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
        </span>
      </h1>
    </div>
  );
}
