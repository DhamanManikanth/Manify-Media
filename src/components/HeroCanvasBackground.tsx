"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function HeroCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check motion preference and touch device
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse), (hover: none)").matches;

    if (prefersReducedMotion) {
      // Draw static ambient gradient and return
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        10,
        width / 2,
        height * 0.4,
        width * 0.5
      );
      gradient.addColorStop(0, "rgba(240, 0, 22, 0.12)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Cursor coordinates with smooth interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 180,
      active: false,
    };

    // Color palette constants
    const colors = [
      "rgba(240, 0, 22, ",   // Primary Red
      "rgba(255, 51, 75, ",  // Accent Light Red
      "rgba(196, 0, 18, ",   // Deep Crimson
      "rgba(255, 255, 255, ", // Subtle Star White
    ];

    // Particle population
    const particleCount = isTouchDevice ? 32 : 55;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 1.8 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseRadius,
        radius: baseRadius,
        alpha: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // Ambient floating time for touch or idle
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const render = () => {
      time += 0.015;

      // Smooth cursor interpolation
      if (!isTouchDevice && mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        // Touch or idle fallback: slow ambient orbit
        mouse.x = width * 0.5 + Math.sin(time * 0.7) * (width * 0.2);
        mouse.y = height * 0.45 + Math.cos(time * 0.5) * (height * 0.18);
      }

      // 1. Dark Base Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // 2. Cursor-Reactive Glow Layer (Soft Light Bloom)
      const glowGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius * 2.2
      );
      glowGradient.addColorStop(0, "rgba(240, 0, 22, 0.16)");
      glowGradient.addColorStop(0.35, "rgba(255, 51, 75, 0.06)");
      glowGradient.addColorStop(0.7, "rgba(240, 0, 22, 0.015)");
      glowGradient.addColorStop(1, "rgba(5, 5, 5, 0)");

      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Distortion Ripple Ring around Cursor
      const rippleRadius = (Math.sin(time * 2) * 0.5 + 0.5) * 40 + 80;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 51, 75, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Interactive Particles & Connection Network
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Cursor proximity reaction: slight push away + size pulse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
          p.radius = p.baseRadius * (1 + force * 1.2);
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby particles for a cinematic neural constellation
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(240, 0, 22, ${(1 - dist2 / 95) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}

