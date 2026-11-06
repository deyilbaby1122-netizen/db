import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useControls } from "../hooks/useControls";
import * as THREE from "three";
export { useControls };
import {
  Environment,
  ContactShadows,
  Float,
  Text,
  Stars,
  Box,
  Cylinder,
  Plane,
  Sphere,
  Capsule,
  Ring,
  Shape,
  useTexture,
} from "@react-three/drei";
import { BoxGeometry, CylinderGeometry, PlaneGeometry, SphereGeometry, CapsuleGeometry, RingGeometry, ShapeGeometry, Vector3 } from "three";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WorldPosition {
  x: number;
  y: number;
  z: number;
}

export interface PortalInfo {
  id: string;
  name: string;
  location: string;
  position: WorldPosition;
  rotation: number;
  target: string;
}

// ---------------------------------------------------------------------------
// World context (quality / sound / fullscreen / portals)
// ---------------------------------------------------------------------------

interface WorldContextType {
  quality: "low" | "medium" | "high";
  setQuality: (q: "low" | "medium" | "high") => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  portals: PortalInfo[];
}

const WorldContext = createContext<WorldContextType | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [quality, setQuality] = useState<"low" | "medium" | "high">("high");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const portals: PortalInfo[] = [
    {
      id: "about",
      name: "About Me",
      location: "About",
      position: { x: -95, y: 0, z: 0 },
      rotation: 0,
      target: "about",
    },
    {
      id: "skills",
      name: "Skills City",
      location: "Skills",
      position: { x: -50, y: 0, z: 0 },
      rotation: 0,
      target: "skills",
    },
    {
      id: "projects",
      name: "Project Exhibition",
      location: "Projects",
      position: { x: 5, y: 0, z: 0 },
      rotation: 0,
      target: "projects",
    },
    {
      id: "design",
      name: "Design Studio",
      location: "Studio",
      position: { x: 60, y: 0, z: 0 },
      rotation: 0.2,
      target: "studio",
    },
    {
      id: "services",
      name: "Services",
      location: "Services",
      position: { x: 115, y: 0, z: 0 },
      rotation: 0,
      target: "services",
    },
    {
      id: "contact",
      name: "Contact",
      location: "Contact",
      position: { x: -145, y: 0, z: 35 },
      rotation: 0,
      target: "contact",
    },
  ];

  return (
    <WorldContext.Provider
      value={{ quality, setQuality, soundEnabled, setSoundEnabled, isFullscreen, setIsFullscreen, portals }}
    >
      {children}
    </WorldContext.Provider>
  );
}

export function useWorld() {
  const ctx = useContext(WorldContext);
  if (!ctx) throw new Error("useWorld must be used within WorldProvider");
  return ctx;
}

// ---------------------------------------------------------------------------
// Vehicle component
// ---------------------------------------------------------------------------

interface VehicleProps {
  position: THREE.Vector3 | [number, number, number];
}

export function Vehicle({ position }: VehicleProps) {
  const meshRef = useRef<THREE.Group>(null!);

  // Physics state
  const physics = useRef({
    pos: new THREE.Vector3(
    typeof position === "object" && "x" in position ? position.x : position[0],
    typeof position === "object" && "x" in position ? position.y : position[1],
    typeof position === "object" && "x" in position ? position.z : position[2]
  ),
    vel: new THREE.Vector3(0, 0, 0),
    angVel: 0,
    speed: 0,
  }).current;

  // Tunable physics constants
  const acceleration = 28;
  const brakeStrength = 42;
  const turnSpeed = 2.4;
  const maxSpeed = 20;
  const maxReverse = -12;
  const baseFriction = 12;
  const bound = 220;

  // Shared keyboard input
  const ctrl = useControls();

  useFrame((state) => {
    const input = {
      forward: ctrl.current.w,
      backward: ctrl.current.s,
      left: ctrl.current.a,
      right: ctrl.current.d,
    };

    // 1. Steering
    if (input.left) physics.angVel -= turnSpeed * 0.08;
    if (input.right) physics.angVel += turnSpeed * 0.08;

    // 2. Throttle / brake along local forward (Z)
    if (input.forward) {
      physics.vel.z -= acceleration * 0.08;
      physics.vel.x *= 0.92;
    } else if (input.backward) {
      physics.vel.z += brakeStrength * 0.08;
    } else {
      physics.vel.z -= baseFriction * 0.14;
    }

    // 3. Clamp
    if (physics.vel.z > maxSpeed) physics.vel.z = maxSpeed;
    if (physics.vel.z < maxReverse) physics.vel.z = maxReverse;

    // 4. Angular damping
    physics.angVel *= 0.94;

    // 5. Forward direction in world space
    const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      physics.angVel * 0.03
    );

    // 6. Move
    physics.pos.x += forward.x * physics.vel.z * 0.06;
    physics.pos.z += forward.z * physics.vel.z * 0.06;

    // 7. Ground follow
    physics.pos.y = 0.7;

    // 8. World bounds
    const b = bound;
    physics.pos.x = Math.max(-b, Math.min(b, physics.pos.x));
    physics.pos.z = Math.max(-b, Math.min(b, physics.pos.z));

    // 9. Rotate mesh to face movement
    meshRef.current.rotation.y = -Math.atan2(forward.x, forward.z) + Math.PI / 2;

    // 10. Smooth camera sync
    const cam = state.camera;
    cam.position.x += (physics.pos.x - cam.position.x) * 0.22;
    cam.position.y += (physics.pos.y - cam.position.y) * 0.22;
    cam.position.z += (physics.pos.z - cam.position.z) * 0.22;

    // 11. Look-ahead
    const target = new THREE.Vector3(
      -physics.pos.x,
      0.45,
      -physics.pos.z
    );
    cam.lookAt(target);
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Chassis */}
      <mesh>
        <boxGeometry args={[2.6, 0.4, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.28, 0.55]}>
        <cylinderGeometry args={[0.55, 0.55, 0.32, 14]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Headlights */}
      <mesh position={[0, 0.3, -0.55]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0.55]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
      </mesh>
      {/* Wheels */}
      <mesh position={[1.05, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.2, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[1.05, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.2, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh position={[-1.05, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.2, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-1.05, -0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.2, 10]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      {/* Underglow */}
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[1.7, 1.9, 0.12, 12]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Portal / waypoint markers
// ---------------------------------------------------------------------------

interface SignProps {
  portal: PortalInfo;
}

export function Sign({ portal }: SignProps) {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    group.current.rotation.y += 0.01;
  });

  return (
    <group ref={group} position={[portal.position.x, 1.6, portal.position.z]}>
      {/* Post */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 1.6, 6]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Sign board */}
      <mesh position={[0, 0.9, 0]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.3} />
      </mesh>
      <Float position={[0, 0.2, 0]}>
        <Text
          font="assets/fonts/portal.fnt"
          fontSize={0.3}
          color="#e2e8f0"
        >
          {portal.name}
        </Text>
      </Float>
      <Float position={[0, 1.3, 0]} speed={0.6}>
        <Text
          font="assets/fonts/portal.fnt"
          fontSize={0.6}
          color="#94a3b8"
        >
          {portal.location}
        </Text>
      </Float>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Environment / ground / sky
// ---------------------------------------------------------------------------

export function EnvironmentScene() {
  return (
    <>
      <directionalLight position={[10, 20, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 15, -5]} intensity={0.4} color="#7c3aed" />
      <ambientLight intensity={0.25} />
      <spotLight
        position={[0, 30, 30]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#a78bfa" />
      <pointLight position={[20, 10, 20]} intensity={0.2} color="#22d3ee" />
      <pointLight position={[-10, 5, -10]} intensity={0.15} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1000, 120]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.85}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Edge markers */}
      {Array.from({ length: 60 }, (_, i) => {
        const x = -460 + i * 16;
        return (
          <mesh key={i} position={[x, 0.04, -58]}>
            <cylinderGeometry args={[0.04, 0.04, 0.08, 6]} />
            <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.2} />
          </mesh>
        );
      })}
      <ContactShadows
        position={[0, 0.05, 0]}
        opacity={0.4}
        scale={12}
        blur={2}
        far={4}
        resolution={256}
      />
      <Stars
        radius={120}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        speed={2}
      />
      <fog attach="fog" args={["#0f172a", 60, 250]} />
    </>
  );
}
