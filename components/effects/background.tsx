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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gridCanvas = gridCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !gridCanvas) return;

    const ctx = canvas.getContext("2d");
    const gridCtx = gridCanvas.getContext("2d");
    if (!ctx || !gridCtx) return;

    let animId = 0;
    let particles: Particle[] = [];
    let curWidth = 0;
    let curHeight = 0;
    let lastWidth = 0;
    let lastHeight = 0;
    let isMobile = false;
    let isVisible = true;
    let isIntersecting = true;
    let prefersReducedMotion = false;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const GRID_SPACING = 80;
    const LINE_COLOR = "rgba(255, 255, 255, ";
    const DESKTOP_PARTICLE_COUNT = 12;
    const MOBILE_PARTICLE_COUNT = 4;

    // Desktop glow sprite cache
    const glowCanvas = document.createElement("canvas");
    const glowRadius = 128;
    glowCanvas.width = glowRadius * 2;
    glowCanvas.height = glowRadius * 2;
    const glowCtx = glowCanvas.getContext("2d");
    if (glowCtx) {
      const grad = glowCtx.createRadialGradient(
        glowRadius,
        glowRadius,
        0,
        glowRadius,
        glowRadius,
        glowRadius,
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      grad.addColorStop(0.3, "rgba(255, 255, 255, 0.15)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      glowCtx.fillStyle = grad;
      glowCtx.beginPath();
      glowCtx.arc(glowRadius, glowRadius, glowRadius, 0, Math.PI * 2);
      glowCtx.fill();
    }

    function initParticles(w: number, h: number, mobile: boolean) {
      particles = [];
      const count = mobile ? (w < 480 ? 3 : MOBILE_PARTICLE_COUNT) : DESKTOP_PARTICLE_COUNT;

      for (let i = 0; i < count; i++) {
        const isHorizontal = Math.random() > 0.5;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 0.15 + Math.random() * 0.25,
          direction: isHorizontal ? "horizontal" : "vertical",
          gridOffset:
            Math.floor(Math.random() * Math.ceil((isHorizontal ? h : w) / GRID_SPACING)) *
            GRID_SPACING,
          progress: Math.random(),
          glowSize: mobile ? 20 + Math.random() * 15 : 60 + Math.random() * 40,
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

    function drawParticles(
      ctxTarget: CanvasRenderingContext2D,
      w: number,
      h: number,
      mobile: boolean,
    ) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.direction === "horizontal") {
          p.x += p.speed;
          if (p.x > w + 100) {
            p.x = -100;
            p.gridOffset = Math.floor(Math.random() * Math.ceil(h / GRID_SPACING)) * GRID_SPACING;
          }
          const y = p.gridOffset;

          if (mobile) {
            // Cheap mobile rendering: small soft glow ring + core dot (skips heavy 256x256 drawImage blit)
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness * 0.2})`;
            ctxTarget.beginPath();
            ctxTarget.arc(p.x, y, 6, 0, Math.PI * 2);
            ctxTarget.fill();

            // Core point
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
            ctxTarget.beginPath();
            ctxTarget.arc(p.x, y, 1.5, 0, Math.PI * 2);
            ctxTarget.fill();
          } else {
            // Desktop: original high-quality radial glow blit
            ctxTarget.globalAlpha = p.brightness;
            ctxTarget.drawImage(
              glowCanvas,
              p.x - p.glowSize,
              y - p.glowSize,
              p.glowSize * 2,
              p.glowSize * 2,
            );
            ctxTarget.globalAlpha = 1.0;

            // Core point
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
            ctxTarget.beginPath();
            ctxTarget.arc(p.x, y, 1.5, 0, Math.PI * 2);
            ctxTarget.fill();
          }
        } else {
          p.y += p.speed;
          if (p.y > h + 100) {
            p.y = -100;
            p.gridOffset = Math.floor(Math.random() * Math.ceil(w / GRID_SPACING)) * GRID_SPACING;
          }
          const x = p.gridOffset;

          if (mobile) {
            // Cheap mobile rendering: small soft glow ring + core dot (skips heavy 256x256 drawImage blit)
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness * 0.2})`;
            ctxTarget.beginPath();
            ctxTarget.arc(x, p.y, 6, 0, Math.PI * 2);
            ctxTarget.fill();

            // Core point
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
            ctxTarget.beginPath();
            ctxTarget.arc(x, p.y, 1.5, 0, Math.PI * 2);
            ctxTarget.fill();
          } else {
            // Desktop: original high-quality radial glow blit
            ctxTarget.globalAlpha = p.brightness;
            ctxTarget.drawImage(
              glowCanvas,
              x - p.glowSize,
              p.y - p.glowSize,
              p.glowSize * 2,
              p.glowSize * 2,
            );
            ctxTarget.globalAlpha = 1.0;

            // Core point
            ctxTarget.fillStyle = `rgba(255, 255, 255, ${p.brightness})`;
            ctxTarget.beginPath();
            ctxTarget.arc(x, p.y, 1.5, 0, Math.PI * 2);
            ctxTarget.fill();
          }
        }
      }
    }

    function animate() {
      if (!ctx || curWidth === 0 || curHeight === 0) return;
      ctx.clearRect(0, 0, curWidth, curHeight);
      drawParticles(ctx, curWidth, curHeight, isMobile);
      animId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (animId !== 0) return;
      if (prefersReducedMotion || !isVisible || !isIntersecting) {
        if (ctx && curWidth > 0 && curHeight > 0) {
          ctx.clearRect(0, 0, curWidth, curHeight);
          drawParticles(ctx, curWidth, curHeight, isMobile);
        }
        return;
      }
      animId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
      if (animId !== 0) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    }

    function updateAnimationState() {
      if (document.hidden || !isVisible || !isIntersecting || prefersReducedMotion) {
        stopAnimation();
        if (prefersReducedMotion && ctx && curWidth > 0 && curHeight > 0) {
          ctx.clearRect(0, 0, curWidth, curHeight);
          drawParticles(ctx, curWidth, curHeight, isMobile);
        }
      } else {
        startAnimation();
      }
    }

    function performResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      lastWidth = w;
      lastHeight = h;
      curWidth = w;
      curHeight = h;

      isMobile = w < 768;
      // Cap DPR to 1 on mobile, 1.5 on desktop
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      gridCanvas!.width = w * dpr;
      gridCanvas!.height = h * dpr;
      gridCanvas!.style.width = `${w}px`;
      gridCanvas!.style.height = `${h}px`;
      gridCtx!.setTransform(1, 0, 0, 1, 0, 0);
      gridCtx!.scale(dpr, dpr);

      drawGrid(gridCtx!, w, h);
      initParticles(w, h, isMobile);

      if (prefersReducedMotion) {
        ctx!.clearRect(0, 0, w, h);
        drawParticles(ctx!, w, h, isMobile);
      }
    }

    function handleResize() {
      const newW = window.innerWidth;
      const newH = window.innerHeight;

      // Ignore minor height-only resizes on mobile (e.g. address bar hide/show)
      if (newW === lastWidth && Math.abs(newH - lastHeight) < 120) {
        return;
      }

      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        performResize();
      }, 180);
    }

    // Media query: prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      updateAnimationState();
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else {
      motionQuery.addListener(handleMotionChange);
    }

    // Page Visibility API
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      updateAnimationState();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Intersection Observer
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && container) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting;
          updateAnimationState();
        },
        { threshold: 0 },
      );
      observer.observe(container);
    }

    // Initial setup
    performResize();
    updateAnimationState();

    window.addEventListener("resize", handleResize);

    return () => {
      stopAnimation();
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]" />
      <canvas ref={gridCanvasRef} className="absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
}
