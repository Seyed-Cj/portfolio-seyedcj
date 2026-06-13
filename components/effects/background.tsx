"use client";

export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />

      {/* Layer 1: Slow diagonal lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              135deg,
              transparent,
              transparent 80px,
              rgba(255,255,255,0.4) 80px,
              rgba(255,255,255,0.4) 81px
            )`,
            backgroundSize: "200% 200%",
            animation: "lineDrift1 30s linear infinite",
          }}
        />
      </div>

      {/* Layer 2: Medium-speed cross lines */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 120px,
              rgba(255,255,255,0.3) 120px,
              rgba(255,255,255,0.3) 121px
            )`,
            backgroundSize: "200% 200%",
            animation: "lineDrift2 25s linear infinite",
          }}
        />
      </div>

      {/* Layer 3: Fast subtle horizontal lines */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 200px,
              rgba(255,255,255,0.2) 200px,
              rgba(255,255,255,0.2) 201px
            )`,
            backgroundSize: "100% 200%",
            animation: "lineDrift3 20s linear infinite",
          }}
        />
      </div>

      {/* Layer 4: Subtle vertical scan line */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 48%, rgba(255,255,255,0.15) 50%, transparent 52%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "scanLine 15s ease-in-out infinite",
          }}
        />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}
