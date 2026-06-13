"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  direction: "horizontal" | "vertical";
  gridOffset: number;
  progress: number;
  glowSize: number;
  brightness: number;
}

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const GRID_SPACING = 80;
    const LINE_COLOR = "rgba(255, 255, 255, ";
    const PARTICLE_COUNT = 12;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
      initParticles();
    }

    function initParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isHorizontal = Math.random() > 0.5;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 0.15 + Math.random() * 0.25,
          direction: isHorizontal ? "horizontal" : "vertical",
          gridOffset: Math.floor(Math.random() * Math.ceil(h / GRID_SPACING)) * GRID_SPACING,
          progress: Math.random(),
          glowSize: 60 + Math.random() * 40,
          brightness: 0.3 + Math.random() * 0.4,
        });
      }
    }

    function drawGrid() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx!.strokeStyle = LINE_COLOR + "0.06)";
      ctx!.lineWidth = 0.5;

      // Horizontal lines
      for (let y = 0; y <= h; y += GRID_SPACING) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

      // Vertical lines
      for (let x = 0; x <= w; x += GRID_SPACING) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }

      // Subtle major grid lines (every 4th line)
      ctx!.strokeStyle = LINE_COLOR + "0.1)";
      ctx!.lineWidth = 0.5;

      for (let y = 0; y <= h; y += GRID_SPACING * 4) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

      for (let x = 0; x <= w; x += GRID_SPACING * 4) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }
    }

    function drawParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const p of particles) {
        if (p.direction === "horizontal") {
          p.x += p.speed;
          if (p.x > w + 100) {
            p.x = -100;
            p.gridOffset = Math.floor(Math.random() * Math.ceil(h / GRID_SPACING)) * GRID_SPACING;
          }
          const y = p.gridOffset;

          // Glow trail
          const gradient = ctx!.createRadialGradient(p.x, y, 0, p.x, y, p.glowSize);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.brightness * 0.4})`);
          gradient.addColorStop(0.3, `rgba(255, 255, 255, ${p.brightness * 0.15})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(p.x, y, p.glowSize, 0, Math.PI * 2);
          ctx!.fill();

          // Core point
          ctx!.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
          ctx!.beginPath();
          ctx!.arc(p.x, y, 1.5, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          p.y += p.speed;
          if (p.y > h + 100) {
            p.y = -100;
            p.gridOffset = Math.floor(Math.random() * Math.ceil(w / GRID_SPACING)) * GRID_SPACING;
          }
          const x = p.gridOffset;

          // Glow trail
          const gradient = ctx!.createRadialGradient(x, p.y, 0, x, p.y, p.glowSize);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${p.brightness * 0.4})`);
          gradient.addColorStop(0.3, `rgba(255, 255, 255, ${p.brightness * 0.15})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx!.fillStyle = gradient;
          ctx!.beginPath();
          ctx!.arc(x, p.y, p.glowSize, 0, Math.PI * 2);
          ctx!.fill();

          // Core point
          ctx!.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
          ctx!.beginPath();
          ctx!.arc(x, p.y, 1.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      drawGrid();
      drawParticles();

      animId = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
