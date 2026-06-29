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
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    if (!canvas || !gridCanvas) return;

    const ctx = canvas.getContext("2d");
    const gridCtx = gridCanvas.getContext("2d");
    if (!ctx || !gridCtx) return;

    let animId: number;
    let particles: Particle[] = [];

    const GRID_SPACING = 80;
    const LINE_COLOR = "rgba(255, 255, 255, ";
    const PARTICLE_COUNT = 12;

    const glowCanvas = document.createElement("canvas");
    const glowRadius = 128;
    glowCanvas.width = glowRadius * 2;
    glowCanvas.height = glowRadius * 2;
    const glowCtx = glowCanvas.getContext("2d");
    if (glowCtx) {
      const grad = glowCtx.createRadialGradient(glowRadius, glowRadius, 0, glowRadius, glowRadius, glowRadius);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      glowCtx.fillStyle = grad;
      glowCtx.beginPath();
      glowCtx.arc(glowRadius, glowRadius, glowRadius, 0, Math.PI * 2);
      glowCtx.fill();
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);

      gridCanvas!.width = w * dpr;
      gridCanvas!.height = h * dpr;
      gridCanvas!.style.width = `${w}px`;
      gridCanvas!.style.height = `${h}px`;
      gridCtx!.scale(dpr, dpr);

      drawGrid(gridCtx!, w, h);

      initParticles();
    }

    function initParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles = [];

      const count = w < 768 ? Math.round(PARTICLE_COUNT / 2) : PARTICLE_COUNT;

      for (let i = 0; i < count; i++) {
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

    function drawGrid(gCtx: CanvasRenderingContext2D, w: number, h: number) {
      gCtx.clearRect(0, 0, w, h);
      gCtx.strokeStyle = LINE_COLOR + "0.06)";
      gCtx.lineWidth = 0.5;

      // Horizontal lines
      for (let y = 0; y <= h; y += GRID_SPACING) {
        gCtx.beginPath();
        gCtx.moveTo(0, y);
        gCtx.lineTo(w, y);
        gCtx.stroke();
      }

      // Vertical lines
      for (let x = 0; x <= w; x += GRID_SPACING) {
        gCtx.beginPath();
        gCtx.moveTo(x, 0);
        gCtx.lineTo(x, h);
        gCtx.stroke();
      }

      // Subtle major grid lines (every 4th line)
      gCtx.strokeStyle = LINE_COLOR + "0.1)";
      gCtx.lineWidth = 0.5;

      for (let y = 0; y <= h; y += GRID_SPACING * 4) {
        gCtx.beginPath();
        gCtx.moveTo(0, y);
        gCtx.lineTo(w, y);
        gCtx.stroke();
      }

      for (let x = 0; x <= w; x += GRID_SPACING * 4) {
        gCtx.beginPath();
        gCtx.moveTo(x, 0);
        gCtx.lineTo(x, h);
        gCtx.stroke();
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

          ctx!.globalAlpha = p.brightness;
          ctx!.drawImage(
            glowCanvas,
            p.x - p.glowSize,
            y - p.glowSize,
            p.glowSize * 2,
            p.glowSize * 2
          );
          ctx!.globalAlpha = 1.0;

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

          ctx!.globalAlpha = p.brightness;
          ctx!.drawImage(
            glowCanvas,
            x - p.glowSize,
            p.y - p.glowSize,
            p.glowSize * 2,
            p.glowSize * 2
          );
          ctx!.globalAlpha = 1.0;

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
      <canvas ref={gridCanvasRef} className="absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
