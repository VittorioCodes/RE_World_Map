import React from "react";

export default function CRTOverlay({ enabled, heavy }: { enabled: boolean; heavy?: boolean }) {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Scanlines */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,${heavy ? "0.4" : "0.25"})_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_${heavy ? "2px" : "4px"},3px_100%] pointer-events-none`} />

      {/* Flicker */}
      <div className={`absolute inset-0 bg-white opacity-[${heavy ? "0.04" : "0.02"}] animate-flicker pointer-events-none mix-blend-overlay`} />

      {/* Vignette */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,${heavy ? "0.6" : "0.4"})_100%)] pointer-events-none`} />

      {/* Screen Curvature / Distortion (Pseudo) */}
      <div className={`absolute inset-0 shadow-[inset_0_0_${heavy ? "150px" : "100px"}_rgba(0,0,0,0.9)] pointer-events-none`} />

      {/* RGB Shift / Chromatic Aberration (Simulated via text-shadow on body? No, this is overlay only) 
          We can't easily do full screen RGB shift without post-processing or backdrop-filter tricks which are heavy.
          Let's stick to the scanlines and vignette for the "CRT" feel.
      */}

      <style>{`
        @keyframes flicker {
          0% { opacity: 0.02; }
          5% { opacity: 0.05; }
          10% { opacity: 0.02; }
          15% { opacity: 0.06; }
          20% { opacity: 0.02; }
          50% { opacity: 0.02; }
          55% { opacity: 0.05; }
          60% { opacity: 0.02; }
          100% { opacity: 0.02; }
        }
        .animate-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>
    </div>
  );
}
