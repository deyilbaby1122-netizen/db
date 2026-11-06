"use client";

import { useState, useEffect, useRef } from "react";
import { useWorld, useControls, WorldProvider } from "../three/scene";
import { Full3DExperience } from "../components/ThreeCanvas";
import { ScreenAbout } from "../components/ScreenAbout";
import { ScreenSkills } from "../components/ScreenSkills";
import { ScreenProjects } from "../components/ScreenProjects";
import { ScreenStudio } from "../components/ScreenStudio";
import { ScreenServices } from "../components/ScreenServices";
import { ScreenContact } from "../components/ScreenContact";
import { LOCATIONS, LocationId } from "../components/Portal";
import { motion, AnimatePresence } from "framer-motion";
import { Joystick, ActionPad, TouchCameraControls } from "../components/MobileControls";
import Script from "next/script";

// ---------------------------------------------------------------------------
// Dynamic import for the screens is not possible across client/server boundaries
// in the same bundle cleanly, so we render all screens and show only the active one.
// ---------------------------------------------------------------------------

const screenMap: Record<LocationId, (() => JSX.Element) | (() => null)> = {
  about: ScreenAbout,
  skills: ScreenSkills,
  projects: ScreenProjects,
  studio: ScreenStudio,
  services: ScreenServices,
  contact: ScreenContact,
};

// ---------------------------------------------------------------------------
// Overlay panel (info / navigation hint)
// ---------------------------------------------------------------------------

function OverlayPanel() {
  const { portals } = useWorld();
  const [open, setOpen] = useState<LocationId | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setOpen(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10162b] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{LOCATIONS.find((l) => l.id === open)?.title}</h2>
                <p className="mt-1 text-sm text-white/60">{LOCATIONS.find((l) => l.id === open)?.description}</p>
              </div>
              <button
                className="rounded-full p-2 hover:bg-white/10 transition"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {portals.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setOpen(null);
                    window.location.hash = p.target;
                  }}
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Main app shell
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <WorldProvider>
      <AppShell />
    </WorldProvider>
  );
}

export function AppShell() {
  const { portals, quality, setQuality, soundEnabled, setSoundEnabled, isFullscreen, setIsFullscreen } = useWorld();
  const [activeLocation, setActiveLocation] = useState<LocationId>("about");
  const [showOverlay, setShowOverlay] = useState(true);
  const ctrl = useControls();

  // Load the active screen when hash changes
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "") as LocationId;
      const valid = LOCATIONS.some((l) => l.id === hash);
      if (valid) setActiveLocation(hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Sync activeLocation from hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as LocationId;
    if (LOCATIONS.some((l) => l.id === hash)) setActiveLocation(hash);
  }, []);

  const ActiveScreen = screenMap[activeLocation];

  return (
    <>
      {/* Google tag / analytics boilerplate — opt-out friendly */}      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID || ""}`} />
      <Script id="analytics">{`            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID || "GA_MISSING"}');
          `}</Script>

      <WorldProvider>
        <div className="relative w-full h-full">
          {/* ============ 3D WORLD ============ */}
          <Full3DExperience />
        <div className="pointer-events-none absolute inset-0 z-[120]">
          {/* Hero logo */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              A
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Ashraf.
            </span>
          </div>

          {/* Floating nav hints (desktop) */}
          <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[120] hidden md:flex flex-wrap justify-center gap-2 text-xs text-white/60">
            {LOCATIONS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setActiveLocation(l.id);
                  window.location.hash = l.link.replace("#", "");
                }}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile controls */}
          <Joystick />
          <ActionPad
            onAccelerate={() => { ctrl.current.w = true; }}
            onReverse={() => { ctrl.current.s = true; }}
            onInteract={() => {
              ctrl.current.e = true;
              setShowOverlay(true);
            }}
          />
          <TouchCameraControls />

          {/* Quality overlay button (mobile) */}
          <button
            className="absolute top-5 right-5 z-[120] rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white/80 backdrop-blur"
            onClick={() => {
              const q = quality === "high" ? "medium" : quality === "low" ? "medium" : "high";
              setQuality(q);
            }}
          >
            Quality: {quality}
          </button>
        </div>

        {/* Active content screen */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLocation}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[110] overflow-y-auto"
          >
            <ActiveScreen />
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 z-[110] border-t border-white/10 bg-[#0a0e1a]/90 backdrop-blur text-center text-sm text-white/60">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <p className="font-medium text-white/80">
              Front-End Developer · Web Designer · Graphic Designer
            </p>
            <p className="text-xs text-white/50">
              Hyderabad, Sindh, Pakistan · ✉️ shaikashraf318@icloud.com · 🐙 github.com/deyilbaby1122-netizen
            </p>
            <p className="mt-1 text-xs text-white/40">
              © {new Date().getFullYear()} Ashraf. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Overlay panels */}
        <OverlayPanel />
      </div>
      </WorldProvider>
    </>
  );
}
