"use client";

import { useWorld } from "../three/scene";

// ---------------------------------------------------------------------------
// Quality / sound / fullscreen toggle controls (always visible)
// ---------------------------------------------------------------------------

export function QualityControls() {
  const { quality, setQuality, soundEnabled, setSoundEnabled, isFullscreen, setIsFullscreen } = useWorld();

  const qualityLabel = (v: string) => {
    switch (v) {
      case "low":
        return "Low";
      case "medium":
        return "Medium";
      case "high":
        return "High";
      default:
        return v;
    }
  };

  return (
    <div className="absolute bottom-4 right-4 z-[300] flex flex-col gap-2 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 p-3 text-white text-sm">
      <div className="flex flex-wrap gap-2">
        {["low", "medium", "high"].map((q) => (
          <button
            key={q}
            onClick={() => setQuality(q as "low" | "medium" | "high")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
              quality === q
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {qualityLabel(q)}
          </button>
        ))}
      </div>
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition"
      >
        <span className="text-base">{soundEnabled ? "🔊" : "🔇"}</span>
        Sound
      </button>
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition"
      >
        <span className="text-base">{isFullscreen ? "⛶" : "⛶"}</span>
        Fullscreen
      </button>
    </div>
  );
}
