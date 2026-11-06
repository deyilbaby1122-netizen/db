"use client";

import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWorld, WorldProvider, Vehicle, Sign, EnvironmentScene } from "../three/scene";
import { Portal, LOCATIONS, LocationId } from "./Portal";
import { Joystick, ActionPad, TouchCameraControls } from "./MobileControls";
import { QualityControls } from "./QualityControls";

// ---------------------------------------------------------------------------
// Scene content — all the 3D world inside the Canvas
// ---------------------------------------------------------------------------

export function SceneContent() {
  const { quality } = useWorld();
  const { camera } = useThree();
  const qs = quality;

  // Setup camera on mount and on quality change
  useEffect(() => {
    if (!camera) return;
    const fov = qs === "high" ? 45 : qs === "medium" ? 40 : 38;
    const dist = qs === "high" ? 18 : qs === "medium" ? 12 : 10;
    // For orthographic camera, fov is approximated via scale; position distance changes
    camera.position.set(0, 8, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [quality, camera]);

  return (
    <>
      <color attach="background" args={["#0a0e1a"]} />
      <EnvironmentScene />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 5]} intensity={1.1} castShadow />
      <directionalLight position={[-10, 15, -5]} intensity={0.35} color="#7c3aed" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#a78bfa" />
      <pointLight position={[20, 10, 20]} intensity={0.2} color="#22d3ee" />
      <Vehicle position={[0, 0.7, 0]} />

      {/* Portal markers */}
      {useWorld().portals.map((p) => {
        return <Sign key={p.id} portal={p} />;
      })}

      {/* Orbit controls disabled for vehicle-first? Keep simple top-down-free */}
      <pointLight position={[-10, 5, -10]} intensity={0.15} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Quality canvas wrapper
// ---------------------------------------------------------------------------

const QualityCanvas = () => {
  const { quality } = useWorld();

  return (
    <Canvas
      shadows
      dpr={quality === "high" ? 2 : quality === "medium" ? 1.5 : 1}
      gl={{ antialias: quality === "high", alpha: false, preserveDrawingBuffer: false }}
    >
      <SceneContent />
    </Canvas>
  );
};

// ---------------------------------------------------------------------------
// Root 3D screen wrapper (with UI overlay)
// ---------------------------------------------------------------------------

export function ThreeScreen() {
  const { isFullscreen } = useWorld();
  return (
    <div className={`relative w-full h-full ${isFullscreen ? "h-screen" : "h-full"}`}>
      <QualityCanvas />
      <QualityControls />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Full 3D experience with world provider (single client component)
// ---------------------------------------------------------------------------

export function Full3DExperience() {
  return (
    <WorldProvider>
      <div className="relative w-full h-full">
        <ThreeScreen />
      </div>
    </WorldProvider>
  );
}
