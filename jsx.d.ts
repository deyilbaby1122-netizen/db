/// <reference types="@types/react" />

// Augment the global JSX namespace so that @react-three/fiber and drei
// JSX elements are recognized by tsc when using `jsx: preserve`.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: unknown;
      group: unknown;
      directionalLight: unknown;
      ambientLight: unknown;
      pointLight: { position?: number[]; intensity?: number; color?: string; distance?: number; decay?: number; penumbra?: number; };
      boxGeometry: { args?: number[] };
      cylinderGeometry: { args?: number[] };
      planeGeometry: { args?: number[] };
      sphereGeometry: { args?: number[] };
      capsuleGeometry: { args?: number[] };
      ringGeometry: { args?: number[] };
      shapeGeometry: { args?: number[] };
      fog: unknown;
      color: unknown;
      text: { font: string; size?: number; height?: number; fontResolution?: number; color?: string };
      float: { children?: React.ReactNode; position?: number[]; speed?: number };
      line: { points?: number[][]; color?: string };
      lines: { points?: number[][]; color?: string };
      sparkles: { count?: number; size?: number; speed?: number };
      motion: unknown;
    }
  }
}
