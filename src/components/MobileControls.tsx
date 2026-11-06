"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useControls } from "../hooks/useControls";

// ---------------------------------------------------------------------------
// Touch joystick
// ---------------------------------------------------------------------------

interface JoystickProps {
  className?: string;
}

export function Joystick({ className }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const innerRef = useRef<HTMLDivElement>(null!);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Shared keyboard state — same hook the vehicle reads
  const ctrl = useControls();

  return (
    <div
      ref={containerRef}
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 ${className ?? ""}`}
    >
      {/* Joystick */}
      <div
        ref={innerRef}
        className="w-20 h-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center active:scale-95 transition"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: "pointer",
        }}
        onTouchStartCapture={() => setActive(true)}
        onTouchEndCapture={() => setActive(false)}
        onTouchMove={(e) => {
          if (!active || !containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const touch = e.touches[0];
          const x = touch.clientX - rect.left - rect.width / 2;
          const y = touch.clientY - rect.top - rect.height / 2;
          const max = rect.width / 2 - 12;
          const clampX = Math.max(-max, Math.min(max, x));
          const clampY = Math.max(-max, Math.min(max, y));
          setPosition({ x: clampX, y: clampY });
          const angle = Math.atan2(clampY, clampX);
          if (angle > 0.5 && angle < 2.5) {
            ctrl.current.d = true; ctrl.current.a = false;
            ctrl.current.w = false; ctrl.current.s = false;
          } else if (angle < -0.5 && angle > -2.5) {
            ctrl.current.a = true; ctrl.current.d = false;
            ctrl.current.w = false; ctrl.current.s = false;
          } else if (clampY < -20) {
            ctrl.current.w = true; ctrl.current.s = false;
            ctrl.current.a = false; ctrl.current.d = false;
          } else if (clampY > 20) {
            ctrl.current.s = true; ctrl.current.w = false;
            ctrl.current.a = false; ctrl.current.d = false;
          } else {
            ctrl.current.a = false; ctrl.current.d = false;
            ctrl.current.w = false; ctrl.current.s = false;
          }
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/30" />
      </div>

      {/* Direction buttons */}
      <div className="flex gap-2">
        <DirectionalButton label="↑" active={ctrl.current.w} onPress={() => { ctrl.current.w = true; }} onRelease={() => { ctrl.current.w = false; }} />
        <DirectionalButton label="↓" active={ctrl.current.s} onPress={() => { ctrl.current.s = true; }} onRelease={() => { ctrl.current.s = false; }} />
      </div>
      <div className="flex gap-2">
        <DirectionalButton label="←" active={ctrl.current.a} onPress={() => { ctrl.current.a = true; }} onRelease={() => { ctrl.current.a = false; }} />
        <DirectionalButton label="→" active={ctrl.current.d} onPress={() => { ctrl.current.d = true; }} onRelease={() => { ctrl.current.d = false; }} />
      </div>
    </div>
  );
}

interface DirectionalButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
  onRelease: () => void;
}

function DirectionalButton({ label, active, onPress, onRelease }: DirectionalButtonProps) {
  return (
    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center active:scale-95">
      <button
        className="w-full h-full rounded-full bg-white/10 text-white text-lg font-bold active:bg-white/30"
        onPointerDown={(e) => {
          e.preventDefault();
          onPress();
        }}
        onPointerUp={() => onRelease()}
        onPointerLeave={() => onRelease()}
      >
        {label}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Action pad (accelerate / reverse / interact)
// ---------------------------------------------------------------------------

interface ActionPadProps {
  onAccelerate: () => void;
  onReverse: () => void;
  onInteract: () => void;
}

export function ActionPad({ onAccelerate, onReverse, onInteract }: ActionPadProps) {
  return (
    <div className="absolute right-6 bottom-6 z-[200] flex flex-col gap-3">
      <div className="flex gap-2">
        <BigButton label="▲" dark onClick={onAccelerate} />
        <BigButton label="▼" dark={false} onClick={onReverse} />
      </div>
      <div className="flex gap-2">
        <BigButton label="E" dark={false} onClick={onInteract} />
      </div>
    </div>
  );
}

function BigButton({ label, dark, onClick }: { label: string; dark?: boolean; onClick: () => void }) {
  return (
    <button
      className={`w-16 h-16 rounded-2xl text-white text-xl font-bold active:scale-95 transition ${
        dark ? "bg-white/20" : "bg-[#16203a] border border-white/20"
      }`}
      onPointerDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      onPointerUp={() => {}}
      onPointerLeave={() => {}}
    >
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Touch camera controls
// ---------------------------------------------------------------------------

export function TouchCameraControls() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.style.cursor = "none";
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-[200] hidden md:block"
      onTouchStart={(e) => setDragging(true)}
      onTouchEnd={() => setDragging(false)}
      onTouchMove={(e) => {
        if (!dragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const dy = touch.clientY - rect.top;
        const targetY = Math.max(3, Math.min(20, 10 - dy * 0.05));
        // Camera height is driven by the R3F camera via quality; only adjust as a gentle fallback
      }}
    >
      <div className="w-10 h-48 rounded-lg bg-black/50 border border-white/20 flex items-end justify-center pb-2">
        <span className="text-xs text-white/70">Drag up/down</span>
      </div>
    </div>
  );
}
