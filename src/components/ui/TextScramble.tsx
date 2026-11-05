"use client";

import { useState, useEffect } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソ0123456789ABCDEF#@$%&*";

interface TextScrambleProps {
  text: string;
  trigger: boolean;
  delay?: number;
  className?: string;
}

export default function TextScramble({
  text,
  trigger,
  delay = 0,
  className = "",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = text.length * 3;
    let timer: NodeJS.Timeout;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const revealedCount = Math.floor((frame / totalFrames) * text.length);

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealedCount) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 35);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(startTimer);
    };
  }, [text, trigger, delay]);

  return <span className={className}>{displayText}</span>;
}

