"use client";

import { useEffect, useRef } from "react";

export default function Earth3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * 1.5);
    let height = (canvas.height = canvas.offsetHeight * 1.5);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 1.5;
      height = canvas.height = canvas.offsetHeight * 1.5;
    };
    window.addEventListener("resize", handleResize);

    // Generate points distributed across a 3D sphere surface
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      brightness: number;
    }

    const points: Point3D[] = [];
    const numPoints = 850;
    const radius = Math.min(width, height) * 0.42;

    // Golden spiral distribution on sphere surface (Fibonacci sphere)
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Group into clusters that mimic continental landmasses vs oceans
      const isLand =
        Math.sin(x * 3.5) * Math.cos(y * 4.2) +
        Math.sin(z * 3.0) * 0.5 > -0.15;

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        size: isLand ? 1.6 : 0.8,
        brightness: isLand ? 0.9 : 0.25,
      });
    }

    // Latitude & longitude ring lines
    const rings = 7;
    const latRings: { y: number; radius: number }[] = [];
    for (let i = 1; i < rings; i++) {
      const yNorm = -1 + (i / rings) * 2;
      latRings.push({
        y: yNorm * radius,
        radius: Math.sqrt(1 - yNorm * yNorm) * radius,
      });
    }

    let rotationAngle = 0;
    const tiltAngle = 23.5 * (Math.PI / 180); // Earth's natural axial tilt

    let mouseX = 0;
    let mouseY = 0;
    let targetTiltX = tiltAngle;
    let currentTiltX = tiltAngle;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = relX * 0.3;
      mouseY = relY * 0.3;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.0035; // Steady orbital rotation speed
      currentTiltX += (targetTiltX + mouseY - currentTiltX) * 0.05;

      const centerX = width / 2;
      const centerY = height / 2;

      // Outer Atmospheric Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.75,
        centerX,
        centerY,
        radius * 1.35
      );
      glowGrad.addColorStop(0, "rgba(240, 0, 22, 0.08)");
      glowGrad.addColorStop(0.65, "rgba(240, 0, 22, 0.03)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw Orbiting Equator / Tech Ring
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.18, radius * 0.35, currentTiltX, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(240, 0, 22, 0.14)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.restore();

      // Pre-compute 3D rotation matrix
      const cosY = Math.cos(rotationAngle + mouseX);
      const sinY = Math.sin(rotationAngle + mouseX);
      const cosX = Math.cos(currentTiltX);
      const sinX = Math.sin(currentTiltX);

      // Render latitude rings
      latRings.forEach((ring) => {
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.15) {
          const rx = Math.cos(a) * ring.radius;
          const rz = Math.sin(a) * ring.radius;
          const ry = ring.y;

          // Rotate Y
          const x1 = rx * cosY + rz * sinY;
          const z1 = -rx * sinY + rz * cosY;

          // Rotate X
          const y2 = ry * cosX - z1 * sinX;
          const z2 = ry * sinX + z1 * cosX;

          // Only draw visible front side
          if (z2 > -radius * 0.2) {
            const scale = (z2 + radius * 2) / (radius * 2);
            const px = centerX + x1;
            const py = centerY + y2;

            if (first) {
              ctx.moveTo(px, py);
              first = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            first = true;
          }
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Project, sort, and draw points (point-cloud globe)
      const projectedPoints = points.map((p) => {
        // Rotate Y
        const x1 = p.baseX * cosY + p.baseZ * sinY;
        const z1 = -p.baseX * sinY + p.baseZ * cosY;

        // Rotate X (tilt)
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = p.baseY * sinX + z1 * cosX;

        return {
          px: centerX + x1,
          py: centerY + y2,
          z: z2,
          size: p.size,
          brightness: p.brightness,
        };
      });

      // Sort points so back points are drawn first, front points drawn last (proper 3D depth)
      projectedPoints.sort((a, b) => a.z - b.z);

      projectedPoints.forEach((p) => {
        // Depth-based opacity & perspective scale
        const normalizedZ = (p.z + radius) / (radius * 2); // 0 (far) to 1 (near)

        if (normalizedZ > 0.05) {
          const alpha = Math.max(0.04, normalizedZ * normalizedZ * p.brightness);
          const dotSize = Math.max(0.6, p.size * (0.6 + normalizedZ * 0.7));

          ctx.beginPath();
          ctx.arc(p.px, p.py, dotSize, 0, Math.PI * 2);

          if (normalizedZ > 0.65 && p.brightness > 0.7) {
            // High-visibility glowing node (Front Earth surface with red-hot accent points)
            ctx.fillStyle = `rgba(240, 0, 22, ${alpha * 0.9})`;
            ctx.shadowColor = "rgba(240, 0, 22, 0.5)";
            ctx.shadowBlur = 6;
          } else {
            // Subtle crisp white/gray sphere wireframe point
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.shadowBlur = 0;
          }

          ctx.fill();
        }
      });

      // Globe Rim Silhouette (Subtle atmospheric border)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(240, 0, 22, 0.18)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-1 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] max-w-none opacity-50 md:opacity-75"
      />
    </div>
  );
}

