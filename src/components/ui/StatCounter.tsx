"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(easedProgress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

