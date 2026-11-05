"use client";

import { useEffect, useState } from "react";

const WORDS = ["Captivate.", "Convert.", "Scale."];

export default function WordCycler() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentWord) {
      // Pause at full word for 2.2 seconds to let the visitor read comfortably
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText === "") {
      // Finished backspacing, switch to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % WORDS.length);
      timeout = setTimeout(() => {}, 220);
    } else {
      // Smooth typing cadence
      const speed = isDeleting ? 55 : 110;
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentWord.substring(0, displayedText.length - 1)
          : currentWord.substring(0, displayedText.length + 1);

        setDisplayedText(nextText);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, wordIndex]);

  return (
    <span className="inline-block text-gradient drop-shadow-[0_0_35px_rgba(240,0,22,0.35)]">
      {displayedText}
    </span>
  );
}
